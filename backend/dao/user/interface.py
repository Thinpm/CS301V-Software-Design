from dataclasses import dataclass
from typing import Optional

@dataclass
class RegisterInput:
    username: str
    password: str
    email: str

@dataclass
class LoginInput:
    username: str
    password: str

@dataclass
class UserOutput:
    id: int
    username: str
    email: str
    token: Optional[str] = None

    @classmethod
    def from_user(cls, user):
        return cls(
            id=user.id,
            username=user.username,
            email=user.email,
            token=user.token
        ) 