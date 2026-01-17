import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">👨‍💻</span>
          <span className="logo-text">Portfolio</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/profile" className={isActive('/profile')}>
            Profile
          </Link>
          <Link to="/projects" className={isActive('/projects')}>
            Projects
          </Link>
          <Link to="/skills" className={isActive('/skills')}>
            Skills
          </Link>
          <Link to="/search" className={isActive('/search')}>
            Search
          </Link>
          <Link to="/admin" className={isActive('/admin')}>
            ⚙️ Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
