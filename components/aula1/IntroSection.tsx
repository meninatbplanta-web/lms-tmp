import React from 'react';
import LinearButton from './LinearButton';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface IntroSectionProps {
  title: string;
  subtitle: string;
  content: string[];
  nextStepLabel: string;
  nextStepTarget: string;
  onComplete: () => void;
  isCompleted: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  title,
  subtitle,
  content,
  nextStepLabel,
  nextStepTarget,
  onComplete,
  isCompleted,
}) => {
  const handleNext = () => {
    onComplete();
    smoothScrollTo(nextStepTarget);
  };

  return (
    <section
      id="intro"
      className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-colors duration-300"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium italic">
          {subtitle}
        </p>
      </div>

      <div className="space-y-4 md:space-y-6 text-gray-700 dark:text-neutral-300 leading-relaxed">
        {content.map((paragraph, index) => (
          <p key={index} className="text-base md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-6 md:mt-8">
        <LinearButton
          label={nextStepLabel}
          onClick={handleNext}
          icon="down"
          completed={isCompleted}
        />
      </div>
    </section>
  );
};

export default IntroSection;
