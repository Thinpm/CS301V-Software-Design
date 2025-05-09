import { topicAPI, testAPI } from './api';

// Interfaces
export interface Topic {
  id: number;
  name_topic: string;
  description: string;
}

export interface VocabularyWord {
  word: string;
  meaning: string;
  phonetic: string;
}

export interface QuizQuestion {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correct_answer: string;
}

// Get a specific topic by ID
export const getTopic = async (topicId: string): Promise<Topic | null> => {
  try {
    const response = await topicAPI.getTopicById(topicId);
    return response.data.topic || null;
  } catch (error) {
    console.error(`Error fetching topic with ID ${topicId}:`, error);
    return null;
  }
};

// Get all topics
export const getTopics = async (): Promise<Topic[]> => {
  try {
    const response = await topicAPI.getAllTopics();
    return response.data.topics || [];
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

// Get vocabulary for a specific topic
export const getTopicVocabulary = async (topicId: string): Promise<VocabularyWord[]> => {
  try {
    const response = await topicAPI.getVocabularyByTopic(topicId);
    console.log("API vocabulary response:", response.data);
    return response.data.vocabularies || [];
  } catch (error) {
    console.error(`Error fetching vocabulary for topic ${topicId}:`, error);
    return [];
  }
};

// Get quiz questions for a specific topic
export const getTopicQuizQuestions = async (topicId: string): Promise<QuizQuestion[]> => {
  try {
    const response = await topicAPI.getTestsByTopic(topicId);
    console.log("API quiz questions response:", response.data);
    return response.data.questions || [];
  } catch (error) {
    console.error(`Error fetching quiz questions for topic ${topicId}:`, error);
    return [];
  }
};

// Submit test results
export const submitQuizResults = async (resultData: any): Promise<any> => {
  try {
    const response = await testAPI.submitTestResult(resultData);
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz results:', error);
    throw error;
  }
};

// Check if user has passed a topic
export const checkTopicPassed = async (topicId: string): Promise<boolean> => {
  try {
    const response = await testAPI.checkTopicPassed(topicId);
    return response.data.is_passed || false;
  } catch (error) {
    console.error(`Error checking if topic ${topicId} is passed:`, error);
    return false;
  }
};
