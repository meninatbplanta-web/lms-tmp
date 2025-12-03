import React from 'react';
import { Hourglass } from 'lucide-react';

interface LockedLessonModalProps {
    isOpen: boolean;
    releaseDate: string | null;
    onClose: () => void;
}

const LockedLessonModal: React.FC<LockedLessonModalProps> = ({ isOpen, releaseDate, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-800 p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                <Hourglass className="mx-auto text-orange-500 mb-4" size={40} />
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">Segura a ansiedade! 🧡</h3>
                <p className="text-gray-500 dark:text-neutral-400 mb-6">
                    Estamos preparando tudo com carinho. Esta aula estreia <br />
                    <span className="text-orange-500 font-bold text-lg">{releaseDate}</span>.
                </p>
                <button
                    onClick={onClose}
                    className="bg-gray-100 dark:bg-white text-gray-900 dark:text-black hover:bg-gray-200 dark:hover:bg-neutral-200 font-bold py-3 px-8 rounded uppercase tracking-wide transition-colors"
                >
                    Combinado
                </button>
            </div>
        </div>
    );
};

export default LockedLessonModal;
