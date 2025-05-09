from dataclasses import dataclass

@dataclass
class TestResultInput:
    user_id: int
    test_id: int
    score: float

@dataclass
class TestResultOutput:
    score: float
    is_passed: bool

    @classmethod
    def from_test_result(cls, test_result):
        return cls(
            score=test_result.score,
            is_passed=test_result.is_passed
        ) 