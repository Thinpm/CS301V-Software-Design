import { useState, useCallback } from 'react';
import { registerUser, loginUser, logoutUser } from './authApi';
import { 
  getTopics, 
  getTopicVocabulary, 
  getTopicQuizQuestions, 
  submitQuizResults, 
  checkTopicPassed 
} from './topicsApi';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutUser();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
      setLoading(false);
      throw err;
    }
  }, []);

  return { register, login, logout, loading, error };
};

export const useTopics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllTopics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopics();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch topics');
      setLoading(false);
      throw err;
    }
  }, []);

  const getVocabularyByTopic = useCallback(async (topicId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopicVocabulary(topicId);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch vocabulary');
      setLoading(false);
      throw err;
    }
  }, []);

  const getTestsByTopic = useCallback(async (topicId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopicQuizQuestions(topicId);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tests');
      setLoading(false);
      throw err;
    }
  }, []);

  return { getAllTopics, getVocabularyByTopic, getTestsByTopic, loading, error };
};

export const useTests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitTestResult = useCallback(async (resultData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitQuizResults(resultData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit test result');
      setLoading(false);
      throw err;
    }
  }, []);

  const checkTopicPassed = useCallback(async (topicId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkTopicPassed(topicId);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check topic status');
      setLoading(false);
      throw err;
    }
  }, []);

  return { submitTestResult, checkTopicPassed, loading, error };
};