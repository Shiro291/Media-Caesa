import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MediaLibrary from './pages/MediaLibrary';
import FirefighterStory from './features/firefighter-story';
import MathStory from './features/math-story';
import FirefighterQuiz from './features/firefighter-quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<MediaLibrary />} />
        <Route path="/firefighter" element={<FirefighterStory />} />
        <Route path="/math-story" element={<MathStory />} />
        <Route path="/quiz" element={<FirefighterQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
