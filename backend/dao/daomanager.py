from .connection import DatabaseConnection
from .user.dao import UserDAO
from .topic.dao import TopicDAO
from .vocabulary.dao import VocabularyDAO
from .test.dao import TestDAO
from .test_result.dao import TestResultDAO

class DAOManager:
    """
    Central manager for all DAO operations.
    Handles database operations for users, topics, vocabulary, tests, and test results.
    """
    def __init__(self):
        try:
            self.connection = DatabaseConnection()
            self.user_dao = UserDAO(self.connection)
            self.topic_dao = TopicDAO(self.connection)
            self.vocabulary_dao = VocabularyDAO(self.connection)
            self.test_dao = TestDAO(self.connection)
            self.test_result_dao = TestResultDAO(self.connection)
        except Exception as e:
            print(f"Error initializing DAO Manager: {e}")
            raise

    # User operations
    def register_user(self, username: str, password: str, email: str):
        """Register a new user"""
        return self.user_dao.create_user(username, password, email)

    def login_user(self, username: str, password: str):
        """Login user using email and return user object with token"""
        return self.user_dao.verify_user_credentials(username, password)
        
    def login_user_by_username(self, username: str, password: str):
        """Login user using username and return user object with token"""
        return self.user_dao.verify_user_by_username(username, password)

    def logout_user(self, user_id: int):
        """Logout user by clearing their token"""
        return self.user_dao.clear_token(user_id)

    # Topic operations
    def get_all_topics(self):
        """Get all topics ordered by creation date"""
        return self.topic_dao.get_all_topics()

    def get_topic_by_id(self, topic_id: int):
        """Get a specific topic by ID"""
        return self.topic_dao.get_topic_by_id(topic_id)

    # Vocabulary operations
    def get_vocabulary_by_topic(self, topic_id: int):
        """Get all vocabulary words for a topic"""
        return self.vocabulary_dao.get_vocabulary_by_topic_id(topic_id)

    # Test operations
    def get_test_by_topic(self, topic_id: int):
        """Get all test questions for a topic in random order"""
        return self.test_dao.get_test_by_topic_id(topic_id)

    # Test result operations
    def save_test_result(self, user_id: int, test_id: int, score: float):
        """Save test result and determine if passed"""
        return self.test_result_dao.save_result(user_id, test_id, score)

    def check_user_passed_topic(self, user_id: int, topic_id: int):
        """Check if user has passed a topic"""
        return self.test_result_dao.check_user_passed_topic(user_id, topic_id)

    def get_user_test_result(self, user_id: int, test_id: int):
        """Get test result for a specific user and test"""
        return self.test_result_dao.get_result_by_user_and_test(user_id, test_id)

    def __del__(self):
        """Cleanup connections when DAO Manager is destroyed"""
        if hasattr(self, 'connection'):
            self.connection.disconnect() 