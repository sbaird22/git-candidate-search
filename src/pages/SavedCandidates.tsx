import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#282c34', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ textAlign: 'center' }}>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No candidates saved yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {savedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                color: '#000',
                width: '200px',
              }}
            >
              <img
                src={candidate.avatar_url || 'https://via.placeholder.com/150'}
                alt={candidate.login}
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
              <h4>{candidate.login}</h4>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
      <nav style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" style={{ color: '#007BFF', textDecoration: 'none' }}>
          Back to Candidate Search
        </Link>
      </nav>
    </div>
  );
};

export default SavedCandidates;
