import { useState, useEffect } from 'react';

interface Aula4Progress {
    completedSections: string[];
    points: number;
    currentBadge: 'iniciante' | 'analista';
    quizAnswers: boolean[];
    exerciseText: string;
    progressPercentage: number;
}

const INITIAL_PROGRESS: Aula4Progress = {
    completedSections: [],
    points: 0,
    currentBadge: 'iniciante',
    quizAnswers: [],
    exerciseText: '',
    progressPercentage: 0,
};

const SECTION_POINTS: Record<string, number> = {
    sec_recaptulacao: 50,
    sec_cenario: 50,
    sec_atuacao: 50,
    sec_possibilidades: 50,
    sec_encerramento: 50,
    sec_final_cta: 50,
};

const BADGE_THRESHOLDS = {
    iniciante: 0,
    analista: 300,
};

export const useAula4Progress = () => {
    const [progress, setProgress] = useState<Aula4Progress>(INITIAL_PROGRESS);

    // Carregar progresso do localStorage ao montar
    useEffect(() => {
        const saved = localStorage.getItem('aula4_progress');
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
        localStorage.setItem('aula4_progress', JSON.stringify(progress));
    }, [progress]);

    const completeSection = (sectionId: string) => {
        setProgress((prev) => {
            if (prev.completedSections.includes(sectionId)) {
                return prev; // Já completado
            }

            const newCompleted = [...prev.completedSections, sectionId];
            const newPoints = prev.points + (SECTION_POINTS[sectionId] || 0);

            // Calcular badge atual
            let newBadge: 'iniciante' | 'analista' = 'iniciante';
            if (newPoints >= BADGE_THRESHOLDS.analista) {
                newBadge = 'analista';
            }

            // Calcular percentual (máximo 100% para Aula 4)
            const totalPoints = Object.values(SECTION_POINTS).reduce((a, b) => a + b, 0);
            const rawPercentage = totalPoints > 0 ? (newPoints / totalPoints) * 100 : 0;

            // Aula 4 contributes the final 25% of the course (75% to 100%)
            const progressPercentage = 75 + (rawPercentage * 0.25);

            return {
                ...prev,
                completedSections: newCompleted,
                points: newPoints,
                currentBadge: newBadge,
                progressPercentage: progressPercentage,
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
        localStorage.removeItem('aula4_progress');
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
