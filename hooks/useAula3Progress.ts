import { useState, useEffect } from 'react';

interface Aula3Progress {
    completedSections: string[];
    points: number;
    currentBadge: 'iniciante' | 'explorador' | 'mestre';
    quizAnswers: boolean[];
    exerciseText: string;
    progressPercentage: number;
}

const INITIAL_PROGRESS: Aula3Progress = {
    completedSections: [],
    points: 0,
    currentBadge: 'iniciante',
    quizAnswers: [],
    exerciseText: '',
    progressPercentage: 0,
};

const SECTION_POINTS: Record<string, number> = {
    sec_intro: 50,
    sec_andares: 50,
    sec_pensar: 50,
    sec_sentir: 50,
    sec_agir: 50,
    sec_sintese: 50,
    sec_cta: 50,
};

const BADGE_THRESHOLDS = {
    iniciante: 150,
    explorador: 300,
    mestre: 550,
};

export const useAula3Progress = () => {
    const [progress, setProgress] = useState<Aula3Progress>(INITIAL_PROGRESS);

    // Carregar progresso do localStorage ao montar
    useEffect(() => {
        const saved = localStorage.getItem('aula3_progress');
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) {
                console.error('Erro ao carregar progresso:', e);
            }
        }
    }, []);

    // Salvar progresso no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem('aula3_progress', JSON.stringify(progress));
    }, [progress]);

    const completeSection = (sectionId: string) => {
        setProgress((prev) => {
            if (prev.completedSections.includes(sectionId)) {
                return prev; // Já completado
            }

            const newCompleted = [...prev.completedSections, sectionId];
            const newPoints = prev.points + (SECTION_POINTS[sectionId] || 0);

            // Calcular badge atual
            let newBadge: 'iniciante' | 'explorador' | 'mestre' = 'iniciante';
            if (newPoints >= BADGE_THRESHOLDS.mestre) {
                newBadge = 'mestre';
            } else if (newPoints >= BADGE_THRESHOLDS.explorador) {
                newBadge = 'explorador';
            }

            // Calcular percentual (máximo 25% para Aula 3)
            const totalPoints = Object.values(SECTION_POINTS).reduce((a, b) => a + b, 0);
            const rawPercentage = totalPoints > 0 ? (newPoints / totalPoints) * 100 : 0;
            const cappedPercentage = Math.min(rawPercentage, 25);

            return {
                ...prev,
                completedSections: newCompleted,
                points: newPoints,
                currentBadge: newBadge,
                progressPercentage: cappedPercentage,
            };
        });
    };

    const saveExercise = (text: string) => {
        setProgress((prev) => ({
            ...prev,
            exerciseText: text,
        }));
    };

    const saveQuizAnswer = (questionIndex: number, isCorrect: boolean) => {
        setProgress((prev) => {
            const newAnswers = [...prev.quizAnswers];
            newAnswers[questionIndex] = isCorrect;
            return {
                ...prev,
                quizAnswers: newAnswers,
            };
        });
    };

    const resetProgress = () => {
        setProgress(INITIAL_PROGRESS);
        localStorage.removeItem('aula3_progress');
    };

    const isSectionCompleted = (sectionId: string) => {
        return progress.completedSections.includes(sectionId);
    };

    return {
        progress,
        completeSection,
        saveExercise,
        saveQuizAnswer,
        resetProgress,
        isSectionCompleted,
    };
};
