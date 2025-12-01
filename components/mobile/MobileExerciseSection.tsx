import React, { useState } from 'react';
import { FileEdit, Check, Save, Eye, Pencil } from 'lucide-react';

interface ExerciseContent {
  id: string;
  title: string;
  instructions: string[];
  placeholder: string;
  buttonText: string;
}

interface MobileExerciseSectionProps {
  content: ExerciseContent;
  isCompleted: boolean;
  savedText: string;
  onComplete: (text: string) => void;
}

const MobileExerciseSection: React.FC<MobileExerciseSectionProps> = ({
  content,
  isCompleted,
  savedText,
  onComplete,
}) => {
  const [text, setText] = useState(savedText || '');
  const [isEditing, setIsEditing] = useState(!isCompleted);

  const handleSave = () => {
    if (text.trim().length > 0) {
      onComplete(text);
      setIsEditing(false);
    }
  };

  return (
    <section className="py-4 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileEdit className="w-5 h-5 text-green-500" />
          Prática
        </h2>
        {isCompleted && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
            Registrado
          </span>
        )}
      </div>

      <div className={`rounded-2xl overflow-hidden border-2 transition-all ${
        isCompleted ? 'border-green-500' : 'border-gray-200 dark:border-neutral-700'
      } bg-white dark:bg-neutral-900`}>
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            {content.title}
          </h3>

          <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-3 mb-4">
            <p className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase mb-2">
              Instruções
            </p>
            <ul className="space-y-2">
              {content.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-neutral-300">
                  <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {index + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {isEditing ? (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={content.placeholder}
                className="w-full h-32 p-4 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
              />
              <button
                onClick={handleSave}
                disabled={text.trim().length === 0}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-3.5 px-4 font-semibold rounded-xl transition-all active:scale-[0.98] ${
                  text.trim().length > 0
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                    : 'bg-gray-200 dark:bg-neutral-700 text-gray-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                {content.buttonText}
              </button>
            </>
          ) : (
            <>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase mb-1">
                      Sua análise
                    </p>
                    <p className="text-sm text-gray-700 dark:text-neutral-300 whitespace-pre-wrap">
                      {savedText}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 font-semibold rounded-xl transition-all active:scale-[0.98]"
              >
                <Pencil className="w-4 h-4" />
                Editar Análise
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileExerciseSection;
