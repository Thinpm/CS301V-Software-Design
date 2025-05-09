import mysql.connector
from mysql.connector import Error
from mysql.connector import pooling
import os
import logging
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class DatabaseConnection:
    _instance = None
    _pool = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance.connection = None
            cls._instance.initialize_pool()
        return cls._instance

    def initialize_pool(self):
        """Initialize the database connection pool with configuration from environment variables"""
        try:
            dbconfig = {
                "host": os.getenv('DB_HOST', 'localhost'),
                "user": os.getenv('DB_USER', 'root'),
                "password": os.getenv('DB_PASSWORD', '12345678'),
                "port": int(os.getenv('DB_PORT', '3306')),
                "database": os.getenv('DB_NAME', 'english_learning_app'),
                "pool_name": "mypool",
                "pool_size": int(os.getenv('DB_POOL_SIZE', '5')),
                "connect_timeout": int(os.getenv('DB_CONNECT_TIMEOUT', '30')),
                "use_pure": True,
                "autocommit": True,
                "connection_timeout": 60,
                "buffered": True,
                "pool_reset_session": True
            }
            
            # Log connection details (excluding password)
            connection_info = {k: v for k, v in dbconfig.items() if k != 'password'}
            logger.info(f"Initializing database connection pool with config: {connection_info}")
            
            self._pool = mysql.connector.pooling.MySQLConnectionPool(**dbconfig)
            logger.info("Database connection pool initialized successfully")
            
        except Error as e:
            logger.error(f"Error creating connection pool: {e}")
            raise

    def connect(self) -> Optional[mysql.connector.MySQLConnection]:
        """Get a connection from the pool"""
        try:
            if self.connection is None or not self.connection.is_connected():
                self.connection = self._pool.get_connection()
                logger.debug("New database connection established")
            return self.connection
        except Error as e:
            logger.error(f"Error connecting to MySQL: {e}")
            raise

    def disconnect(self):
        """Close the current connection"""
        try:
            if self.connection and self.connection.is_connected():
                self.connection.close()
                self.connection = None
                logger.debug("Database connection closed")
        except Error as e:
            logger.error(f"Error closing database connection: {e}")
            raise

    def get_connection(self) -> Optional[mysql.connector.MySQLConnection]:
        """Get a database connection"""
        try:
            connection = self.connect()
            # Kiểm tra kết nối và thử kết nối lại nếu mất kết nối
            if connection and not connection.is_connected():
                logger.warning("Connection lost, attempting to reconnect...")
                self.disconnect()
                connection = self.connect()
            return connection
        except Error as e:
            logger.error(f"Error getting connection: {e}")
            # Thử khởi tạo lại pool nếu lỗi kết nối
            try:
                logger.info("Attempting to reinitialize connection pool...")
                self.initialize_pool()
                return self.connect()
            except Error as e2:
                logger.error(f"Failed to reinitialize connection pool: {e2}")
                raise

    def __del__(self):
        """Cleanup when the object is destroyed"""
        self.disconnect() 