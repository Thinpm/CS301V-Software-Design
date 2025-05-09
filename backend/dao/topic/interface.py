from dataclasses import dataclass
from typing import List, Optional

@dataclass
class TopicOutput:
    id: int
    name_topic: str
    description: str

    @classmethod
    def from_topic(cls, topic):
        return cls(
            id=topic.id,
            name_topic=topic.name_topic,
            description=topic.description
        )

@dataclass
class TopicListOutput:
    topics: List[TopicOutput] 