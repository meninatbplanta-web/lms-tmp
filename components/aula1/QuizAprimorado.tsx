import React, { useState } from 'react';
import { HelpCircle, Check, X, Zap, Trophy } from 'lucide-react';
import LinearButton from './LinearButton';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizAprimoradoProps {
  title: string;
  questions: Question[];
  nextStepLabel: string;
  nextStepTarget: string;
  onCompleteQuestion: (questionId: number, isCorrect: boolean) => void;
  savedAnswers: boolean[];
}

const QuizAprimorado: React.FC<QuizAprimoradoProps> = ({
  title,
  questions,
  nextStepLabel,
  nextStepTarget,
  onCompleteQuestion,
  savedAnswers,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const allAnswered = questions.every((q) => submitted[q.id]);
  const currentQuestion = questions[currentQuestionIndex];
  const correctCount = questions.filter((q, index) => savedAnswers[index]).length;

  const handleSubmit = (questionId: number, selectedAnswer: string, correctAnswer: string) => {
    const isCorrect = selectedAnswer === correctAnswer;
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    onCompleteQuestion(questionId - 1, isCorrect);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    smoothScrollTo(nextStepTarget);
  };

  // Se todas as perguntas foram respondidas, mostrar resultado
  if (allAnswered) {
    return (
      <section
        id="quiz-section"
        className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-colors duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Resultado Final
          </h2>
        </div>

        {/* Score Card */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl p-8 mb-8 text-center border-2 border-purple-200 dark:border-purple-800">
          <div className="mb-6">
            <div className="inline-block">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white">
                    {Math.round((correctCount / questions.length) * 100)}%
                  </p>
                  <p className="text-white font-semibold text-sm md:text-base">
                    {correctCount}/{questions.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {correctCount === questions.length
              ? '🎉 Perfeito! Você é um Decodificador!'
              : correctCount >= questions.length / 2
              ? '👏 Excelente! Você está no caminho certo!'
              : '📚 Continue estudando e tente novamente!'}
          </h3>

          <p className="text-gray-700 dark:text-neutral-300 text-lg md:text-xl mb-6">
            {correctCount === questions.length
              ? 'Você dominou completamente o conteúdo da Aula 1. Pronto para o próximo desafio?'
              : correctCount >= questions.length / 2
              ? 'Você compreendeu bem os conceitos. Revise e aprofunde seu conhecimento.'
              : 'Revise o material da aula e teste seus conhecimentos novamente.'}
          </p>

          {correctCount < questions.length && (
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted({});
                setCurrentQuestionIndex(0);
              }}
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mb-4"
            >
              Tentar Novamente
            </button>
          )}
        </div>

        {/* Detailed Results */}
        <div className="space-y-4 mb-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Revisão das Respostas
          </h4>
          {questions.map((q, index) => {
            const isCorrect = savedAnswers[index];
            return (
              <div
                key={q.id}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">
                      {q.id}. {q.question}
                    </p>
                    <p
                      className={`text-sm ${
                        isCorrect
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-red-700 dark:text-red-400'
                      }`}
                    >
                      Sua resposta: <strong>{answers[q.id]}</strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <LinearButton
          label={nextStepLabel}
          onClick={handleFinish}
          icon="right"
          completed={true}
        />
      </section>
    );
  }

  // Modo de Resposta (Uma pergunta por vez)
  return (
    <section
      id="quiz-section"
      className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-500">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </p>
          <div className="w-32 h-2 bg-gray-200 dark:bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Pergunta Atual */}
      <QuizQuestionCard
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onSelectAnswer={(answer) =>
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
        }
        onSubmit={(answer) =>
          handleSubmit(currentQuestion.id, answer, currentQuestion.correctAnswer)
        }
        isSubmitted={submitted[currentQuestion.id]}
      />

      {/* Navegação */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0 || !submitted[currentQuestion.id]}
          className="flex-1 bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          ← Anterior
        </button>
        {submitted[currentQuestion.id] && currentQuestionIndex < questions.length - 1 && (
          <button
            onClick={handleNext}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Próxima →
          </button>
        )}
        {submitted[currentQuestion.id] && currentQuestionIndex === questions.length - 1 && (
          <button
            onClick={handleFinish}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Ver Resultado
          </button>
        )}
      </div>
    </section>
  );
};

interface QuizQuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
  onSubmit: (answer: string) => void;
  isSubmitted: boolean;
}

const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  isSubmitted,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-950 rounded-lg p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {question.question}
      </h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = selectedAnswer === option;
          const showFeedback = isSubmitted;

          let bgColor = 'bg-white dark:bg-neutral-900';
          let borderColor = 'border-gray-300 dark:border-neutral-700';
          let textColor = 'text-gray-900 dark:text-white';
          let hoverClass = 'hover:border-blue-400 dark:hover:border-blue-600';

          if (showFeedback) {
            if (isCorrect) {
              bgColor = 'bg-green-100 dark:bg-green-950/30';
              borderColor = 'border-green-500 dark:border-green-600';
              textColor = 'text-green-900 dark:text-green-300';
              hoverClass = '';
            } else if (isSelected && !isCorrect) {
              bgColor = 'bg-red-100 dark:bg-red-950/30';
              borderColor = 'border-red-500 dark:border-red-600';
              textColor = 'text-red-900 dark:text-red-300';
              hoverClass = '';
            }
          } else if (isSelected) {
            bgColor = 'bg-blue-100 dark:bg-blue-950/30';
            borderColor = 'border-blue-500 dark:border-blue-600';
            hoverClass = '';
          }

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && onSelectAnswer(option)}
              disabled={isSubmitted}
              className={`w-full flex items-center justify-between p-4 md:p-5 border-2 rounded-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${
                !isSubmitted ? `cursor-pointer ${hoverClass}` : 'cursor-default'
              }`}
            >
              <span className="text-left text-base md:text-lg font-medium">{option}</span>
              {showFeedback && isCorrect && (
                <Check className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              )}
              {showFeedback && isSelected && !isCorrect && (
                <X className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {!isSubmitted && selectedAnswer && (
        <button
          onClick={() => onSubmit(selectedAnswer)}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Confirmar Resposta
        </button>
      )}
    </div>
  );
};

export default QuizAprimorado;
