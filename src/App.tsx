import { Routes, Route } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CandidateSearch />} />
        <Route path="/saved-candidates" element={<SavedCandidates />} />
      </Routes>
    </div>
  );
};

export default App;
