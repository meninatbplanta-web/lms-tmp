import React from 'react';
import { Lock, Calendar } from 'lucide-react';

interface VideoHeroProps {
  isUnlocked: boolean;
  lockedMessage?: {
    title: string;
    text: string;
  };
  videoUrl?: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  isUnlocked,
  lockedMessage = {
    title: '📅 AULA INAUGURAL AGENDADA',
    text: 'A transmissão oficial começará dia 01/12 às 20h. Prepare seu material.',
  },
  videoUrl = 'https://www.youtube.com/embed/zLz7AYdBoGU',
}) => {
  return (
    <div
      id="video-hero"
      className="w-full aspect-video bg-black rounded-xl md:rounded-2xl border border-gray-200 dark:border-neutral-800 mb-6 md:mb-8 relative overflow-hidden shadow-2xl"
    >
      {isUnlocked ? (
        <div className="absolute inset-0 bg-black">
          <iframe
            width="100%"
            height="100%"
            src={videoUrl}
            title="Vídeo da Aula"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>

          {/* Overlay de Estreia (remover após liberação) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10 pointer-events-none">
            <div className="text-center px-4">
              <Calendar className="w-12 h-12 md:w-16 md:h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                ESTREIA
              </h3>
              <p className="text-xl md:text-2xl text-red-500 font-bold">
                DIA 01/12 às 20h
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-950 dark:to-neutral-900 text-center p-6 md:p-8">
          <Lock size={48} className="text-gray-400 dark:text-neutral-700 mb-4 md:mb-6" />
          <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-700 dark:text-neutral-300 mb-3 md:mb-4">
            {lockedMessage.title}
          </h3>
          <p className="text-base md:text-lg text-gray-600 dark:text-neutral-500 max-w-md mx-auto leading-relaxed">
            {lockedMessage.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoHero;
