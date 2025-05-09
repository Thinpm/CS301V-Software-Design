import { createContext, useContext, useState, ReactNode } from "react";
import { registerUser, loginUser, logoutUser } from "../api/authApi";

interface User {
  id: string;
  username: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Check if user is stored in local storage
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState<User | null>(initialUser);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Gọi API đăng nhập thật
      const response = await loginUser({
        username,
        password
      });
      
      // Lưu thông tin người dùng vào state và localStorage
      const newUser = {
        id: response.id.toString(),
        username: response.username,
        email: response.email,
        token: response.token
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Gọi API đăng ký thật
      const response = await registerUser({
        username,
        email,
        password
      });
      
      // Lưu thông tin người dùng vào state và localStorage
      const newUser = {
        id: response.id.toString(),
        username: response.username,
        email: response.email,
        token: response.token
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Gọi API đăng xuất
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Xóa thông tin người dùng dù có lỗi hay không
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
