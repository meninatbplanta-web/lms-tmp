import React from 'react';
import { BookOpen, Users, FileEdit, HelpCircle, Award, Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileBottomNavProps {
  onLessonLocked: (releaseDate: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onLessonLocked }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 1,
      label: 'Aula 1',
      date: '2026-01-12T20:00:00',
      icon: FileEdit,
      path: '/aula/1',
      subtitle: '12/01 20hs'
    },
    {
      id: 2,
      label: 'Aula 2',
      date: '2026-01-14T20:00:00',
      icon: FileEdit,
      path: '/aula/2',
      subtitle: '14/01 20hs'
    },
    {
      id: 3,
      label: 'Aula 3',
      date: '2026-01-16T20:00:00',
      icon: FileEdit,
      path: '/aula/3',
      subtitle: '16/01 20hs'
    },
    {
      id: 4,
      label: 'Aula 4',
      date: '2026-01-18T15:00:00',
      icon: FileEdit,
      path: '/aula/4',
      subtitle: '18/01 15hs'
    },
    {
      id: 'cert',
      label: 'Certificado',
      date: '2026-01-25T00:00:00',
      icon: Award,
      path: 'EXTERNAL',
      subtitle: 'Liberado 25/01'
    },
  ];

  const handleClick = (item: any) => {
    const now = new Date();
    const releaseDate = new Date(item.date);

    if (now < releaseDate) {
      onLessonLocked(item.date);
      return;
    }

    if (item.id === 'cert') {
      window.open('https://certificado-dusky.vercel.app/', '_blank');
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-neutral-800 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isLocked = new Date() < new Date(item.date);

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl transition-all duration-200 relative ${isActive
                ? 'text-red-600 dark:text-red-500'
                : 'text-gray-500 dark:text-neutral-400'
                }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {isLocked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full flex items-center justify-center">
                    <Lock className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {item.subtitle && (
                <span className="text-[9px] text-gray-400 leading-tight">
                  {item.subtitle}
                </span>
              )}
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
