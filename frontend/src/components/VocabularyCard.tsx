import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { speakText } from "../utils/speechUtils";

interface VocabularyCardProps {
  word: {
    word: string;
    meaning: string;
    phonetic: string;
  };
}

const VocabularyCard = ({ word }: VocabularyCardProps) => {
  const [playing, setPlaying] = useState(false);

  const handleSpeak = () => {
    if (playing) return;
    
    setPlaying(true);
    speakText(word.word);
    
    // Reset playing state after animation completes
    setTimeout(() => {
      setPlaying(false);
    }, 2000);
  };

  return (
    <Card className="p-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{word.word}</h3>
          <p className="text-sm text-gray-500 mt-1">{word.phonetic}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSpeak}
          className={`text-primary ${playing ? 'animate-pulse' : ''}`}
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </div>
      <p className="mt-3 text-gray-700">{word.meaning}</p>
    </Card>
  );
};

export default VocabularyCard;
