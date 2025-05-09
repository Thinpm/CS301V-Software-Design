import { Link } from "react-router-dom";
import { Check, X, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Topic } from "../api/topicsApi";
import { useProgress } from "../context/ProgressContext";

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const { isTopicCompleted } = useProgress();
  const completed = isTopicCompleted(topic.id);

  return (
    <div className="card-glass rounded-xl overflow-hidden flex flex-col">
      <div className="aspect-video relative overflow-hidden bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="text-white p-4">
            <h3 className="text-lg font-semibold">{topic.name_topic}</h3>
            <p className="text-sm text-white/80">Từ vựng tiếng Anh</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
        
        <div className="flex items-center mb-4 mt-auto">
          <div className="p-1.5 rounded-full bg-secondary/10 mr-2">
            {completed ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <X className="h-4 w-4 text-red-600" />
            )}
          </div>
          <span className="text-sm">
            {completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <Link to={`/learn/${topic.id}`}>
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Học</span>
            </Link>
          </Button>
          
          <Button
            size="sm"
            className="flex-1"
            asChild
          >
            <Link to={`/test/${topic.id}`}>
              <ArrowRight className="h-4 w-4 mr-1" />
              <span>Kiểm tra</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
