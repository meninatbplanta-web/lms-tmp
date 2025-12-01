import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VideoHero from '../components/aula1/VideoHero';
import ProgressHeader from '../components/aula1/ProgressHeader';
import IntroSection from '../components/aula1/IntroSection';
import MultimediaSection from '../components/aula1/MultimediaSection';
import AccordionSectionV2 from '../components/aula1/AccordionSectionV2';
import ExerciseSection from '../components/aula1/ExerciseSection';
import QuizAprimorado from '../components/aula1/QuizAprimorado';
import CompletionCard from '../components/aula1/CompletionCard';
import { useAula1Progress } from '../hooks/useAula1Progress';
import aula2Data from '../data/aula2-nova.json';

const Aula2Page: React.FC = () => {
  const navigate = useNavigate();
  const {
    progress,
    completeSection,
    saveExercise,
    saveQuizAnswer,
    isSectionCompleted,
  } = useAula1Progress();

  const { page_structure, lesson_content } = aula2Data;
  const { metadata, sections } = lesson_content;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extrair seções do JSON
  const introSection = sections.find((s) => s.type === 'intro');
  const multimediaSection = sections.find((s) => s.type === 'multimedia');
  const tabsSection = sections.find((s) => s.type === 'tabs');
  const exerciseSection = sections.find((s) => s.type === 'exercise');
  const quizSection = sections.find((s) => s.type === 'quiz');
  const completionSection = sections.find((s) => s.type === 'lesson_completion');

  // Handlers
  const handleCompleteIntro = () => {
    completeSection('intro');
  };

  const handleCompleteMultimediaItem = (itemId: string) => {
    completeSection(itemId);
  };

  const handleCompleteAccordionItem = (itemId: string) => {
    completeSection(itemId);
  };

  const handleCompleteExercise = (text: string) => {
    saveExercise(text);
    completeSection('ex_analise');
  };

  const handleCompleteQuizQuestion = (questionIndex: number, isCorrect: boolean) => {
    saveQuizAnswer(questionIndex, isCorrect);
    completeSection(`quiz_${questionIndex + 1}`);
  };

  // Determinar se o vídeo está desbloqueado
  const isVideoUnlocked = false;

  return (
    <div className="bg-gray-50 dark:bg-brand-darker text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Header />

      {/* Progress Header Sticky */}
      <ProgressHeader
        progressPercentage={progress.progressPercentage}
        currentBadge={progress.currentBadge}
        badges={metadata.gamification.badges}
      />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-4xl">
        {/* Banner */}
        <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-8 group">
          <img
            src={page_structure.banner.image_url}
            alt={page_structure.banner.alt_text}
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Header Info */}
        <div className="mb-6 md:mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
            <span className="text-xs md:text-sm font-bold text-blue-700 dark:text-blue-300 uppercase">
              {page_structure.header_info.badge.text}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            {metadata.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-400">
            {metadata.subtitle}
          </p>
        </div>

        {/* Video Hero */}
        <VideoHero
          isUnlocked={isVideoUnlocked}
          lockedMessage={page_structure.video_player.locked_message}
        />

        {/* Intro Section */}
        {introSection && (
          <IntroSection
            title={introSection.title}
            subtitle={introSection.subtitle}
            content={introSection.content}
            nextStepLabel={introSection.next_step.label}
            nextStepTarget={introSection.next_step.target_id}
            onComplete={handleCompleteIntro}
            isCompleted={isSectionCompleted('intro')}
          />
        )}

        {/* Multimedia Section */}
        {multimediaSection && (
          <MultimediaSection
            title={multimediaSection.title}
            items={multimediaSection.items}
            nextStepLabel={multimediaSection.next_step.label}
            nextStepTarget={multimediaSection.next_step.target_id}
            onCompleteItem={handleCompleteMultimediaItem}
            completedItems={progress.completedSections}
          />
        )}

        {/* Accordion Sections V2 (com FlipCards) */}
        {tabsSection && tabsSection.tabs && (
          <AccordionSectionV2
            tabs={tabsSection.tabs}
            onCompleteItem={handleCompleteAccordionItem}
            completedItems={progress.completedSections}
          />
        )}

        {/* Exercise Section */}
        {exerciseSection && (
          <ExerciseSection
            title={exerciseSection.title}
            content={exerciseSection.content}
            nextStepLabel={exerciseSection.next_step.label}
            nextStepTarget={exerciseSection.next_step.target_id}
            onComplete={handleCompleteExercise}
            savedText={progress.exerciseText}
            isCompleted={isSectionCompleted('ex_analise')}
          />
        )}

        {/* Quiz Aprimorado */}
        {quizSection && (
          <QuizAprimorado
            title={quizSection.title}
            questions={quizSection.questions}
            nextStepLabel={quizSection.next_step.label}
            nextStepTarget={quizSection.next_step.target_id}
            onCompleteQuestion={handleCompleteQuizQuestion}
            savedAnswers={progress.quizAnswers}
          />
        )}

        {/* Completion Card */}
        {completionSection && (
          <CompletionCard
            title={completionSection.title}
            message={completionSection.message}
            nextLessonInfo={completionSection.next_lesson_info}
            progressPercentage={progress.progressPercentage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 py-8 text-center">
        <p className="text-sm text-gray-500 dark:text-neutral-500">
          © 2025 Formação em Análise Corporal. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Aula2Page;
