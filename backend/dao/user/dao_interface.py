from abc import ABC, abstractmethod
from .object import User

class UserDAOInterface(ABC):
    @abstractmethod
    def create_user(self, username: str, password: str, email: str) -> User:
        pass

    @abstractmethod
    def get_user_by_username(self, username: str) -> User:
        pass

    @abstractmethod
    def verify_user_credentials(self, username: str, password: str) -> User:
        pass

    @abstractmethod
    def store_token(self, user_id: int, token: str) -> bool:
        pass

    @abstractmethod
    def clear_token(self, user_id: int) -> bool:
        pass 