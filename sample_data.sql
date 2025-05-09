-- Insert sample topics
INSERT INTO topic (name_topic, description) VALUES
('Basic Greetings', 'Common greeting words and phrases in English'),
('Numbers and Time', 'Numbers, time expressions, and basic counting'),
('Family Members', 'Vocabulary related to family relationships'),
('Food and Drinks', 'Common food items and beverages'),
('Daily Activities', 'Words and phrases for daily routines');

-- Insert sample vocabulary for Basic Greetings
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Hello', 'Xin chào', '/həˈləʊ/', 1),
('Good morning', 'Chào buổi sáng', '/ɡʊd ˈmɔːnɪŋ/', 1),
('Good afternoon', 'Chào buổi chiều', '/ɡʊd ˌɑːftəˈnuːn/', 1),
('Good evening', 'Chào buổi tối', '/ɡʊd ˈiːvnɪŋ/', 1),
('Goodbye', 'Tạm biệt', '/ˌɡʊdˈbaɪ/', 1),
('See you later', 'Hẹn gặp lại', '/siː juː ˈleɪtər/', 1),
('How are you?', 'Bạn khỏe không?', '/haʊ ɑːr juː/', 1),
('I am fine', 'Tôi khỏe', '/aɪ æm faɪn/', 1),
('Thank you', 'Cảm ơn bạn', '/θæŋk juː/', 1),
('You are welcome', 'Không có gì', '/juː ɑːr ˈwelkəm/', 1);

-- Insert sample vocabulary for Numbers and Time
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('One', 'Số một', '/wʌn/', 2),
('Two', 'Số hai', '/tuː/', 2),
('Three', 'Số ba', '/θriː/', 2),
('Four', 'Số bốn', '/fɔːr/', 2),
('Five', 'Số năm', '/faɪv/', 2),
('Morning', 'Buổi sáng', '/ˈmɔːnɪŋ/', 2),
('Afternoon', 'Buổi chiều', '/ˌɑːftərˈnuːn/', 2),
('Evening', 'Buổi tối', '/ˈiːvnɪŋ/', 2),
('Night', 'Ban đêm', '/naɪt/', 2),
('Today', 'Hôm nay', '/təˈdeɪ/', 2);

-- Insert sample vocabulary for Family Members
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Father', 'Bố', '/ˈfɑːðər/', 3),
('Mother', 'Mẹ', '/ˈmʌðər/', 3),
('Brother', 'Anh/em trai', '/ˈbrʌðər/', 3),
('Sister', 'Chị/em gái', '/ˈsɪstər/', 3),
('Grandfather', 'Ông', '/ˈɡrænfɑːðər/', 3),
('Grandmother', 'Bà', '/ˈɡrænmʌðər/', 3),
('Uncle', 'Chú/bác', '/ˈʌŋkl/', 3),
('Aunt', 'Cô/dì', '/ɑːnt/', 3),
('Cousin', 'Anh/chị/em họ', '/ˈkʌzn/', 3),
('Nephew', 'Cháu trai', '/ˈnefjuː/', 3);

-- Insert sample vocabulary for Food and Drinks
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Rice', 'Cơm', '/raɪs/', 4),
('Noodles', 'Mì', '/ˈnuːdlz/', 4),
('Bread', 'Bánh mì', '/bred/', 4),
('Water', 'Nước', '/ˈwɔːtər/', 4),
('Coffee', 'Cà phê', '/ˈkɒfi/', 4),
('Tea', 'Trà', '/tiː/', 4),
('Milk', 'Sữa', '/mɪlk/', 4),
('Fruit', 'Trái cây', '/fruːt/', 4),
('Vegetables', 'Rau củ', '/ˈvedʒtəblz/', 4),
('Meat', 'Thịt', '/miːt/', 4);

