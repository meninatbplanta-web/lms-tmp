import React from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';

interface LinearButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  icon?: 'down' | 'right' | 'check';
  disabled?: boolean;
  completed?: boolean;
}

const LinearButton: React.FC<LinearButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  icon = 'right',
  disabled = false,
  completed = false,
}) => {
  const baseClasses =
    'w-full flex items-center justify-center gap-2 px-6 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: completed
      ? 'bg-green-500 text-white hover:bg-green-600'
      : 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-700',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  const IconComponent = completed
    ? Check
    : icon === 'down'
    ? ChevronDown
    : icon === 'check'
    ? Check
    : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <span>{label}</span>
      <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
};

export default LinearButton;
