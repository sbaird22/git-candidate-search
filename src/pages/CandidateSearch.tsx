import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const fetchCandidate = async () => {
    try {
      const data = await searchGithub();
      const availableCandidates = data.filter(
        (candidate: Candidate) => !savedCandidates.some((saved) => saved.id === candidate.id)
      );
      if (availableCandidates.length === 0) {
        setError('No more candidates to review!');
        setCurrentCandidate(null);
      } else {
        const randomCandidate =
          availableCandidates[Math.floor(Math.random() * availableCandidates.length)];
        setCurrentCandidate(randomCandidate);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch candidates. Please try again.');
    }
  };

  const handleAddCandidate = () => {
    if (currentCandidate) {
      const updatedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      fetchCandidate();
    }
  };

  const handleSkipCandidate = () => {
    fetchCandidate();
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#282c34', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ textAlign: 'center' }}>GitHub Candidate Search</h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {currentCandidate && (
        <div
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '1rem auto',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            color: '#000',
            width: '300px',
          }}
        >
          <img
            src={currentCandidate.avatar_url || 'https://via.placeholder.com/150'}
            alt={currentCandidate.login}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <h3>{currentCandidate.login}</h3>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={handleAddCandidate}
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Add
            </button>
            <button
              onClick={handleSkipCandidate}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Skip
            </button>
          </div>
        </div>
      )}

      <nav style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/saved-candidates" style={{ color: '#007BFF', textDecoration: 'none' }}>
          View Saved Candidates
        </Link>
      </nav>
    </div>
  );
};

export default CandidateSearch;
