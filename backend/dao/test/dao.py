from typing import List
from .dao_interface import TestDAOInterface
from .object import TestQuestion

class TestDAO(TestDAOInterface):
    def __init__(self, connection):
        self.connection = connection

    def get_test_by_topic_id(self, topic_id: int) -> List[TestQuestion]:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute(
                "SELECT * FROM test WHERE topic_id = %s ORDER BY RAND()",
                (topic_id,)
            )
            test_questions_data = cursor.fetchall()
            
            return [TestQuestion.from_dict(question_data) for question_data in test_questions_data]
        finally:
            cursor.close() 