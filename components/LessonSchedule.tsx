import React from 'react';
import { Play, Lock, CheckCircle } from 'lucide-react';
import { LESSONS, ALL_MODULES } from '../data/lessons';
import { isLessonAvailable, formatReleaseDate } from '../constants';

interface LessonScheduleProps {
    currentLessonId: number;
    onLessonChange: (id: number) => void;
    onLessonLocked?: (releaseDate: string) => void;
    completedLessons?: number[];
    className?: string;
}

const LessonSchedule: React.FC<LessonScheduleProps> = ({
    currentLessonId,
    onLessonChange,
    onLessonLocked,
    completedLessons = [],
    className = "mb-8"
}) => {
    // Get modules for the minicourse
    const courseModules = ALL_MODULES.filter(m => m.courseId === 'minicourse');

    const handleLessonClick = (lesson: any) => {
        if (!isLessonAvailable(lesson)) {
            if (onLessonLocked) {
                onLessonLocked(formatReleaseDate(lesson.releaseDate || ''));
            }
        } else {
            onLessonChange(lesson.id);
        }
    };

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                    Cronograma das Aulas
                </h3>
                <span className="text-xs text-gray-500 dark:text-neutral-400 font-medium bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                    {courseModules[0]?.lessons.length} Aulas
                </span>
            </div>

            <div className="flex flex-col gap-3">
                {courseModules[0]?.lessons.map((lesson, index) => {
                    const isActive = lesson.id === currentLessonId;
                    const isLocked = !isLessonAvailable(lesson);
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                        <div
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            className={`relative overflow-hidden flex items-center gap-4 p-4 rounded-xl cursor-pointer group transition-all duration-300 border 
                ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-md transform scale-[1.02]'
                                    : isLocked
                                        ? 'bg-gray-50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800 opacity-80'
                                        : 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-md'
                                }`}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 rounded-l-xl"></div>}

                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                ${isCompleted
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                    : isActive
                                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                        : 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400'}`}>
                                {isCompleted ? <CheckCircle size={20} /> : (isActive ? <span className="font-bold text-lg">{index + 1}</span> : (isLocked ? <Lock size={18} /> : <span className="font-bold text-lg">{index + 1}</span>))}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    {isActive && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-200/50 dark:bg-indigo-800/50 px-2 py-0.5 rounded-full">
                                            VOCÊ ESTÁ AQUI
                                        </span>
                                    )}
                                    {!isLocked && !isActive && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-200/50 dark:bg-blue-800/50 px-2 py-0.5 rounded-full">
                                            Aula {index + 1} Liberada
                                        </span>
                                    )}
                                </div>
                                <h4 className={`font-heading font-bold text-sm md:text-base leading-tight truncate transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-neutral-200'}`}>
                                    {isActive ? `Aula ${index + 1}: ${lesson.title}` : lesson.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500 dark:text-neutral-500 flex items-center gap-1">
                                        {lesson.releaseDate ? (() => {
                                            const date = new Date(lesson.releaseDate);
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            const hours = date.getHours().toString().padStart(2, '0');
                                            const minutes = date.getMinutes().toString().padStart(2, '0');
                                            return `🗓️ ${day}/${month}, ${hours}:${minutes}`;
                                        })() : (lesson.duration || '60:00')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LessonSchedule;
