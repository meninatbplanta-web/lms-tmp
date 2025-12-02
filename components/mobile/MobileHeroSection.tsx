import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';

interface MobileHeroSectionProps {
  bannerUrl: string;
  title: string;
  subtitle: string;
  badge: string;
  isVideoUnlocked: boolean;
  lockedMessage: {
    title: string;
    text: string;
  };
  onStartStudy: () => void;
}

const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({
  bannerUrl,
  title,
  subtitle,
  badge,
  isVideoUnlocked,
  lockedMessage,
  onStartStudy,
}) => {
  return (
    <section className="relative">
      {isVideoUnlocked ? (
        <>
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/wo2fdlq54Bc"
              title="Aula 01: Fundamentos da Leitura Corporal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          {/* Título Destacado */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 rounded-lg">
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white text-center">
              Aula 01: Fundamentos da Leitura Corporal
            </h2>
          </div>
        </>
      ) : (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
          <img
            src={bannerUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm mb-2">
              <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                {badge}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white leading-tight mb-1">
              {title}
            </h1>
            <p className="text-sm text-white/80">{subtitle}</p>
          </div>
        </div>
      )}

      {!isVideoUnlocked && (
        <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1">
                {lockedMessage.title}
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300/80">
                {lockedMessage.text}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onStartStudy}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-red-500/25 transition-all duration-300 active:scale-[0.98]"
      >
        <Play className="w-5 h-5" />
        <span>Começar Estudo</span>
      </button>
    </section>
  );
};

export default MobileHeroSection;
