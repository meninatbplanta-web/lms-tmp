import { Lesson } from './types';

// Helper to check if a specific lesson is technically unlocked by date
// In a real app, we would check server time. Here we check client time against the date string.
export const isLessonAvailable = (lesson: Lesson): boolean => {
  if (lesson.id === 1) return true; // Lesson 1 always free
  const now = new Date();
  const release = new Date(lesson.releaseDate);
  return now >= release;
};

export const formatReleaseDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};