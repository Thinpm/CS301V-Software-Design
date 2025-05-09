from typing import List
from .dao_interface import VocabularyDAOInterface
from .object import Vocabulary

class VocabularyDAO(VocabularyDAOInterface):
    def __init__(self, connection):
        self.connection = connection

    def get_vocabulary_by_topic_id(self, topic_id: int) -> List[Vocabulary]:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute(
                "SELECT * FROM vocabulary WHERE topic_id = %s ORDER BY word",
                (topic_id,)
            )
            vocabularies_data = cursor.fetchall()
            
            return [Vocabulary.from_dict(vocab_data) for vocab_data in vocabularies_data]
        finally:
            cursor.close() 