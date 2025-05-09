
export interface VocabularyWord {
  id: string;
  topicId: string;
  english: string;
  vietnamese: string;
  phonetic: string;
}

export const vocabulary: VocabularyWord[] = [
  // Basic Conversation
  {
    id: "1",
    topicId: "basic-conversation",
    english: "Hello",
    vietnamese: "Xin chào",
    phonetic: "/həˈləʊ/",
  },
  {
    id: "2",
    topicId: "basic-conversation",
    english: "Goodbye",
    vietnamese: "Tạm biệt",
    phonetic: "/ˌɡʊdˈbaɪ/",
  },
  {
    id: "3",
    topicId: "basic-conversation",
    english: "Thank you",
    vietnamese: "Cảm ơn",
    phonetic: "/ˈθæŋk juː/",
  },
  {
    id: "4",
    topicId: "basic-conversation",
    english: "Sorry",
    vietnamese: "Xin lỗi",
    phonetic: "/ˈsɒri/",
  },
  {
    id: "5",
    topicId: "basic-conversation",
    english: "Please",
    vietnamese: "Làm ơn",
    phonetic: "/pliːz/",
  },
  {
    id: "6",
    topicId: "basic-conversation",
    english: "Yes",
    vietnamese: "Vâng / Có",
    phonetic: "/jes/",
  },
  {
    id: "7",
    topicId: "basic-conversation",
    english: "No",
    vietnamese: "Không",
    phonetic: "/nəʊ/",
  },
  {
    id: "8",
    topicId: "basic-conversation",
    english: "Excuse me",
    vietnamese: "Xin lỗi (để gây chú ý)",
    phonetic: "/ɪkˈskjuːz miː/",
  },
  {
    id: "9",
    topicId: "basic-conversation",
    english: "How are you?",
    vietnamese: "Bạn khỏe không?",
    phonetic: "/haʊ ɑː juː/",
  },
  {
    id: "10",
    topicId: "basic-conversation",
    english: "I'm fine",
    vietnamese: "Tôi khỏe",
    phonetic: "/aɪm faɪn/",
  },
  
  // Business
  {
    id: "11",
    topicId: "business",
    english: "Meeting",
    vietnamese: "Cuộc họp",
    phonetic: "/ˈmiːtɪŋ/",
  },
  {
    id: "12",
    topicId: "business",
    english: "Project",
    vietnamese: "Dự án",
    phonetic: "/ˈprɒdʒekt/",
  },
  {
    id: "13",
    topicId: "business",
    english: "Deadline",
    vietnamese: "Hạn chót",
    phonetic: "/ˈdedlaɪn/",
  },
  {
    id: "14",
    topicId: "business",
    english: "Report",
    vietnamese: "Báo cáo",
    phonetic: "/rɪˈpɔːt/",
  },
  {
    id: "15",
    topicId: "business",
    english: "Client",
    vietnamese: "Khách hàng",
    phonetic: "/ˈklaɪənt/",
  },
  {
    id: "16",
    topicId: "business",
    english: "Budget",
    vietnamese: "Ngân sách",
    phonetic: "/ˈbʌdʒɪt/",
  },
  {
    id: "17",
    topicId: "business",
    english: "Negotiate",
    vietnamese: "Đàm phán",
    phonetic: "/nɪˈɡəʊʃieɪt/",
  },
  
  // Travel
  {
    id: "18",
    topicId: "travel",
    english: "Passport",
    vietnamese: "Hộ chiếu",
    phonetic: "/ˈpɑːspɔːt/",
  },
  {
    id: "19",
    topicId: "travel",
    english: "Airport",
    vietnamese: "Sân bay",
    phonetic: "/ˈeəpɔːt/",
  },
  {
    id: "20",
    topicId: "travel",
    english: "Hotel",
    vietnamese: "Khách sạn",
    phonetic: "/həʊˈtel/",
  },
  {
    id: "21",
    topicId: "travel",
    english: "Ticket",
    vietnamese: "Vé",
    phonetic: "/ˈtɪkɪt/",
  },
  {
    id: "22",
    topicId: "travel",
    english: "Luggage",
    vietnamese: "Hành lý",
    phonetic: "/ˈlʌɡɪdʒ/",
  },
  {
    id: "23",
    topicId: "travel",
    english: "Vacation",
    vietnamese: "Kỳ nghỉ",
    phonetic: "/vəˈkeɪʃn/",
  },
  
  // Food & Dining
  {
    id: "24",
    topicId: "food",
    english: "Restaurant",
    vietnamese: "Nhà hàng",
    phonetic: "/ˈrestrɒnt/",
  },
  {
    id: "25",
    topicId: "food",
    english: "Menu",
    vietnamese: "Thực đơn",
    phonetic: "/ˈmenjuː/",
  },
  {
    id: "26",
    topicId: "food",
    english: "Delicious",
    vietnamese: "Ngon",
    phonetic: "/dɪˈlɪʃəs/",
  },
  {
    id: "27",
    topicId: "food",
    english: "Spicy",
    vietnamese: "Cay",
    phonetic: "/ˈspaɪsi/",
  },
  {
    id: "28",
    topicId: "food",
    english: "Sweet",
    vietnamese: "Ngọt",
    phonetic: "/swiːt/",
  },
  {
    id: "29",
    topicId: "food",
    english: "Sour",
    vietnamese: "Chua",
    phonetic: "/ˈsaʊə/",
  },
  
  // Technology
  {
    id: "30",
    topicId: "technology",
    english: "Computer",
    vietnamese: "Máy tính",
    phonetic: "/kəmˈpjuːtə/",
  },
  {
    id: "31",
    topicId: "technology",
    english: "Internet",
    vietnamese: "Internet",
    phonetic: "/ˈɪntənet/",
  },
  {
    id: "32",
    topicId: "technology",
    english: "Software",
    vietnamese: "Phần mềm",
    phonetic: "/ˈsɒftweə/",
  },
  {
    id: "33",
    topicId: "technology",
    english: "Hardware",
    vietnamese: "Phần cứng",
    phonetic: "/ˈhɑːdweə/",
  },
  {
    id: "34",
    topicId: "technology",
    english: "Website",
    vietnamese: "Trang web",
    phonetic: "/ˈwebsaɪt/",
  },
  {
    id: "35",
    topicId: "technology",
    english: "Password",
    vietnamese: "Mật khẩu",
    phonetic: "/ˈpɑːswɜːd/",
  },
  
  // Nature & Environment
  {
    id: "36",
    topicId: "nature",
    english: "Mountain",
    vietnamese: "Núi",
    phonetic: "/ˈmaʊntən/",
  },
  {
    id: "37",
    topicId: "nature",
    english: "River",
    vietnamese: "Sông",
    phonetic: "/ˈrɪvə/",
  },
  {
    id: "38",
    topicId: "nature",
    english: "Forest",
    vietnamese: "Rừng",
    phonetic: "/ˈfɒrɪst/",
  },
  {
    id: "39",
    topicId: "nature",
    english: "Ocean",
    vietnamese: "Đại dương",
    phonetic: "/ˈəʊʃn/",
  },
  {
    id: "40",
    topicId: "nature",
    english: "Weather",
    vietnamese: "Thời tiết",
    phonetic: "/ˈweðə/",
  },
  {
    id: "41",
    topicId: "nature",
    english: "Climate",
    vietnamese: "Khí hậu",
    phonetic: "/ˈklaɪmət/",
  },
];
