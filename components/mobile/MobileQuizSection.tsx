import React, { useState } from 'react';
import { HelpCircle, Check, X, ChevronRight, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface MobileQuizSectionProps {
  title: string;
  questions: Question[];
  savedAnswers: boolean[];
  onCompleteQuestion: (questionIndex: number, isCorrect: boolean) => void;
}

const MobileQuizSection: React.FC<MobileQuizSectionProps> = ({
  title,
  questions,
  savedAnswers,
  onCompleteQuestion,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const totalCorrect = savedAnswers.filter(Boolean).length;
  const allAnswered = savedAnswers.length === questions.length;

  const handleSelectAnswer = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  };

  const handleConfirm = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
      onCompleteQuestion(currentQuestion, selectedAnswer === question.correctAnswer);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResult(false);
  };

  if (showResult || allAnswered) {
    const percentage = (totalCorrect / questions.length) * 100;
    return (
      <section className="py-4 px-4">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Quiz Concluído!
          </h2>
          <p className="text-4xl font-black text-white mb-2">
            {totalCorrect}/{questions.length}
          </p>
          <p className="text-white/80 text-sm mb-6">
            {percentage === 100 
              ? 'Perfeito! Você dominou o conteúdo!' 
              : percentage >= 66 
                ? 'Muito bem! Continue estudando!' 
                : 'Revise o material e tente novamente.'}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl transition-all active:scale-[0.98]"
          >
            Refazer Quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-500" />
          {title}
        </h2>
        <span className="text-sm text-gray-500 dark:text-neutral-400">
          {currentQuestion + 1}/{questions.length}
        </span>
      </div>

      <div className="flex gap-1 mb-6">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index < currentQuestion
                ? savedAnswers[index]
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : index === currentQuestion
                  ? 'bg-purple-500'
                  : 'bg-gray-200 dark:bg-neutral-700'
            }`}
          />
        ))}
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border-2 border-gray-200 dark:border-neutral-700 p-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5 leading-snug">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            
            let bgClass = 'bg-gray-50 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700';
            let textClass = 'text-gray-900 dark:text-white';
            
            if (isAnswered) {
              if (isCorrectOption) {
                bgClass = 'bg-green-100 dark:bg-green-900/30 border-green-500';
                textClass = 'text-green-900 dark:text-green-300';
              } else if (isSelected && !isCorrectOption) {
                bgClass = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                textClass = 'text-red-900 dark:text-red-300';
              }
            } else if (isSelected) {
              bgClass = 'bg-purple-100 dark:bg-purple-900/30 border-purple-500';
              textClass = 'text-purple-900 dark:text-purple-300';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${textClass} ${
                  !isAnswered ? 'active:scale-[0.98]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{option}</span>
                  {isAnswered && isCorrectOption && (
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {!isAnswered ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedAnswer}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 font-semibold rounded-xl transition-all ${
                selectedAnswer
                  ? 'bg-purple-600 text-white active:scale-[0.98]'
                  : 'bg-gray-200 dark:bg-neutral-700 text-gray-400 dark:text-neutral-500 cursor-not-allowed'
              }`}
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98]"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Próxima Pergunta
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                'Ver Resultado'
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileQuizSection;
