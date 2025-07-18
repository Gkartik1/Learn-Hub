// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page">
      <h2>🚫 404</h2>
      <p>Oops! Page not found.</p>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default NotFound;