-- Insert sample vocabulary for Daily Activities
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Wake up', 'Thức dậy', '/weɪk ʌp/', 5),
('Brush teeth', 'Đánh răng', '/brʌʃ tiːθ/', 5),
('Take a shower', 'Tắm', '/teɪk ə ˈʃaʊər/', 5),
('Have breakfast', 'Ăn sáng', '/hæv ˈbrekfəst/', 5),
('Go to work', 'Đi làm', '/ɡəʊ tuː wɜːk/', 5),
('Have lunch', 'Ăn trưa', '/hæv lʌntʃ/', 5),
('Have dinner', 'Ăn tối', '/hæv ˈdɪnər/', 5),
('Go to bed', 'Đi ngủ', '/ɡəʊ tuː bed/', 5),
('Read a book', 'Đọc sách', '/riːd ə bʊk/', 5),
('Watch TV', 'Xem TV', '/wɒtʃ ˌtiːˈviː/', 5);

-- Insert sample tests for Basic Greetings
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Hello"?', 'Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi', 1),
('What is the meaning of "Good morning"?', 'Chào buổi sáng', 'Chào buổi chiều', 'Chào buổi tối', 'Tạm biệt', 1),
('What is the meaning of "Thank you"?', 'Cảm ơn bạn', 'Xin lỗi', 'Tạm biệt', 'Hẹn gặp lại', 1),
('What is the meaning of "How are you?"?', 'Bạn khỏe không?', 'Tôi khỏe', 'Cảm ơn', 'Tạm biệt', 1),
('What is the meaning of "Goodbye"?', 'Tạm biệt', 'Xin chào', 'Cảm ơn', 'Hẹn gặp lại', 1);

-- Insert sample tests for Numbers and Time
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "One"?', 'Số một', 'Số hai', 'Số ba', 'Số bốn', 2),
('What is the meaning of "Morning"?', 'Buổi sáng', 'Buổi chiều', 'Buổi tối', 'Ban đêm', 2),
('What is the meaning of "Today"?', 'Hôm nay', 'Hôm qua', 'Ngày mai', 'Tuần sau', 2),
('What is the meaning of "Five"?', 'Số năm', 'Số bốn', 'Số sáu', 'Số bảy', 2),
('What is the meaning of "Evening"?', 'Buổi tối', 'Buổi sáng', 'Buổi chiều', 'Ban đêm', 2);

-- Insert sample tests for Family Members
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Father"?', 'Bố', 'Mẹ', 'Anh trai', 'Em gái', 3),
('What is the meaning of "Mother"?', 'Mẹ', 'Bố', 'Chị gái', 'Em trai', 3),
('What is the meaning of "Brother"?', 'Anh/em trai', 'Chị/em gái', 'Bố', 'Mẹ', 3),
('What is the meaning of "Grandfather"?', 'Ông', 'Bà', 'Bố', 'Mẹ', 3),
('What is the meaning of "Cousin"?', 'Anh/chị/em họ', 'Chú/bác', 'Cô/dì', 'Cháu', 3);

-- Insert sample tests for Food and Drinks
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Rice"?', 'Cơm', 'Mì', 'Bánh mì', 'Nước', 4),
('What is the meaning of "Coffee"?', 'Cà phê', 'Trà', 'Sữa', 'Nước', 4),
('What is the meaning of "Bread"?', 'Bánh mì', 'Cơm', 'Mì', 'Nước', 4),
('What is the meaning of "Fruit"?', 'Trái cây', 'Rau củ', 'Thịt', 'Cá', 4),
('What is the meaning of "Vegetables"?', 'Rau củ', 'Trái cây', 'Thịt', 'Cá', 4);

-- Insert sample tests for Daily Activities
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Wake up"?', 'Thức dậy', 'Đi ngủ', 'Ăn sáng', 'Đi làm', 5),
('What is the meaning of "Brush teeth"?', 'Đánh răng', 'Tắm', 'Ăn sáng', 'Đi làm', 5),
('What is the meaning of "Take a shower"?', 'Tắm', 'Đánh răng', 'Ăn sáng', 'Đi làm', 5),
('What is the meaning of "Have breakfast"?', 'Ăn sáng', 'Ăn trưa', 'Ăn tối', 'Đi ngủ', 5),
('What is the meaning of "Go to bed"?', 'Đi ngủ', 'Thức dậy', 'Ăn sáng', 'Đi làm', 5); 