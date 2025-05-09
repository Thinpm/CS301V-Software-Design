
export interface Topic {
  id: string;
  name: string;
  description: string;
  totalWords: number;
  image: string;
}

export const topics: Topic[] = [
  {
    id: "basic-conversation",
    name: "Basic Conversation",
    description: "Essential words for everyday conversations",
    totalWords: 20,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=200",
  },
  {
    id: "business",
    name: "Business",
    description: "Key words for professional environments",
    totalWords: 15,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200",
  },
  {
    id: "travel",
    name: "Travel",
    description: "Words to help you navigate while traveling",
    totalWords: 12,
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=200",
  },
  {
    id: "food",
    name: "Food & Dining",
    description: "Vocabulary for restaurants and cooking",
    totalWords: 18,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Modern tech terms everyone should know",
    totalWords: 16,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200",
  },
  {
    id: "nature",
    name: "Nature & Environment",
    description: "Words about the natural world",
    totalWords: 14,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=200",
  },
];
