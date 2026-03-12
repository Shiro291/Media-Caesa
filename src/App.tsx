import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MediaLibrary from './pages/MediaLibrary';

// Eagerly load the critical paths (Home and MediaLibrary)
// Lazy load the heavy story and quiz components to reduce the initial bundle size
const FirefighterStory = React.lazy(() => import('./features/firefighter-story'));
const MathStory = React.lazy(() => import('./features/math-story'));
const FirefighterQuiz = React.lazy(() => import('./features/firefighter-quiz'));
const SimpleQuiz = React.lazy(() => import('./features/simple-quiz'));
const LiteracyQuiz = React.lazy(() => import('./features/literacy-quiz'));
const Statistics = React.lazy(() => import('./features/statistics'));
const BilanganCacah = React.lazy(() => import('./features/bilangan-cacah'));
const BilanganCacahQuiz = React.lazy(() => import('./features/bilangan-cacah-quiz'));
const AdditionSubtraction = React.lazy(() => import('./features/addition-subtraction'));

// Simple loading fallback
const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-brand-blue"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<MediaLibrary />} />
          <Route path="/firefighter" element={<FirefighterStory />} />
          <Route path="/math-story" element={<MathStory />} />
          <Route path="/quiz" element={<FirefighterQuiz />} />
          <Route path="/simple-quiz" element={<SimpleQuiz />} />
          <Route path="/literacy-quiz" element={<LiteracyQuiz />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/bilangan-cacah" element={<BilanganCacah />} />
          <Route path="/bilangan-cacah-quiz" element={<BilanganCacahQuiz />} />
          <Route path="/addition-subtraction" element={<AdditionSubtraction />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


