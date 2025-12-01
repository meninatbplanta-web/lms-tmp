import React, { useState } from 'react';
import { Headphones, Video, Check } from 'lucide-react';
import LinearButton from './LinearButton';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface MultimediaItem {
  id: string;
  type: 'audio' | 'video';
  title: string;
  subtitle: string;
  url: string;
  buttonText: string;
}

interface MultimediaSectionProps {
  title: string;
  items: MultimediaItem[];
  nextStepLabel: string;
  nextStepTarget: string;
  onCompleteItem: (itemId: string) => void;
  completedItems: string[];
}

const MultimediaSection: React.FC<MultimediaSectionProps> = ({
  title,
  items,
  nextStepLabel,
  nextStepTarget,
  onCompleteItem,
  completedItems,
}) => {
  const allCompleted = items.every((item) => completedItems.includes(item.id));

  const handleNext = () => {
    smoothScrollTo(nextStepTarget);
  };

  return (
    <section
      id="multimedia"
      className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-colors duration-300"
    >
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
        {title}
      </h2>

      <div className="space-y-6 md:space-y-8">
        {items.map((item) => (
          <MultimediaCard
            key={item.id}
            item={item}
            isCompleted={completedItems.includes(item.id)}
            onComplete={() => onCompleteItem(item.id)}
          />
        ))}
      </div>

      {allCompleted && (
        <div className="mt-6 md:mt-8">
          <LinearButton
            label={nextStepLabel}
            onClick={handleNext}
            icon="right"
            completed={true}
          />
        </div>
      )}
    </section>
  );
};

interface MultimediaCardProps {
  item: MultimediaItem;
  isCompleted: boolean;
  onComplete: () => void;
}

const MultimediaCard: React.FC<MultimediaCardProps> = ({
  item,
  isCompleted,
  onComplete,
}) => {
  const Icon = item.type === 'audio' ? Headphones : Video;
  const bgColor = item.type === 'audio' ? 'bg-purple-50 dark:bg-purple-950/20' : 'bg-blue-50 dark:bg-blue-950/20';
  const iconColor = item.type === 'audio' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400';

  return (
    <div className={`${bgColor} border border-gray-200 dark:border-neutral-800 rounded-xl p-4 md:p-6 transition-all duration-300`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`${iconColor} flex-shrink-0`}>
          <Icon className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400">
            {item.subtitle}
          </p>
        </div>
        {isCompleted && (
          <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
        )}
      </div>

      {/* Player */}
      {item.type === 'audio' ? (
        <audio controls className="w-full mb-4">
          <source src={item.url} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      ) : (
        <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-black">
          <video controls className="w-full h-full">
            <source src={item.url} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      )}

      {!isCompleted && (
        <button
          onClick={onComplete}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
        >
          {item.buttonText}
        </button>
      )}
    </div>
  );
};

export default MultimediaSection;
