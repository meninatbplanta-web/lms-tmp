import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import TraitCard from './TraitCard';
import LinearButton from './LinearButton';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface AccordionTab {
  id: string;
  label: string;
  content: any[];
  next_step?: {
    label: string;
    target_id: string;
  };
}

interface AccordionSectionProps {
  tabs: AccordionTab[];
  onCompleteItem: (itemId: string) => void;
  completedItems: string[];
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  tabs,
  onCompleteItem,
  completedItems,
}) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(tabs[0]?.id);

  const handleNext = (targetId: string) => {
    // Encontrar o próximo tab
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
      // Pequeno delay para permitir a animação do accordion
      setTimeout(() => {
        smoothScrollTo(tabs[currentIndex + 1].id);
      }, 100);
    } else {
      // Último tab, scroll para próxima seção
      smoothScrollTo(targetId);
    }
  };

  return (
    <section className="mb-6 md:mb-8">
      <Accordion.Root
        type="single"
        collapsible
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        {tabs.map((tab) => (
          <Accordion.Item
            key={tab.id}
            value={tab.id}
            id={tab.id}
            className="bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-900 rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-colors duration-300"
          >
            <Accordion.Header>
              <Accordion.Trigger className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors duration-300 group">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white">
                  {tab.label}
                </h2>
                <ChevronDown className="w-6 h-6 text-gray-500 dark:text-neutral-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
              <div className="p-6 md:p-8 pt-0 space-y-6">
                {tab.content.map((item) => (
                  <AccordionContentItem
                    key={item.id}
                    item={item}
                    isCompleted={completedItems.includes(item.id)}
                    onComplete={() => onCompleteItem(item.id)}
                  />
                ))}

                {tab.next_step && (
                  <div className="mt-6">
                    <LinearButton
                      label={tab.next_step.label}
                      onClick={() => handleNext(tab.next_step!.target_id)}
                      icon="right"
                    />
                  </div>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
};

interface AccordionContentItemProps {
  item: any;
  isCompleted: boolean;
  onComplete: () => void;
}

const AccordionContentItem: React.FC<AccordionContentItemProps> = ({
  item,
  isCompleted,
  onComplete,
}) => {
  // Card simples
  if (item.type === 'card') {
    return (
      <div className="bg-gray-50 dark:bg-neutral-950 rounded-lg p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {item.title}
        </h3>
        <p className="text-base md:text-lg text-gray-700 dark:text-neutral-300 leading-relaxed mb-4">
          {item.text}
        </p>
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            {item.buttonText}
          </button>
        )}
      </div>
    );
  }

  // Card destacado
  if (item.type === 'highlight_card') {
    return (
      <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-blue-900 dark:text-blue-300 mb-3">
          {item.title}
        </h3>
        <p className="text-base md:text-lg text-gray-800 dark:text-neutral-200 leading-relaxed mb-4">
          {item.text}
        </p>
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            {item.buttonText}
          </button>
        )}
      </div>
    );
  }

  // Card de perfil (trait)
  if (item.type === 'trait_card') {
    return (
      <TraitCard
        id={item.id}
        name={item.name}
        archetype={item.archetype}
        icon={item.icon}
        color={item.color}
        body={item.body}
        pain={item.pain}
        power={item.power}
        buttonText={item.buttonText}
        isCompleted={isCompleted}
        onComplete={onComplete}
      />
    );
  }

  // Card de alerta
  if (item.type === 'alert_card') {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-5 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-amber-900 dark:text-amber-300 mb-2">
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-amber-800 dark:text-amber-400 font-semibold mb-3">
          {item.subtitle}
        </p>
        <p className="text-base md:text-lg text-gray-800 dark:text-neutral-200 leading-relaxed mb-4">
          {item.text}
        </p>
        {item.list && (
          <ul className="space-y-2 mb-4">
            {item.list.map((listItem: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-neutral-300"
              >
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span>{listItem}</span>
              </li>
            ))}
          </ul>
        )}
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="bg-amber-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
          >
            {item.buttonText}
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default AccordionSection;
