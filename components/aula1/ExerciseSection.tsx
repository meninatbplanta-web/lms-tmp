import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import LinearButton from './LinearButton';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface ExerciseSectionProps {
  title: string;
  content: {
    id: string;
    title: string;
    instructions: string[];
    placeholder: string;
    buttonText: string;
  };
  nextStepLabel: string;
  nextStepTarget: string;
  onComplete: (text: string) => void;
  savedText: string;
  isCompleted: boolean;
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  title,
  content,
  nextStepLabel,
  nextStepTarget,
  onComplete,
  savedText,
  isCompleted,
}) => {
  const [text, setText] = useState(savedText);

  const handleSave = () => {
    if (text.trim().length > 0) {
      onComplete(text);
    }
  };

  const handleNext = () => {
    smoothScrollTo(nextStepTarget);
  };

  return (
    <section
      id="exercises-section"
      className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-5 md:p-6 mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {content.title}
        </h3>
        <ul className="space-y-3 mb-6">
          {content.instructions.map((instruction, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700 dark:text-neutral-300"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-base md:text-lg">{instruction}</span>
            </li>
          ))}
        </ul>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={content.placeholder}
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-base md:text-lg"
        />

        {!isCompleted && (
          <button
            onClick={handleSave}
            disabled={text.trim().length === 0}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {content.buttonText}
          </button>
        )}
      </div>

      {isCompleted && (
        <LinearButton
          label={nextStepLabel}
          onClick={handleNext}
          icon="right"
          completed={true}
        />
      )}
    </section>
  );
};

export default ExerciseSection;
