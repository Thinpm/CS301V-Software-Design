import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000', // Sửa lại thành localhost để dễ triển khai
  timeout: 30000, // Tăng timeout lên 30 giây
  headers: {
    'Content-Type': 'application/json',
  },
  // Thêm cấu hình để tránh lỗi CORS
  withCredentials: false,
  // Thêm cấu hình để xử lý response tốt hơn
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Chấp nhận status codes từ 200-499
  }
});

// Thêm hàm retry khi request thất bại
const MAX_RETRIES = 3;
API.interceptors.response.use(undefined, async (err) => {
  const { config, message } = err;
  if (!config || !config.retry) {
    return Promise.reject(err);
  }
  
  if (config.retryCount >= MAX_RETRIES) {
    console.error(`Maximum retries (${MAX_RETRIES}) reached for request:`, config.url);
    return Promise.reject(err);
  }
  
  // Tăng số lần retry
  config.retryCount = config.retryCount || 0;
  config.retryCount += 1;
  
  console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES}) to ${config.url} due to error: ${message}`);
  
  // Delay trước khi retry
  const delay = new Promise((resolve) => setTimeout(resolve, 1000 * config.retryCount));
  await delay;
  
  // Thực hiện lại request
  return API(config);
});

// Add request interceptor to include auth token in requests
API.interceptors.request.use(
  (config) => {
    // Thêm cấu hình retry cho mỗi request
    config.retry = true;
    config.retryCount = 0;
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication APIs
export const authAPI = {
  register: (userData) => API.post('/register', userData),
  login: (credentials) => API.post('/login', credentials),
  logout: () => API.post('/logout')
};

// Topic APIs
export const topicAPI = {
  getAllTopics: () => API.get('/topics'),
  getTopicById: (topicId) => API.get(`/topic/${topicId}`),
  getVocabularyByTopic: (topicId) => API.get(`/vocabulary/${topicId}`),
  getTestsByTopic: (topicId) => API.get(`/tests/${topicId}`)
};

// Test Result APIs
export const testAPI = {
  submitTestResult: (resultData) => API.post('/test_result', resultData),
  checkTopicPassed: (topicId) => API.get(`/check_pass/${topicId}`)
};

export default API;