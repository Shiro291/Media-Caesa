import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FirefighterStory from './pages/FirefighterStory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firefighter" element={<FirefighterStory />} />
      </Routes>
    </Router>
  );
}

export default App;
