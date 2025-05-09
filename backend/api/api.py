from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
import jwt
from datetime import datetime, timedelta
import os
from typing import Dict, Any
import sys
import os
import logging

# Thêm đường dẫn gốc vào sys.path để import các module tương đối
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from backend.dao.daomanager import DAOManager
from backend.dao.user.interface import RegisterInput, LoginInput, UserOutput
from backend.dao.topic.interface import TopicOutput, TopicListOutput
from backend.dao.vocabulary.interface import VocabularyOutput, VocabularyListOutput
from backend.dao.test.interface import TestQuestionOutput, TestListOutput
from backend.dao.test_result.interface import TestResultInput, TestResultOutput

app = Flask(__name__)
CORS(app)

# Initialize DAO Manager
dao_manager = DAOManager()

# JWT Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'your-secret-key')  # In production, use environment variable
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DAYS = 1

logger = logging.getLogger(__name__)

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
            logger.warning("Token is missing in request headers")
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Check token format
            if not token.startswith('Bearer '):
                logger.warning("Token format invalid - missing 'Bearer ' prefix")
                return jsonify({'message': 'Invalid token format'}), 401
                
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            
            # Decode token
            data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            
            # Get user from database
            current_user = dao_manager.user_dao.get_user_by_id(data['user_id'])
            if not current_user:
                logger.warning(f"Invalid token - User ID {data.get('user_id')} not found")
                return jsonify({'message': 'Invalid token - user not found'}), 401
                
            # Verify token in database matches provided token
            if not current_user.token or current_user.token != token:
                logger.warning(f"Token mismatch for user ID {current_user.id}")
                return jsonify({'message': 'Invalid token - token mismatch'}), 401
        except jwt.ExpiredSignatureError:
            logger.warning("Token has expired")
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            logger.warning("Invalid token signature")
            return jsonify({'message': 'Invalid token signature'}), 401
        except Exception as e:
            logger.error(f"Error validating token: {str(e)}")
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
        
        # Check if username or email already exists
        if dao_manager.user_dao.get_user_by_username(register_input.username):
            return jsonify({'message': f'Tên người dùng {register_input.username} đã tồn tại'}), 400
            
        user = dao_manager.register_user(
            register_input.username,
            register_input.password,
            register_input.email
        )
        
        if not user:
            return jsonify({'message': 'Không thể tạo tài khoản. Email có thể đã được sử dụng.'}), 400
        
        # Generate JWT token
        token_payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=JWT_EXPIRATION_DAYS)
        }
        token = jwt.encode(token_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
        # Store token in user object
        dao_manager.user_dao.store_token(user.id, token)
        user.token = token
            
        return jsonify(UserOutput.from_user(user).__dict__), 201
    except Exception as e:
        logger.error(f"Error during registration: {str(e)}")
        return jsonify({'message': f'Lỗi hệ thống: {str(e)}'}), 500

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
        
        user = dao_manager.login_user_by_username(
            login_input.username,
            login_input.password
        )
        
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Generate JWT token if not already present
        if not user.token:
            token_payload = {
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(days=JWT_EXPIRATION_DAYS)
            }
            token = jwt.encode(token_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
            dao_manager.user_dao.store_token(user.id, token)
            user.token = token
            
        return jsonify(UserOutput.from_user(user).__dict__)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    """Logout user by clearing their token"""
    try:
        success = dao_manager.logout_user(current_user.id)
        if success:
            logger.info(f"User ID {current_user.id} logged out successfully")
            return jsonify({'message': 'Successfully logged out'})
        else:
            logger.warning(f"Failed to clear token for user ID {current_user.id}")
            return jsonify({'message': 'Failed to logout'}), 500
    except Exception as e:
        logger.error(f"Error during logout for user ID {current_user.id}: {str(e)}")
        return jsonify({'message': str(e)}), 500

@app.route('/topics', methods=['GET'])
def get_topics():
    """Get all topics"""
    try:
        topics = dao_manager.get_all_topics()
        return jsonify(TopicListOutput(
            topics=[TopicOutput.from_topic(topic) for topic in topics]
        ).__dict__)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/topic/<int:topic_id>', methods=['GET'])
def get_topic(topic_id):
    """Get a specific topic by ID"""
    try:
        topic = dao_manager.get_topic_by_id(topic_id)
        if not topic:
            logger.warning(f"Topic with ID {topic_id} not found")
            return jsonify({'message': f'Chủ đề với ID {topic_id} không tồn tại'}), 404
        return jsonify({'topic': TopicOutput.from_topic(topic).__dict__})
    except Exception as e:
        logger.error(f"Error fetching topic with ID {topic_id}: {str(e)}")
        return jsonify({'message': f'Lỗi hệ thống: {str(e)}'}), 500

@app.route('/vocabulary/<int:topic_id>', methods=['GET'])
def get_vocabulary(topic_id):
    """Get vocabulary for a specific topic"""
    try:
        logger.info(f"Fetching vocabulary for topic ID: {topic_id}")
        vocabularies = dao_manager.get_vocabulary_by_topic(topic_id)
        
        if not vocabularies:
            logger.warning(f"No vocabulary found for topic ID: {topic_id}")
            return jsonify(VocabularyListOutput(vocabularies=[]).__dict__)
            
        response = VocabularyListOutput(
            vocabularies=[VocabularyOutput.from_vocabulary(vocab) for vocab in vocabularies]
        ).__dict__
        
        logger.info(f"Successfully fetched {len(vocabularies)} vocabulary items for topic ID: {topic_id}")
        return jsonify(response)
    except Exception as e:
        logger.error(f"Error fetching vocabulary for topic ID {topic_id}: {str(e)}")
        return jsonify({'message': f'Lỗi hệ thống: {str(e)}'}), 500

@app.route('/tests/<int:topic_id>', methods=['GET'])
def get_tests(topic_id):
    """Get test questions for a specific topic"""
    try:
        test_questions = dao_manager.get_test_by_topic(topic_id)
        return jsonify(TestListOutput(
            questions=[TestQuestionOutput.from_test_question(q) for q in test_questions]
        ).__dict__)
    except Exception as e:
        logger.error(f"Error fetching tests for topic ID {topic_id}: {str(e)}")
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
    app.run(debug=True, host='0.0.0.0') 