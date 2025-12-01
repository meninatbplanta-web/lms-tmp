import React, { useState } from 'react';
import { BookOpen, Lightbulb, ChevronDown, Check, AlertTriangle } from 'lucide-react';

interface TheoryCard {
  id: string;
  type: string;
  title: string;
  text: string;
  buttonText: string;
  style?: string;
}

interface AlertCard {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  text: string;
  list: string[];
  buttonText: string;
}

interface MobileTheorySectionProps {
  theoryCards: TheoryCard[];
  alertCard: AlertCard | null;
  completedItems: string[];
  onComplete: (id: string) => void;
}

const MobileTheorySection: React.FC<MobileTheorySectionProps> = ({
  theoryCards,
  alertCard,
  completedItems,
  onComplete,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const allCompleted = theoryCards.every(card => completedItems.includes(card.id)) && 
    (alertCard ? completedItems.includes(alertCard.id) : true);

  return (
    <section className="py-4 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Base Teórica
        </h2>
        {allCompleted && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
            Concluído
          </span>
        )}
      </div>

      <div className="space-y-3">
        {theoryCards.map((card) => {
          const isCompleted = completedItems.includes(card.id);
          const isExpanded = expandedCard === card.id;
          const isHighlight = card.type === 'highlight_card';

          return (
            <div
              key={card.id}
              className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
                  : isHighlight
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'
              }`}
            >
              <button
                onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isHighlight ? (
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gray-600 dark:text-neutral-400" />
                    </div>
                  )}
                  <div className="text-left">
                    <h3 className={`text-sm font-bold ${
                      isHighlight ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                    }`}>
                      {card.title}
                    </h3>
                    {isCompleted && (
                      <span className="text-xs text-green-600 dark:text-green-400">Lido</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && <Check className="w-5 h-5 text-green-500" />}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 animate-fade-in">
                  <p className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {card.text}
                  </p>
                  {!isCompleted && (
                    <button
                      onClick={() => onComplete(card.id)}
                      className={`w-full py-3 px-4 font-semibold rounded-xl transition-all active:scale-[0.98] ${
                        isHighlight
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      }`}
                    >
                      {card.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {alertCard && (
          <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
            completedItems.includes(alertCard.id)
              ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
              : 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
          }`}>
            <button
              onClick={() => setExpandedCard(expandedCard === alertCard.id ? null : alertCard.id)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">
                    {alertCard.title}
                  </h3>
                  <span className="text-xs text-amber-700 dark:text-amber-400">
                    {alertCard.subtitle}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {completedItems.includes(alertCard.id) && <Check className="w-5 h-5 text-green-500" />}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedCard === alertCard.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedCard === alertCard.id && (
              <div className="px-4 pb-4 animate-fade-in">
                <p className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed mb-3">
                  {alertCard.text}
                </p>
                <ul className="space-y-2 mb-4">
                  {alertCard.list.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {!completedItems.includes(alertCard.id) && (
                  <button
                    onClick={() => onComplete(alertCard.id)}
                    className="w-full py-3 px-4 bg-amber-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98]"
                  >
                    {alertCard.buttonText}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MobileTheorySection;
