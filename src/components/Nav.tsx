import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f4f4f4" }}>
      {/* Navigation Links */}
      <Link to="/" style={{ textDecoration: "none", color: "#007BFF" }}>Candidate Search</Link>
      <Link to="/saved" style={{ textDecoration: "none", color: "#007BFF" }}>Saved Candidates</Link>
    </nav>
  );
};

export default Nav;
