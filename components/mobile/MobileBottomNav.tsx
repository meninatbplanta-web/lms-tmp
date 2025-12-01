import React from 'react';
import { BookOpen, Users, FileEdit, HelpCircle, Check } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
}

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  completedSections: string[];
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
  completedSections,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'teoria',
      label: 'Teoria',
      icon: <BookOpen className="w-5 h-5" />,
      isCompleted: completedSections.includes('fundamentos_1') && completedSections.includes('fundamentos_key'),
    },
    {
      id: 'perfis',
      label: 'Perfis',
      icon: <Users className="w-5 h-5" />,
      isCompleted: ['esquizoide', 'oral', 'psicopata', 'masoquista', 'rigido'].every(id => completedSections.includes(id)),
    },
    {
      id: 'pratica',
      label: 'Prática',
      icon: <FileEdit className="w-5 h-5" />,
      isCompleted: completedSections.includes('ex_analise'),
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: <HelpCircle className="w-5 h-5" />,
      isCompleted: ['quiz_1', 'quiz_2', 'quiz_3'].every(id => completedSections.includes(id)),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-neutral-800 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-red-600 dark:text-red-500'
                  : 'text-gray-500 dark:text-neutral-400'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.isCompleted && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
