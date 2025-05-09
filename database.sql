CREATE DATABASE english_learning_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE english_learning_app;
-- Create user table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create topic table
CREATE TABLE topic (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_topic VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create vocabulary table
CREATE TABLE vocabulary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    meaning TEXT NOT NULL,
    phonetic VARCHAR(100),
    topic_id INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE CASCADE
);
-- Create test table
CREATE TABLE test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    topic_id INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE CASCADE
);
-- Create test_result table
CREATE TABLE test_result (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    test_id INT NOT NULL,
    score FLOAT NOT NULL,
    is_passed BOOLEAN NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_test (user_id, test_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES test(id) ON DELETE CASCADE
);
