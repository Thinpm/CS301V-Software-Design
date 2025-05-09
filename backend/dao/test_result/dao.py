from .dao_interface import TestResultDAOInterface
from .object import TestResult

class TestResultDAO(TestResultDAOInterface):
    def __init__(self, connection):
        self.connection = connection
        self.passing_score = 0.7  # 70% is passing score

    def save_result(self, user_id: int, test_id: int, score: float) -> TestResult:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            is_passed = score >= self.passing_score
            # Check if result already exists
            cursor.execute(
                "SELECT id FROM test_result WHERE user_id = %s AND test_id = %s",
                (user_id, test_id)
            )
            existing = cursor.fetchone()
            if existing:
                # Update existing result
                cursor.execute(
                    """
                    UPDATE test_result SET score = %s, is_passed = %s, submitted_at = CURRENT_TIMESTAMP
                    WHERE user_id = %s AND test_id = %s
                    """,
                    (score, is_passed, user_id, test_id)
                )
            else:
                # Insert new result
                cursor.execute(
                    """
                    INSERT INTO test_result (user_id, test_id, score, is_passed, submitted_at)
                    VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                    """,
                    (user_id, test_id, score, is_passed)
                )
            conn.commit()
            # Get the latest result
            cursor.execute(
                "SELECT * FROM test_result WHERE user_id = %s AND test_id = %s",
                (user_id, test_id)
            )
            result_data = cursor.fetchone()
            
            return TestResult.from_dict(result_data)
        finally:
            cursor.close()

    def get_result_by_user_and_test(self, user_id: int, test_id: int) -> TestResult:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute(
                "SELECT * FROM test_result WHERE user_id = %s AND test_id = %s",
                (user_id, test_id)
            )
            result_data = cursor.fetchone()
            
            return TestResult.from_dict(result_data) if result_data else None
        finally:
            cursor.close()

    def check_user_passed_topic(self, user_id: int, topic_id: int) -> bool:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute(
                '''
                SELECT COUNT(*) as correct_answers
                FROM test t
                LEFT JOIN test_result tr ON t.id = tr.test_id AND tr.user_id = %s
                WHERE t.topic_id = %s AND tr.score = 1
                ''',
                (user_id, topic_id)
            )
            result = cursor.fetchone()
            correct_answers = result['correct_answers'] if result else 0
            total_score = correct_answers * 20
            return total_score >=  80
        finally:
            cursor.close() 