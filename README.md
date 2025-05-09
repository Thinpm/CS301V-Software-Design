# Learn English Vocabulary App

Ứng dụng học từ vựng tiếng Anh phát triển bởi Nhóm 2 cho môn học CS301V-Software-Design.

## Tính năng chính

- Học từ vựng tiếng Anh theo chủ đề
- Kiểm tra kiến thức với các bài test tương tác
- Theo dõi tiến độ học tập
- Hỗ trợ phát âm từ vựng
- Giao diện người dùng thân thiện và hiện đại

## Công nghệ sử dụng

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Tanstack Query
- Shadcn UI

### Backend
- Python
- Flask
- MySQL
- JWT Authentication

## Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (>= 16.0.0)
- Python (>= 3.8)
- MySQL

### Cài đặt Backend

1. Di chuyển đến thư mục backend:
   ```bash
   cd backend
   ```

2. Tạo môi trường ảo Python:
   ```bash
   python -m venv venv
   ```

3. Kích hoạt môi trường ảo:
   - Windows: `venv\Scripts\activate`
   - MacOS/Linux: `source venv/bin/activate`

4. Cài đặt các gói phụ thuộc:
   ```bash
   pip install -r requirements.txt
   ```

5. Tạo cơ sở dữ liệu MySQL:
   ```bash
   mysql -u root -p < database.sql
   ```

6. Khởi động backend:
   ```bash
   python -m backend.api.api
   ```

### Cài đặt Frontend

1. Di chuyển đến thư mục frontend:
   ```bash
   cd frontend
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

3. Cấu hình kết nối API (nếu cần):
   
   Mở file `src/api/api.js` và kiểm tra/sửa đổi URL kết nối API:
   ```javascript
   // Thay đổi baseURL nếu backend của bạn chạy ở địa chỉ khác
   const API = axios.create({
     baseURL: 'http://localhost:5000', 
     timeout: 30000,
     // ...
   });
   ```

4. Khởi động ứng dụng:
   ```bash
   npm run dev
   ```

5. Mở trình duyệt và truy cập: `http://localhost:8080/`


   


## Đóng góp

Đây là dự án phục vụ môn học CS301V-Software-Design.

## Project Structure

```
backend/
├── api/
│   └── api.py              # API endpoints
├── dao/
│   ├── connection.py       # Database connection
│   ├── daomanager.py      # DAO manager
│   ├── user/              # User related DAOs
│   ├── topic/             # Topic related DAOs
│   ├── vocabulary/        # Vocabulary related DAOs
│   ├── test/             # Test related DAOs
│   └── test_result/      # Test result related DAOs
└── requirements.txt       # Project dependencies
```

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

### Topics
- `GET /topics` - Get all topics
- `GET /vocabulary/<topic_id>` - Get vocabulary for a topic
- `GET /tests/<topic_id>` - Get tests for a topic

### Test Results
- `POST /test_result` - Submit test result
- `GET /check_pass/<topic_id>` - Check if user passed a topic

## Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRY_DAYS=1
```

5. Run the application:
```bash
python -m backend.api.api
```

## Database Schema

### User Table
- id (PRIMARY KEY)
- username
- password_hash
- email
- token

### Topic Table
- id (PRIMARY KEY)
- name
- description

### Vocabulary Table
- id (PRIMARY KEY)
- word
- meaning
- topic_id (FOREIGN KEY)

### Test Table
- id (PRIMARY KEY)
- question
- correct_answer
- option1
- option2
- option3
- topic_id (FOREIGN KEY)

### Test Result Table
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- test_id (FOREIGN KEY)
- score
- submitted_at

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- SQL injection prevention
- Input validation
- Error handling and logging

## Error Handling

The application includes comprehensive error handling:
- Database connection errors
- Authentication errors
- Input validation errors
- API endpoint errors

## Logging

The application uses Python's logging module for:
- Error tracking
- Security events
- User actions
- System operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.