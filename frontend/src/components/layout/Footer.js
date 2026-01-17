import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Anuj Singh. All rights reserved.
          </p>
          <div className="footer-links">
            <a 
              href="https://linkedin.com/in/anujsingh122002" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/anujsingh122002" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a 
              href="mailto:242211004@nitdelhi.ac.in"
              className="footer-link"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
