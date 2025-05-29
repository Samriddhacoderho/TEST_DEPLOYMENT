import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#222',
        padding: '1rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.5rem' }}>
        🛒 Product App
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link
          to="/"
          style={{
            color: location.pathname === '/' ? '#61dafb' : '#fff',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem',
          }}
        >
          Home
        </Link>
        {!token && (
          <>
            <Link
              to="/register"
              style={{
                color: location.pathname === '/register' ? '#61dafb' : '#fff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.1rem',
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{
                color: location.pathname === '/login' ? '#61dafb' : '#fff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.1rem',
              }}
            >
              Login
            </Link>
          </>
        )}
        {token && (
          <button
            onClick={handleLogout}
            style={{
              background: '#61dafb',
              color: '#222',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'background 0.2s',
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;