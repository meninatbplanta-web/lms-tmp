import React from 'react';
import { Brain, Heart, Trophy, Shield, Star, Check } from 'lucide-react';

interface TraitCardProps {
  id: string;
  name: string;
  archetype: string;
  icon: string;
  color: string;
  body: string;
  pain: string;
  power: string;
  buttonText: string;
  isCompleted: boolean;
  onComplete: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Brain,
  Heart,
  Trophy,
  Shield,
  Star,
};

const TraitCard: React.FC<TraitCardProps> = ({
  id,
  name,
  archetype,
  icon,
  color,
  body,
  pain,
  power,
  buttonText,
  isCompleted,
  onComplete,
}) => {
  const IconComponent = iconMap[icon] || Brain;

  return (
    <div className="bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-800 rounded-xl p-5 md:p-6 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${color} flex-shrink-0`}>
            <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400">
              {archetype}
            </p>
          </div>
        </div>
        {isCompleted && (
          <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
        )}
      </div>

      {/* Conteúdo */}
      <div className="space-y-3 mb-5">
        <div className="bg-gray-50 dark:bg-neutral-950 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-neutral-500 mb-1">
            CORPO
          </p>
          <p className="text-sm md:text-base text-gray-800 dark:text-neutral-200">
            {body}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
            DOR
          </p>
          <p className="text-sm md:text-base text-gray-800 dark:text-neutral-200">
            {pain}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
            PODER
          </p>
          <p className="text-sm md:text-base text-gray-800 dark:text-neutral-200">
            {power}
          </p>
        </div>
      </div>

      {/* Botão */}
      {!isCompleted && (
        <button
          onClick={onComplete}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default TraitCard;
