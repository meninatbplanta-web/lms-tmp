import React from 'react';
import { Award, Calendar, Bell, Lock, CheckCircle } from 'lucide-react';

import { Link } from 'react-router-dom';

interface LessonInfo {
  id: number;
  title: string;
  release_date?: string;
  status: string;
  link?: string;
}

interface MobileCompletionSectionProps {
  title: string;
  message: string;
  progressPercentage: number;
  lessons: LessonInfo[];
  nextLessonInfo: {
    title: string;
    release_date: string;
    buttonText: string;
  };
}

const MobileCompletionSection: React.FC<MobileCompletionSectionProps> = ({
  title,
  message,
  progressPercentage,
  lessons,
  nextLessonInfo,
}) => {
  return (
    <section className="py-4 px-4 pb-24">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/90 text-sm mb-4">{message}</p>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Progresso Geral</span>
            <span className="text-white font-bold">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Cronograma das Aulas
      </h3>

      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isActive = lesson.status === 'active';
          const isLocked = lesson.status === 'locked';
          const isCompleted = index === 0 && progressPercentage >= 25;

          const CardContent = (
            <div
              className={`rounded-xl p-4 border-2 transition-all ${isActive
                  ? isCompleted
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCompleted
                    ? 'bg-green-100 dark:bg-green-900/50'
                    : isActive
                      ? 'bg-blue-100 dark:bg-blue-900/50'
                      : 'bg-gray-100 dark:bg-neutral-800'
                  }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400 dark:text-neutral-500" />
                  ) : (
                    <span className={`text-sm font-bold ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                      }`}>{lesson.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${isLocked ? 'text-gray-400 dark:text-neutral-500' : 'text-gray-900 dark:text-white'
                    }`}>
                    {lesson.title}
                  </h4>
                  {lesson.release_date && (
                    <p className="text-xs text-gray-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(lesson.release_date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
                {isActive && !isCompleted && (
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                    Atual
                  </span>
                )}
              </div>
            </div>
          );

          if (lesson.link) {
            return (
              <Link key={lesson.id} to={lesson.link} className="block">
                {CardContent}
              </Link>
            );
          }

          return <div key={lesson.id}>{CardContent}</div>;
        })}
      </div>

      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border-2 border-amber-200 dark:border-amber-800/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1">
              {nextLessonInfo.title}
            </h4>
            <p className="text-xs text-amber-700 dark:text-amber-300/80 mb-3">
              Liberação: {nextLessonInfo.release_date}
            </p>
            <button className="w-full py-2.5 px-4 bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.98]">
              {nextLessonInfo.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileCompletionSection;
