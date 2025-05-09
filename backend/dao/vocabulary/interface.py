from dataclasses import dataclass
from typing import List

@dataclass
class VocabularyOutput:
    word: str
    meaning: str
    phonetic: str

    @classmethod
    def from_vocabulary(cls, vocabulary):
        return cls(
            word=vocabulary.word,
            meaning=vocabulary.meaning,
            phonetic=vocabulary.phonetic
        )

@dataclass
class VocabularyListOutput:
    vocabularies: List[VocabularyOutput] 