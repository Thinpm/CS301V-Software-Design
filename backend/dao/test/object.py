from datetime import datetime

class TestQuestion:
    def __init__(self, id=None, question=None, correct_answer=None, option1=None, 
                 option2=None, option3=None, topic_id=None, created_at=None):
        self.id = id
        self.question = question
        self.correct_answer = correct_answer
        self.option1 = option1
        self.option2 = option2
        self.option3 = option3
        self.topic_id = topic_id
        self.created_at = created_at or datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'correct_answer': self.correct_answer,
            'option1': self.option1,
            'option2': self.option2,
            'option3': self.option3,
            'topic_id': self.topic_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    @classmethod
    def from_dict(cls, data):
        created_at = data.get('created_at')
        if isinstance(created_at, str):
            from datetime import datetime
            created_at = datetime.fromisoformat(created_at)
        return cls(
            id=data.get('id'),
            question=data.get('question'),
            correct_answer=data.get('correct_answer'),
            option1=data.get('option1'),
            option2=data.get('option2'),
            option3=data.get('option3'),
            topic_id=data.get('topic_id'),
            created_at=created_at
        ) 