from abc import ABC, abstractmethod
from typing import List
from .object import Topic

class TopicDAOInterface(ABC):
    @abstractmethod
    def get_all_topics(self) -> List[Topic]:
        """Get all topics ordered by creation date"""
        pass

    @abstractmethod
    def get_topic_by_id(self, topic_id: int) -> Topic:
        """Get a specific topic by its ID"""
        pass 