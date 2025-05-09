from datetime import datetime

class Vocabulary:
    def __init__(self, id=None, word=None, meaning=None, phonetic=None, topic_id=None, created_at=None):
        self.id = id
        self.word = word
        self.meaning = meaning
        self.phonetic = phonetic
        self.topic_id = topic_id
        self.created_at = created_at or datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'word': self.word,
            'meaning': self.meaning,
            'phonetic': self.phonetic,
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
            word=data.get('word'),
            meaning=data.get('meaning'),
            phonetic=data.get('phonetic'),
            topic_id=data.get('topic_id'),
            created_at=created_at
        ) 