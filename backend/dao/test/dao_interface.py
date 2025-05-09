from abc import ABC, abstractmethod
from typing import List
from .object import TestQuestion

class TestDAOInterface(ABC):
    @abstractmethod
    def get_test_by_topic_id(self, topic_id: int) -> List[TestQuestion]:
        """Get all test questions for a specific topic in random order"""
        pass 