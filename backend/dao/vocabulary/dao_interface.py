from abc import ABC, abstractmethod
from typing import List
from .object import Vocabulary

class VocabularyDAOInterface(ABC):
    @abstractmethod
    def get_vocabulary_by_topic_id(self, topic_id: int) -> List[Vocabulary]:
        """Get all vocabulary words for a specific topic, ordered alphabetically"""
        pass 