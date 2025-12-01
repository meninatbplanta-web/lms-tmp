# Minicurso Terapeuta Analista Corporal

## Overview
A mobile-first educational platform for a body analysis therapy course. The application provides an interactive learning experience with video/audio content, quizzes, progress tracking, and gamification elements.

## Recent Changes
- **2025-11-30**: Complete mobile-first redesign of Aula 1 page with improved UX
  - Added bottom navigation bar with 4 main sections
  - Created swipeable profile carousel for 5 character types
  - Implemented touch-friendly media players
  - Added expandable theory cards
  - Created interactive quiz with visual feedback
  - Added progress ring indicator with badges

## Project Architecture

### Technology Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Routing**: React Router DOM (HashRouter)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

### Directory Structure
```
/
├── pages/                    # Page components
│   ├── Aula1MobilePage.tsx  # New mobile-first lesson page
│   ├── Aula2Page.tsx
│   ├── Home.tsx
│   └── LessonPlayer.tsx
├── components/
│   ├── mobile/              # Mobile-optimized components
│   │   ├── MobileBottomNav.tsx
│   │   ├── MobileCompletionSection.tsx
│   │   ├── MobileExerciseSection.tsx
│   │   ├── MobileHeader.tsx
│   │   ├── MobileHeroSection.tsx
│   │   ├── MobileMediaPlayer.tsx
│   │   ├── MobileProfileCarousel.tsx
│   │   ├── MobileProgressRing.tsx
│   │   ├── MobileQuizSection.tsx
│   │   └── MobileTheorySection.tsx
│   ├── aula1/               # Original lesson components
│   └── ui/                  # Shared UI components
├── data/                    # JSON course content
│   ├── aula1-nova.json     # Lesson 1 content
│   └── lessons.ts          # Course metadata
├── hooks/
│   └── useAula1Progress.ts # Progress tracking hook
├── contexts/
│   └── ThemeContext.tsx    # Dark/light mode
└── src/
    └── highlight.css       # Custom animations
```

### Key Features
1. **Progress Tracking**: localStorage-based progress with badges (Estudante, Analista Jr., Analista Elite)
2. **Gamification**: Points per section, progress percentage, badge unlocks
3. **Mobile-First Design**: Bottom navigation, touch gestures, swipeable carousels
4. **Theme Support**: Light/dark mode with smooth transitions
5. **Interactive Quiz**: Immediate feedback with animations

### Data Flow
- Course content stored in JSON files (`data/aula1-nova.json`)
- User progress stored in localStorage via `useAula1Progress` hook
- Progress persists across sessions

## User Preferences
- Mobile-first design prioritized
- Dark mode as default theme
- Portuguese (Brazilian) language

## Environment Variables
- `GEMINI_API_KEY`: Optional, for AI features (not currently used in core flow)

## Development
- Run: `npm run dev`
- Build: `npm run build`
- Server runs on port 5000
