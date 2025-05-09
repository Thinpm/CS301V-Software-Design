import { authAPI } from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
}

// Register a new user
export const registerUser = async (userData: RegisterData): Promise<User> => {
  try {
    const response = await authAPI.register(userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await authAPI.login(credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await authAPI.logout();
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove token even if API call fails
    localStorage.removeItem('token');
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};