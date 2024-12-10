import { useEffect, useState } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await searchGithub(); // Fetch candidates from API
        setCandidates(data); // Update state with API response
      } catch (err) {
        setError('Failed to fetch candidates. Please try again.');
      }
    })();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#282c34', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', textAlign: 'center' }}>GitHub Users</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
      }}>
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              width: '200px',
            }}
          >
            <img
              src={candidate.avatar_url || 'https://via.placeholder.com/150'}
              alt={candidate.login}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <h3>{candidate.login}</h3>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateSearch;