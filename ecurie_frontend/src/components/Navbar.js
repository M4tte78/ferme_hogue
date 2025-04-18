import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>Ferme de la petite hogue</div>
      <div className="navbar-links">
        {user ? (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={handleLogout} className="logout">Se déconnecter</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Connexion</button>
            <button onClick={() => navigate('/register')}>Inscription</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
