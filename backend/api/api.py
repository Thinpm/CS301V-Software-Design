from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
import jwt
from datetime import datetime, timedelta
import os
from typing import Dict, Any

from ..dao.daomanager import DAOManager
from ..dao.user.interface import RegisterInput, LoginInput, UserOutput
from ..dao.topic.interface import TopicOutput, TopicListOutput
from ..dao.vocabulary.interface import VocabularyOutput, VocabularyListOutput
from ..dao.test.interface import TestQuestionOutput, TestListOutput
from ..dao.test_result.interface import TestResultInput, TestResultOutput

app = Flask(__name__)
CORS(app)

# Initialize DAO Manager
dao_manager = DAOManager()

# JWT Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'your-secret-key')  # In production, use environment variable
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DAYS = 1

def validate_required_fields(data: Dict[str, Any], required_fields: list) -> tuple[bool, str]:
    """Validate that all required fields are present in the request data"""
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    return True, ""

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            current_user = dao_manager.user_dao.get_user_by_id(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        except Exception as e:
            return jsonify({'message': f'Error validating token: {str(e)}'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    # Validate required fields
    is_valid, message = validate_required_fields(data, ['username', 'password', 'email'])
    if not is_valid:
        return jsonify({'message': message}), 400

    try:
        register_input = RegisterInput(
            username=data['username'],
            password=data['password'],
            email=data['email']
        )
        
        user = dao_manager.register_user(
            register_input.username,
            register_input.password,
            register_input.email
        )
        
        return jsonify(UserOutput.from_user(user).__dict__), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    """Login user and get JWT token"""
    data = request.get_json()
    
    # Validate required fields
    is_valid, message = validate_required_fields(data, ['username', 'password'])
    if not is_valid:
        return jsonify({'message': message}), 400

    try:
        login_input = LoginInput(
            username=data['username'],
            password=data['password']
        )
        
        user = dao_manager.login_user(
            login_input.username,
            login_input.password
        )
        
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
            
        return jsonify(UserOutput.from_user(user).__dict__)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    """Logout user by clearing their token"""
    try:
        dao_manager.logout_user(current_user.id)
        return jsonify({'message': 'Successfully logged out'})
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/topics', methods=['GET'])
@token_required
def get_topics(current_user):
    """Get all topics"""
    try:
        topics = dao_manager.get_all_topics()
        return jsonify(TopicListOutput(
            topics=[TopicOutput.from_topic(topic) for topic in topics]
        ).__dict__)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/vocabulary/<int:topic_id>', methods=['GET'])
@token_required
def get_vocabulary(current_user, topic_id):
    """Get vocabulary for a specific topic"""
    try:
        vocabularies = dao_manager.get_vocabulary_by_topic(topic_id)
        return jsonify(VocabularyListOutput(
            vocabularies=[VocabularyOutput.from_vocabulary(vocab) for vocab in vocabularies]
        ).__dict__)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/tests/<int:topic_id>', methods=['GET'])
@token_required
def get_tests(current_user, topic_id):
    """Get test questions for a specific topic"""
    try:
        test_questions = dao_manager.get_test_by_topic(topic_id)
        return jsonify(TestListOutput(
            questions=[TestQuestionOutput.from_test_question(q) for q in test_questions]
        ).__dict__)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/test_result', methods=['POST'])
@token_required
def submit_test_result(current_user):
    """Submit one or multiple test results"""
    data = request.get_json()
    results = []
    # Nếu là list (nhiều bài test)
    if isinstance(data, list):
        for item in data:
            is_valid, message = validate_required_fields(item, ['test_id', 'score'])
            if not is_valid:
                return jsonify({'message': message}), 400
            result_input = TestResultInput(
                user_id=current_user.id,
                test_id=item['test_id'],
                score=item['score']
            )
            result = dao_manager.save_test_result(
                result_input.user_id,
                result_input.test_id,
                result_input.score
            )
            results.append(TestResultOutput.from_test_result(result).__dict__)
        return jsonify({'results': results})
    # Nếu là object (1 bài test)
    else:
        is_valid, message = validate_required_fields(data, ['test_id', 'score'])
        if not is_valid:
            return jsonify({'message': message}), 400
        try:
            result_input = TestResultInput(
                user_id=current_user.id,
                test_id=data['test_id'],
                score=data['score']
            )
            result = dao_manager.save_test_result(
                result_input.user_id,
                result_input.test_id,
                result_input.score
            )
            return jsonify(TestResultOutput.from_test_result(result).__dict__)
        except Exception as e:
            return jsonify({'message': str(e)}), 400

@app.route('/check_pass/<int:topic_id>', methods=['GET'])
@token_required
def check_pass(current_user, topic_id):
    """Check if user has passed a topic"""
    try:
        is_passed = dao_manager.check_user_passed_topic(current_user.id, topic_id)
        return jsonify({'is_passed': is_passed})
    except Exception as e:
        return jsonify({'message': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True) 