from datetime import datetime

class Topic:
    def __init__(self, id=None, name_topic=None, description=None, created_at=None):
        self.id = id
        self.name_topic = name_topic
        self.description = description
        self.created_at = created_at or datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'name_topic': self.name_topic,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    @classmethod
    def from_dict(cls, data):
        created_at = data.get('created_at')
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at)
        return cls(
            id=data.get('id'),
            name_topic=data.get('name_topic'),
            description=data.get('description'),
            created_at=created_at
        ) 