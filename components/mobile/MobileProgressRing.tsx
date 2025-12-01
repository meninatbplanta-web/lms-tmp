import React from 'react';

interface MobileProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  badge: string;
  badgeLabel: string;
}

const MobileProgressRing: React.FC<MobileProgressRingProps> = ({
  percentage,
  size = 56,
  strokeWidth = 4,
  badge,
  badgeLabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-neutral-800"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg">{badge}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">
          {badgeLabel}
        </span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default MobileProgressRing;
