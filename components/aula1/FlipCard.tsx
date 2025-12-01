import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FlipCardProps {
  id: string;
  frontTitle: string;
  frontText: string;
  backTitle: string;
  backText: string;
  buttonText: string;
  isCompleted: boolean;
  onComplete: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({
  id,
  frontTitle,
  frontText,
  backTitle,
  backText,
  buttonText,
  isCompleted,
  onComplete,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full">
      {/* Flip Card Container */}
      <div
        onClick={handleFlip}
        className="relative w-full h-64 md:h-72 cursor-pointer perspective"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">
            {frontTitle}
          </h3>
          <p className="text-base md:text-lg text-blue-700 dark:text-blue-400 font-semibold">
            {frontText}
          </p>
          <p className="text-xs md:text-sm text-blue-600 dark:text-blue-500 mt-6">
            Clique para revelar →
          </p>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-green-900 dark:text-green-300 mb-4">
            {backTitle}
          </h3>
          <p className="text-base md:text-lg text-green-800 dark:text-green-400 leading-relaxed">
            {backText}
          </p>
          <p className="text-xs md:text-sm text-green-600 dark:text-green-500 mt-6">
            Clique para voltar ←
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleFlip}
          className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
        >
          {isFlipped ? '← Voltar' : 'Revelar →'}
        </button>
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            {buttonText}
          </button>
        )}
        {isCompleted && (
          <div className="flex-1 bg-green-100 dark:bg-green-950/30 border-2 border-green-500 text-green-700 dark:text-green-400 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            Concluído
          </div>
        )}
      </div>
    </div>
  );
};

export default FlipCard;
