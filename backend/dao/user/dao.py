import bcrypt
import jwt
import os
import logging
from datetime import datetime, timedelta
from typing import Optional
from mysql.connector import Error
from .dao_interface import UserDAOInterface
from .object import User

# Configure logging
logger = logging.getLogger(__name__)

class UserDAO(UserDAOInterface):
    def __init__(self, connection):
        self.connection = connection
        self.secret_key = os.getenv('JWT_SECRET', 'your-secret-key')
        self.token_expiry_days = int(os.getenv('JWT_EXPIRY_DAYS', '1'))

    def create_user(self, username: str, password: str, email: str) -> Optional[User]:
        """Create a new user with hashed password"""
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            # Check if username or email already exists
            cursor.execute(
                "SELECT id FROM user WHERE username = %s OR email = %s",
                (username, email)
            )
            if cursor.fetchone():
                logger.warning(f"User creation failed: Username or email already exists - {username}")
                return None

            # Hash password with increased work factor
            password_hash = bcrypt.hashpw(
                password.encode('utf-8'),
                bcrypt.gensalt(rounds=12)
            )
            
            cursor.execute(
                "INSERT INTO user (username, password_hash, email) VALUES (%s, %s, %s)",
                (username, password_hash, email)
            )
            conn.commit()
            
            # Get the created user
            cursor.execute("SELECT * FROM user WHERE username = %s", (username,))
            user_data = cursor.fetchone()
            
            if not user_data:
                logger.error(f"User created but could not be retrieved: {username}")
                return None
                
            user = User.from_dict(user_data)
            
            # Generate JWT token for new user
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(days=self.token_expiry_days)
            }, self.secret_key, algorithm='HS256')
            
            # Store token
            if self.store_token(user.id, token):
                user.token = token
                logger.info(f"User created successfully with token: {username}")
                return user
                
            logger.warning(f"User created but token could not be stored: {username}")
            return user
        except Error as e:
            logger.error(f"Database error while creating user {username}: {e}")
            conn.rollback()
            raise
        finally:
            cursor.close()

    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute("SELECT * FROM user WHERE username = %s", (username,))
            user_data = cursor.fetchone()
            
            if user_data:
                logger.debug(f"User found by username: {username}")
                return User.from_dict(user_data)
            logger.debug(f"No user found with username: {username}")
            return None
        except Error as e:
            logger.error(f"Database error while getting user by username {username}: {e}")
            raise
        finally:
            cursor.close()

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute("SELECT * FROM user WHERE id = %s", (user_id,))
            user_data = cursor.fetchone()
            
            if user_data:
                logger.debug(f"User found by ID: {user_id}")
                return User.from_dict(user_data)
            logger.debug(f"No user found with ID: {user_id}")
            return None
        except Error as e:
            logger.error(f"Database error while getting user by ID {user_id}: {e}")
            raise
        finally:
            cursor.close()

    def verify_user_credentials(self, email: str, password: str) -> Optional[User]:
        """Verify user credentials using email and generate JWT token"""
        try:
            conn = self.connection.get_connection()
            cursor = conn.cursor(dictionary=True)
            
            try:
                cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
                user_data = cursor.fetchone()
                
                if not user_data:
                    logger.warning(f"Login attempt failed: User not found with email - {email}")
                    return None
                
                user = User.from_dict(user_data)
                
                if bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
                    # Generate JWT token with expiration
                    token = jwt.encode({
                        'user_id': user.id,
                        'exp': datetime.utcnow() + timedelta(days=self.token_expiry_days)
                    }, self.secret_key, algorithm='HS256')
                    
                    # Store token
                    if self.store_token(user.id, token):
                        user.token = token
                        logger.info(f"User logged in successfully with email: {email}")
                        return user
                    
                logger.warning(f"Login attempt failed: Invalid password for email - {email}")
                return None
            finally:
                cursor.close()
        except Exception as e:
            logger.error(f"Error during user verification for email {email}: {e}")
            raise
            
    def verify_user_by_username(self, username: str, password: str) -> Optional[User]:
        """Verify user credentials using username and generate JWT token"""
        try:
            user = self.get_user_by_username(username)
            if not user:
                logger.warning(f"Login attempt failed: User not found - {username}")
                return None
                
            if bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
                # Generate JWT token with expiration
                token = jwt.encode({
                    'user_id': user.id,
                    'exp': datetime.utcnow() + timedelta(days=self.token_expiry_days)
                }, self.secret_key, algorithm='HS256')
                
                # Store token
                if self.store_token(user.id, token):
                    user.token = token
                    logger.info(f"User logged in successfully with username: {username}")
                    return user
                
            logger.warning(f"Login attempt failed: Invalid password for user - {username}")
            return None
        except Exception as e:
            logger.error(f"Error during user verification for {username}: {e}")
            raise

    def store_token(self, user_id: int, token: str) -> bool:
        """Store JWT token for user"""
        conn = self.connection.get_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute(
                "UPDATE user SET token = %s WHERE id = %s",
                (token, user_id)
            )
            conn.commit()
            logger.debug(f"Token stored for user ID: {user_id}")
            return True
        except Error as e:
            logger.error(f"Database error while storing token for user {user_id}: {e}")
            conn.rollback()
            raise
        finally:
            cursor.close()

    def clear_token(self, user_id: int) -> bool:
        """Clear JWT token for user"""
        conn = self.connection.get_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute(
                "UPDATE user SET token = NULL WHERE id = %s",
                (user_id,)
            )
            conn.commit()
            logger.info(f"Token cleared for user ID: {user_id}")
            return True
        except Error as e:
            logger.error(f"Database error while clearing token for user {user_id}: {e}")
            conn.rollback()
            raise
        finally:
            cursor.close() 