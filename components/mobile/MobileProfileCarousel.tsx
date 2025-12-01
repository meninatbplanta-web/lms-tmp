import React, { useState, useRef } from 'react';
import { Brain, Heart, Trophy, Shield, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  archetype: string;
  icon: string;
  color: string;
  body: string;
  pain: string;
  power: string;
  buttonText: string;
}

interface MobileProfileCarouselProps {
  profiles: Profile[];
  completedItems: string[];
  onComplete: (id: string) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Brain,
  Heart,
  Trophy,
  Shield,
  Star,
};

const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
  'text-purple-500': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', gradient: 'from-purple-500 to-indigo-600' },
  'text-pink-500': { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400', gradient: 'from-pink-500 to-rose-600' },
  'text-amber-500': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', gradient: 'from-amber-500 to-orange-600' },
  'text-slate-600': { bg: 'bg-slate-100 dark:bg-slate-900/30', text: 'text-slate-600 dark:text-slate-400', gradient: 'from-slate-500 to-gray-600' },
  'text-red-500': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', gradient: 'from-red-500 to-rose-600' },
};

const MobileProfileCarousel: React.FC<MobileProfileCarouselProps> = ({
  profiles,
  completedItems,
  onComplete,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = containerRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth * 0.85;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const completedCount = profiles.filter(p => completedItems.includes(p.id)).length;

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Os 5 Perfis
        </h2>
        <span className="text-sm text-gray-500 dark:text-neutral-400">
          {completedCount}/{profiles.length} estudados
        </span>
      </div>

      <div className="flex gap-2 mb-4 px-4">
        {profiles.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-6 bg-red-500'
                : 'w-1.5 bg-gray-300 dark:bg-neutral-700'
            }`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {profiles.map((profile, index) => {
          const IconComponent = iconMap[profile.icon] || Brain;
          const colors = colorMap[profile.color] || colorMap['text-purple-500'];
          const isCompleted = completedItems.includes(profile.id);

          return (
            <div
              key={profile.id}
              className="flex-shrink-0 w-[85%] snap-center"
            >
              <div className={`rounded-2xl overflow-hidden border-2 ${isCompleted ? 'border-green-500' : 'border-gray-200 dark:border-neutral-700'} bg-white dark:bg-neutral-900`}>
                <div className={`h-2 bg-gradient-to-r ${colors.gradient}`} />
                
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {profile.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-neutral-400">
                        {profile.archetype}
                      </p>
                    </div>
                    {isCompleted && (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-3">
                      <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wide">
                        Corpo
                      </span>
                      <p className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                        {profile.body}
                      </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                        Dor
                      </span>
                      <p className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                        {profile.pain}
                      </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                      <span className="text-[10px] font-bold text-green-500 uppercase tracking-wide">
                        Poder
                      </span>
                      <p className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                        {profile.power}
                      </p>
                    </div>
                  </div>

                  {!isCompleted && (
                    <button
                      onClick={() => onComplete(profile.id)}
                      className={`mt-4 w-full py-3.5 px-4 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg`}
                    >
                      {profile.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MobileProfileCarousel;
