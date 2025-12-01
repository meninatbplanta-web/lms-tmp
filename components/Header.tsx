import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  showBackLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackLink = true }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-brand-black border-b border-gray-200 dark:border-neutral-900 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
        <div className="font-heading font-bold text-2xl tracking-wider select-none">
          <Link to="/"><span className="text-brand-black dark:text-white transition-colors">PRISCILLA</span>
          <span className="text-brand-red ml-2">MOREIRA</span></Link>
        </div>

        {/* Mobile Toggle (visible only on small screens next to logo if needed, but flex-col centers items so maybe not needed separate.
            Let's keep it simple: Logo | Toggle | BackLink
            But current layout is Logo | BackLink.
            I will add Toggle to the right side or next to back link.
        */}
      </div>
      
      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-neutral-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {showBackLink && (
          <Link
            to="/"
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;