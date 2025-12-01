import React from 'react';
import * as Progress from '@radix-ui/react-progress';

interface Badge {
  label: string;
  icon: string;
  color: string;
  threshold: number;
}

interface ProgressHeaderProps {
  progressPercentage: number;
  currentBadge: 'iniciante' | 'explorador' | 'mestre';
  badges: Record<string, Badge>;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  progressPercentage,
  currentBadge,
  badges,
}) => {
  const badge = badges[currentBadge];

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-brand-black border-b border-gray-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* Badge e Percentual */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold ${badge.color}`}
            >
              <span className="text-base">{badge.icon}</span>
              {badge.label}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-500">
              Progresso da Certificação
            </p>
            <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              {progressPercentage.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <Progress.Root
          className="relative overflow-hidden bg-gray-200 dark:bg-neutral-800 rounded-full w-full h-3 md:h-4"
          value={progressPercentage}
        >
          <Progress.Indicator
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-transform duration-500 ease-out rounded-full"
            style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
          />
        </Progress.Root>

        {/* Meta */}
        <p className="text-xs text-gray-500 dark:text-neutral-500 mt-2 text-center">
          Meta: Complete as 4 aulas para liberar o Certificado Profissional
        </p>
      </div>
    </div>
  );
};

export default ProgressHeader;
