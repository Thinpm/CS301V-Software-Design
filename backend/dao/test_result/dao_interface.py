from abc import ABC, abstractmethod
from .object import TestResult

class TestResultDAOInterface(ABC):
    @abstractmethod
    def save_result(self, user_id: int, test_id: int, score: float) -> TestResult:
        """Save test result and determine if passed (score >= 70%)"""
        pass

    @abstractmethod
    def get_result_by_user_and_test(self, user_id: int, test_id: int) -> TestResult:
        """Get test result for a specific user and test"""
        pass

    @abstractmethod
    def check_user_passed_topic(self, user_id: int, topic_id: int) -> bool:
        """Check if user has passed a topic (70% of tests passed)"""
        pass 