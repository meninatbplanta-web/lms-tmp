import React, { useState } from 'react';
import { HelpCircle, Check, X } from 'lucide-react';
import LinearButton from './LinearButton';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizSectionProps {
  title: string;
  questions: Question[];
  nextStepLabel: string;
  nextStepTarget: string;
  onCompleteQuestion: (questionId: number, isCorrect: boolean) => void;
  savedAnswers: boolean[];
}

const QuizSection: React.FC<QuizSectionProps> = ({
  title,
  questions,
  nextStepLabel,
  nextStepTarget,
  onCompleteQuestion,
  savedAnswers,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const allAnswered = questions.every((q) => submitted[q.id]);

  const handleSubmit = (questionId: number, selectedAnswer: string, correctAnswer: string) => {
    const isCorrect = selectedAnswer === correctAnswer;
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    onCompleteQuestion(questionId - 1, isCorrect);
  };

  const handleNext = () => {
    smoothScrollTo(nextStepTarget);
  };

  const correctCount = questions.filter((q, index) => savedAnswers[index]).length;

  return (
    <section
      id="quiz-section"
      className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="space-y-6 md:space-y-8">
        {questions.map((question, index) => (
          <QuizQuestion
            key={question.id}
            question={question}
            selectedAnswer={answers[question.id]}
            onSelectAnswer={(answer) =>
              setAnswers((prev) => ({ ...prev, [question.id]: answer }))
            }
            onSubmit={(answer) => handleSubmit(question.id, answer, question.correctAnswer)}
            isSubmitted={submitted[question.id]}
            savedAnswer={savedAnswers[index]}
          />
        ))}
      </div>

      {allAnswered && (
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-6 mb-6 text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Resultado: {correctCount} de {questions.length} corretas
            </p>
            <p className="text-gray-600 dark:text-neutral-400">
              {correctCount === questions.length
                ? '🎉 Perfeito! Você dominou o conteúdo!'
                : correctCount >= questions.length / 2
                ? '👏 Bom trabalho! Continue estudando.'
                : '📚 Revise o material e tente novamente.'}
            </p>
          </div>

          <LinearButton
            label={nextStepLabel}
            onClick={handleNext}
            icon="right"
            completed={true}
          />
        </div>
      )}
    </section>
  );
};

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
  onSubmit: (answer: string) => void;
  isSubmitted: boolean;
  savedAnswer?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  isSubmitted,
  savedAnswer,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-950 rounded-lg p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {question.id}. {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = selectedAnswer === option;
          const showFeedback = isSubmitted;

          let bgColor = 'bg-white dark:bg-neutral-900';
          let borderColor = 'border-gray-300 dark:border-neutral-700';
          let textColor = 'text-gray-900 dark:text-white';

          if (showFeedback) {
            if (isCorrect) {
              bgColor = 'bg-green-100 dark:bg-green-950/30';
              borderColor = 'border-green-500';
              textColor = 'text-green-900 dark:text-green-300';
            } else if (isSelected && !isCorrect) {
              bgColor = 'bg-red-100 dark:bg-red-950/30';
              borderColor = 'border-red-500';
              textColor = 'text-red-900 dark:text-red-300';
            }
          } else if (isSelected) {
            bgColor = 'bg-blue-100 dark:bg-blue-950/30';
            borderColor = 'border-blue-500';
          }

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && onSelectAnswer(option)}
              disabled={isSubmitted}
              className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${
                !isSubmitted ? 'hover:border-blue-400 cursor-pointer' : 'cursor-default'
              }`}
            >
              <span className="text-left text-base md:text-lg">{option}</span>
              {showFeedback && isCorrect && <Check className="w-5 h-5 text-green-600" />}
              {showFeedback && isSelected && !isCorrect && <X className="w-5 h-5 text-red-600" />}
            </button>
          );
        })}
      </div>

      {!isSubmitted && selectedAnswer && (
        <button
          onClick={() => onSubmit(selectedAnswer)}
          className="mt-4 w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
        >
          Confirmar Resposta
        </button>
      )}
    </div>
  );
};

export default QuizSection;
