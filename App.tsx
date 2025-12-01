import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LessonPlayer from './pages/LessonPlayer';
import Aula1MobilePage from './pages/Aula1MobilePage';
import Aula2Page from './pages/Aula2Page';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aula/1" element={<Aula1MobilePage />} />
        <Route path="/aula/2" element={<Aula2Page />} />
        <Route path="/aula/:lessonId" element={<LessonPlayer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;