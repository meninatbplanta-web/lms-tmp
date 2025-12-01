import React from 'react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileProgressRing from './MobileProgressRing';

interface MobileHeaderProps {
  progressPercentage: number;
  currentBadge: string;
  badgeLabel: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const badgeEmojis: Record<string, string> = {
  iniciante: '📚',
  explorador: '📝',
  mestre: '🎓',
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
  progressPercentage,
  currentBadge,
  badgeLabel,
  isDarkMode,
  onToggleTheme,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-gray-100 dark:border-neutral-800 safe-area-inset-top">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-neutral-400" />
        </button>

        <MobileProgressRing
          percentage={progressPercentage}
          size={48}
          strokeWidth={3}
          badge={badgeEmojis[currentBadge] || '📚'}
          badgeLabel={badgeLabel}
        />

        <button
          onClick={onToggleTheme}
          className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center transition-all active:scale-95"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
