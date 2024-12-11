import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
        <Link to="/" style={{ marginRight: '1rem', color: '#fff', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/saved-candidates" style={{ color: '#fff', textDecoration: 'none' }}>
          Saved Candidates
        </Link>
      </nav>
      <main>
        <Outlet /> {/* Renders the current route's component */}
      </main>
    </div>
  );
};

export default App;
