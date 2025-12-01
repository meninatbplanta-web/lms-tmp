import React from 'react';
import { Trophy, Lock, Calendar, Bell } from 'lucide-react';

interface CompletionCardProps {
  title: string;
  message: string;
  nextLessonInfo: {
    title: string;
    release_date: string;
    buttonText: string;
    action: string;
  };
  progressPercentage: number;
}

const CompletionCard: React.FC<CompletionCardProps> = ({
  title,
  message,
  nextLessonInfo,
  progressPercentage,
}) => {
  const handleReminder = () => {
    // Lógica para adicionar ao calendário (pode ser implementada depois)
    alert('Funcionalidade de lembrete será implementada em breve!');
  };

  return (
    <section
      id="completion_card"
      className="mb-6 md:mb-8"
    >
      {/* Card de Parabéns */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-2 border-green-200 dark:border-green-800 rounded-xl md:rounded-2xl p-8 md:p-10 mb-6 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>

        <div className="inline-block bg-white dark:bg-neutral-900 rounded-full px-6 py-3 mb-6 shadow-md">
          <p className="text-5xl md:text-6xl font-bold text-green-600 dark:text-green-400">
            {progressPercentage.toFixed(0)}%
          </p>
        </div>

        <p className="text-lg md:text-xl text-gray-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {message}
        </p>

        {/* Barra de Progresso Visual */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 dark:text-neutral-400 mb-2">
            <span>Aula 1</span>
            <span>Aula 2</span>
            <span>Aula 3</span>
            <span>Aula 4</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1 h-3 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
            <div className="flex-1 h-3 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
            <div className="flex-1 h-3 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Card de Bloqueio da Aula 2 */}
      <div className="bg-white dark:bg-brand-black border-2 border-gray-300 dark:border-neutral-800 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 md:w-7 md:h-7 text-gray-500 dark:text-neutral-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              {nextLessonInfo.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-neutral-400">
              <Calendar className="w-5 h-5" />
              <span className="text-base md:text-lg font-semibold">
                Liberação: {nextLessonInfo.release_date}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <p className="text-sm md:text-base text-amber-900 dark:text-amber-300">
            ⏳ <strong>Aguarde a estreia!</strong> A Aula 2 será liberada automaticamente na data agendada. Não perca!
          </p>
        </div>

        <button
          onClick={handleReminder}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Bell className="w-5 h-5" />
          {nextLessonInfo.buttonText}
        </button>
      </div>
    </section>
  );
};

export default CompletionCard;
