import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Định nghĩa cấu trúc dữ liệu phù hợp với API
interface QuizQuestionType {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correct_answer: string;
}

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
  }, [question.question]); // Reset whenever question changes

  // Convert API data format to options array for rendering
  const options = [question.option1, question.option2, question.option3];
  
  const isCorrect = selectedAnswer === question.correct_answer;

  const handleSubmit = () => {
    if (!selectedAnswer || hasSubmitted) return;
    setHasSubmitted(true);
    onAnswer(isCorrect);
  };

  const getOptionClass = (option: string) => {
    if (!hasSubmitted || selectedAnswer !== option) return "";
    return option === question.correct_answer
      ? "bg-green-100 border-green-500"
      : selectedAnswer === option
      ? "bg-red-100 border-red-500"
      : "";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in">
      <h3 className="text-lg font-medium mb-4">{question.question}</h3>

      <RadioGroup
        value={selectedAnswer || ""}
        onValueChange={!hasSubmitted ? setSelectedAnswer : undefined}
        className="space-y-3"
        disabled={hasSubmitted}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`border rounded-md p-3 transition-colors ${getOptionClass(option)}`}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>

      {!hasSubmitted ? (
        <Button
          className="w-full mt-4"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Kiểm tra
        </Button>
      ) : (
        <div
          className={`mt-4 p-3 rounded-md ${
            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isCorrect ? "Đúng rồi!" : `Sai rồi! Đáp án đúng là: ${question.correct_answer}`}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
