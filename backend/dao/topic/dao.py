from typing import List
from .dao_interface import TopicDAOInterface
from .object import Topic

class TopicDAO(TopicDAOInterface):
    def __init__(self, connection):
        self.connection = connection

    def get_all_topics(self) -> List[Topic]:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute("SELECT * FROM topic ORDER BY created_at DESC")
            topics_data = cursor.fetchall()
            
            return [Topic.from_dict(topic_data) for topic_data in topics_data]
        finally:
            cursor.close()

    def get_topic_by_id(self, topic_id: int) -> Topic:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute("SELECT * FROM topic WHERE id = %s", (topic_id,))
            topic_data = cursor.fetchone()
            
            return Topic.from_dict(topic_data) if topic_data else None
        finally:
            cursor.close() 