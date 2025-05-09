import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface TopicProgress {
  topicId: string | number;
  completed: boolean;
  score: number;
}

interface ProgressContextType {
  topicProgress: Record<string, TopicProgress>;
  updateTopicProgress: (topicId: string | number, completed: boolean, score: number) => void;
  getTopicProgress: (topicId: string | number) => TopicProgress | undefined;
  isTopicCompleted: (topicId: string | number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>({});

  // Load progress from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedProgress = localStorage.getItem(`progress_${user.id}`);
      if (storedProgress) {
        setTopicProgress(JSON.parse(storedProgress));
      }
    } else {
      setTopicProgress({});
    }
  }, [user]);

  const updateTopicProgress = (topicId: string | number, completed: boolean, score: number) => {
    if (!user) return;
    
    const topicKey = topicId.toString();

    setTopicProgress((prev) => {
      const updatedProgress = {
        ...prev,
        [topicKey]: { topicId, completed, score }
      };
      
      // Save to localStorage
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(updatedProgress));
      return updatedProgress;
    });
  };

  const getTopicProgress = (topicId: string | number): TopicProgress | undefined => {
    const topicKey = topicId.toString();
    return topicProgress[topicKey];
  };

  const isTopicCompleted = (topicId: string | number): boolean => {
    const topicKey = topicId.toString();
    return !!topicProgress[topicKey]?.completed;
  };

  return (
    <ProgressContext.Provider
      value={{ topicProgress, updateTopicProgress, getTopicProgress, isTopicCompleted }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
