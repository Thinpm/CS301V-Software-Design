import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTopic, getTopicQuizQuestions, submitQuizResults } from "../api/topicsApi";
import { useProgress } from "../context/ProgressContext";
import QuizQuestion from "../components/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const TestPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { updateTopicProgress } = useProgress();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);

  const { data: topic, isLoading: topicLoading } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => getTopic(topicId || ""),
    enabled: !!topicId,
  });

  const {
    data: questions,
    isLoading: questionsLoading
  } = useQuery({
    queryKey: ["quiz", topicId],
    queryFn: () => getTopicQuizQuestions(topicId || ""),
    enabled: !!topicId,
  });

  const isLoading = topicLoading || questionsLoading;
  const totalQuestions = questions?.length || 0;
  const progress = (answeredQuestions.length / totalQuestions) * 100;
  const hasNextQuestion = currentQuestionIndex < totalQuestions - 1;

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setTestCompleted(false);
  }, [topicId]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const updatedAnswers = [...answeredQuestions, currentQuestionIndex];
    setAnsweredQuestions(updatedAnswers);

    setTimeout(() => {
      if (hasNextQuestion) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        completeTest(isCorrect); // ✅ truyền trạng thái đúng/sai của câu cuối
      }
    }, 1500);
  };

  const completeTest = (lastAnswerCorrect: boolean) => {
    const finalScore = ((score + (lastAnswerCorrect ? 1 : 0)) / totalQuestions) * 100;
    const passed = finalScore >= 80;

    if (topicId) {
      updateTopicProgress(topicId, passed, finalScore);

      if (questions && questions.length > 0) {
        submitQuizResults({
          test_id: parseInt(topicId),
          score: finalScore,
        }).then((response) => {
          console.log("Kết quả kiểm tra đã được lưu:", response);
        }).catch((error) => {
          console.error("Lỗi khi lưu kết quả kiểm tra:", error);
          toast({
            title: "Lỗi lưu kết quả",
            description: "Kết quả bài kiểm tra đã được lưu cục bộ nhưng không thể đồng bộ với server",
            variant: "destructive"
          });
        });
      }
    }

    setTestCompleted(true);

    toast({
      title: passed ? "Chúc mừng!" : "Chưa đạt yêu cầu",
      description: passed
        ? `Bạn đã hoàn thành bài kiểm tra với điểm số ${Math.round(finalScore)}%`
        : `Bạn cần đạt ít nhất 80% để vượt qua bài kiểm tra`,
      variant: passed ? "default" : "destructive",
    });
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setTestCompleted(false);
  };

  return (
    <div className="page-transition">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/topics">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>

          {isLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <h1 className="text-2xl font-bold">{topic?.name_topic} - Kiểm tra</h1>
          )}
        </div>

        {!testCompleted && !isLoading && (
          <div className="text-sm text-gray-500">
            Câu {currentQuestionIndex + 1}/{totalQuestions}
          </div>
        )}
      </div>

      {!testCompleted ? (
        <>
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-4 w-full" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
              </div>

              {questions && questions.length > 0 && (
                <QuizQuestion
                  question={questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                />
              )}
            </>
          )}
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Kết quả bài kiểm tra</h2>

          <div className="text-5xl font-bold mb-4 text-primary">
            {Math.round((score / totalQuestions) * 100)}%
          </div>

          <p className="mb-6 text-gray-600">
            Bạn đã đúng {score}/{totalQuestions} câu hỏi
          </p>

          <div className={`p-3 mb-8 rounded-md ${
            score / totalQuestions >= 0.88
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {score / totalQuestions >= 0.8
              ? "Chúc mừng! Bạn đã hoàn thành chủ đề này."
              : "Bạn cần đạt ít nhất 80% để vượt qua bài kiểm tra."}
          </div>

          <div className="flex gap-4 flex-col sm:flex-row justify-center">
            <Button
              variant="outline"
              onClick={restartTest}
              className="flex items-center"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Làm lại bài kiểm tra
            </Button>

            <Button
              onClick={() => navigate(`/learn/${topicId}`)}
              variant={score / totalQuestions >= 0.8 ? "outline" : "default"}
            >
              Quay lại học
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
