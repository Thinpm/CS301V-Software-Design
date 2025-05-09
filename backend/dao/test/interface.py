from dataclasses import dataclass
from typing import List

@dataclass
class TestQuestionOutput:
    question: str
    option1: str
    option2: str
    option3: str
    correct_answer: str

    @classmethod
    def from_test_question(cls, test_question):
        return cls(
            question=test_question.question,
            option1=test_question.option1,
            option2=test_question.option2,
            option3=test_question.option3,
            correct_answer=test_question.correct_answer
        )

@dataclass
class TestListOutput:
    questions: List[TestQuestionOutput] 