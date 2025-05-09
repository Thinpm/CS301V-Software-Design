
export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizzes: QuizQuestion[] = [
  // Basic Conversation
  {
    id: "q1",
    topicId: "basic-conversation",
    question: "What does 'Hello' mean in Vietnamese?",
    options: ["Tạm biệt", "Xin chào", "Cảm ơn"],
    correctAnswer: "Xin chào",
  },
  {
    id: "q2",
    topicId: "basic-conversation",
    question: "How do you say 'Thank you' in English?",
    options: ["Sorry", "Please", "Thank you"],
    correctAnswer: "Thank you",
  },
  {
    id: "q3",
    topicId: "basic-conversation",
    question: "What is the Vietnamese translation of 'Excuse me'?",
    options: ["Xin lỗi", "Làm ơn", "Vâng"],
    correctAnswer: "Xin lỗi",
  },
  {
    id: "q4",
    topicId: "basic-conversation",
    question: "What is the meaning of 'Không'?",
    options: ["Yes", "No", "Maybe"],
    correctAnswer: "No",
  },
  {
    id: "q5",
    topicId: "basic-conversation",
    question: "'I'm fine' translates to what in Vietnamese?",
    options: ["Tôi khỏe", "Bạn khỏe không", "Xin chào"],
    correctAnswer: "Tôi khỏe",
  },

  // Business
  {
    id: "q6",
    topicId: "business",
    question: "What does 'Meeting' mean in Vietnamese?",
    options: ["Dự án", "Hạn chót", "Cuộc họp"],
    correctAnswer: "Cuộc họp",
  },
  {
    id: "q7",
    topicId: "business",
    question: "Which English word means 'Khách hàng'?",
    options: ["Project", "Client", "Budget"],
    correctAnswer: "Client",
  },
  {
    id: "q8",
    topicId: "business",
    question: "What does 'Deadline' translate to in Vietnamese?",
    options: ["Hạn chót", "Báo cáo", "Ngân sách"],
    correctAnswer: "Hạn chót",
  },
  {
    id: "q9",
    topicId: "business",
    question: "The Vietnamese word for 'Negotiate' is:",
    options: ["Đàm phán", "Dự án", "Báo cáo"],
    correctAnswer: "Đàm phán",
  },
  {
    id: "q10",
    topicId: "business",
    question: "'Báo cáo' in English is:",
    options: ["Budget", "Meeting", "Report"],
    correctAnswer: "Report",
  },

  // Travel
  {
    id: "q11",
    topicId: "travel",
    question: "What does 'Passport' mean in Vietnamese?",
    options: ["Vé", "Hộ chiếu", "Sân bay"],
    correctAnswer: "Hộ chiếu",
  },
  {
    id: "q12",
    topicId: "travel",
    question: "How do you say 'Hotel' in Vietnamese?",
    options: ["Sân bay", "Khách sạn", "Kỳ nghỉ"],
    correctAnswer: "Khách sạn",
  },
  {
    id: "q13",
    topicId: "travel",
    question: "What is 'Luggage' in Vietnamese?",
    options: ["Hành lý", "Vé", "Hộ chiếu"],
    correctAnswer: "Hành lý",
  },
  {
    id: "q14",
    topicId: "travel",
    question: "The Vietnamese translation for 'Airport' is:",
    options: ["Khách sạn", "Vé", "Sân bay"],
    correctAnswer: "Sân bay",
  },
  {
    id: "q15",
    topicId: "travel",
    question: "'Kỳ nghỉ' translates to which English word?",
    options: ["Luggage", "Vacation", "Ticket"],
    correctAnswer: "Vacation",
  },

  // Food & Dining
  {
    id: "q16",
    topicId: "food",
    question: "What is the Vietnamese word for 'Restaurant'?",
    options: ["Thực đơn", "Nhà hàng", "Ngon"],
    correctAnswer: "Nhà hàng",
  },
  {
    id: "q17",
    topicId: "food",
    question: "Which English word means 'Cay'?",
    options: ["Sweet", "Delicious", "Spicy"],
    correctAnswer: "Spicy",
  },
  {
    id: "q18",
    topicId: "food",
    question: "What does 'Menu' translate to in Vietnamese?",
    options: ["Thực đơn", "Nhà hàng", "Ngon"],
    correctAnswer: "Thực đơn",
  },
  {
    id: "q19",
    topicId: "food",
    question: "The Vietnamese word for 'Sweet' is:",
    options: ["Cay", "Ngọt", "Chua"],
    correctAnswer: "Ngọt",
  },
  {
    id: "q20",
    topicId: "food",
    question: "'Ngon' in English is:",
    options: ["Menu", "Spicy", "Delicious"],
    correctAnswer: "Delicious",
  },

  // Technology
  {
    id: "q21",
    topicId: "technology",
    question: "What does 'Computer' mean in Vietnamese?",
    options: ["Phần mềm", "Máy tính", "Trang web"],
    correctAnswer: "Máy tính",
  },
  {
    id: "q22",
    topicId: "technology",
    question: "How do you say 'Software' in Vietnamese?",
    options: ["Phần mềm", "Phần cứng", "Mật khẩu"],
    correctAnswer: "Phần mềm",
  },
  {
    id: "q23",
    topicId: "technology",
    question: "What is 'Password' in Vietnamese?",
    options: ["Trang web", "Internet", "Mật khẩu"],
    correctAnswer: "Mật khẩu",
  },
  {
    id: "q24",
    topicId: "technology",
    question: "The Vietnamese translation for 'Website' is:",
    options: ["Internet", "Trang web", "Máy tính"],
    correctAnswer: "Trang web",
  },
  {
    id: "q25",
    topicId: "technology",
    question: "'Phần cứng' translates to which English word?",
    options: ["Software", "Hardware", "Computer"],
    correctAnswer: "Hardware",
  },

  // Nature & Environment
  {
    id: "q26",
    topicId: "nature",
    question: "What is the Vietnamese word for 'Mountain'?",
    options: ["Sông", "Núi", "Rừng"],
    correctAnswer: "Núi",
  },
  {
    id: "q27",
    topicId: "nature",
    question: "Which English word means 'Sông'?",
    options: ["Mountain", "Forest", "River"],
    correctAnswer: "River",
  },
  {
    id: "q28",
    topicId: "nature",
    question: "What does 'Ocean' translate to in Vietnamese?",
    options: ["Rừng", "Đại dương", "Thời tiết"],
    correctAnswer: "Đại dương",
  },
  {
    id: "q29",
    topicId: "nature",
    question: "The Vietnamese word for 'Weather' is:",
    options: ["Thời tiết", "Khí hậu", "Đại dương"],
    correctAnswer: "Thời tiết",
  },
  {
    id: "q30",
    topicId: "nature",
    question: "'Rừng' in English is:",
    options: ["River", "Mountain", "Forest"],
    correctAnswer: "Forest",
  },
];
