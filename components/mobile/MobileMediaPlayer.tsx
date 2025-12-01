import React, { useState, useRef } from 'react';
import { Headphones, Video, Play, Pause, Check, Volume2 } from 'lucide-react';

interface MobileMediaPlayerProps {
  id: string;
  type: 'audio' | 'video';
  title: string;
  subtitle: string;
  url: string;
  isCompleted: boolean;
  onComplete: () => void;
}

const MobileMediaPlayer: React.FC<MobileMediaPlayerProps> = ({
  id,
  type,
  title,
  subtitle,
  url,
  isCompleted,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const percent = (mediaRef.current.currentTime / mediaRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const Icon = type === 'audio' ? Headphones : Video;
  const bgGradient = type === 'audio' 
    ? 'from-purple-500 to-indigo-600' 
    : 'from-blue-500 to-cyan-600';

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-800">
      <div className={`h-2 bg-gradient-to-r ${bgGradient}`} style={{ width: `${progress}%` }} />
      
      <div className="p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg transition-transform active:scale-95`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4 text-gray-400 dark:text-neutral-500 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                {title}
              </h3>
              {isCompleted && (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-neutral-400 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {type === 'audio' && (
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="hidden"
          />
        )}

        {type === 'video' && (
          <div className="mt-4 aspect-video rounded-xl overflow-hidden bg-black">
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={url}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              className="w-full h-full"
              playsInline
            />
          </div>
        )}

        {!isCompleted && progress > 50 && (
          <button
            onClick={onComplete}
            className="mt-4 w-full py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl transition-all active:scale-[0.98]"
          >
            Marcar como Concluído
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMediaPlayer;
