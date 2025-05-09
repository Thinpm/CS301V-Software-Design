import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTopic, getTopicVocabulary } from "../api/topicsApi";
import VocabularyCard from "../components/VocabularyCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ArrowRight } from "lucide-react";

const LearnPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: topic, isLoading: topicLoading } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => getTopic(topicId || ""),
    enabled: !!topicId,
  });

  const { 
    data: vocabulary, 
    isLoading: vocabularyLoading 
  } = useQuery({
    queryKey: ["vocabulary", topicId],
    queryFn: () => getTopicVocabulary(topicId || ""),
    enabled: !!topicId,
  });

  const isLoading = topicLoading || vocabularyLoading;
  
  const filteredVocabulary = vocabulary?.filter((word) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      word.word.toLowerCase().includes(query) ||
      word.meaning.toLowerCase().includes(query)
    );
  });

  return (
    <div className="page-transition">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link to="/topics">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{topic?.name_topic}</h1>
              <p className="text-gray-500">
                {vocabulary?.length || 0} từ để học
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Tìm kiếm từ vựng..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>

        <Button
          onClick={() => navigate(`/test/${topicId}`)}
          className="w-full md:w-auto"
        >
          <span>Chuyển sang bài kiểm tra</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border rounded-md">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
              <Skeleton className="h-4 w-40 mt-3" />
            </div>
          ))}
        </div>
      ) : filteredVocabulary?.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p>Không tìm thấy từ phù hợp với "{searchQuery}"</p>
          <Button variant="link" onClick={() => setSearchQuery("")}>
            Xóa tìm kiếm
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 animate-fade-in">
          {filteredVocabulary?.map((word, index) => (
            <VocabularyCard key={`vocab-${index}`} word={word} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LearnPage;
