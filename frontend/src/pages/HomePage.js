import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileAPI, healthAPI } from '../services/api';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import '../styles/HomePage.css';

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiHealth, setApiHealth] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check API health
      const healthResponse = await healthAPI.check();
      setApiHealth(healthResponse.data);

      // Fetch profile
      const profileResponse = await profileAPI.getById(1);
      setProfile(profileResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading portfolio..." />;
  if (error) return <Error message={error} onRetry={fetchData} />;

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            {profile?.first_name?.[0]}{profile?.last_name?.[0]}
          </div>
          <h1 className="hero-title">
            Hi, I'm {profile?.first_name} {profile?.last_name}
          </h1>
          <p className="hero-subtitle">
            M.Tech in Computer Science & Engineering
          </p>
          <p className="hero-description">
            {profile?.summary}
          </p>
          <div className="hero-actions">
            <Link to="/profile" className="btn btn-primary">
              View Profile
            </Link>
            <Link to="/projects" className="btn btn-secondary">
              See Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="quick-links">
        <h2 className="section-heading">Quick Links</h2>
        <div className="links-grid">
          <Link to="/profile" className="quick-link-card">
            <span className="quick-link-icon">👤</span>
            <h3>Profile</h3>
            <p>View my full profile, education, and experience</p>
          </Link>
          <Link to="/projects" className="quick-link-card">
            <span className="quick-link-icon">📁</span>
            <h3>Projects</h3>
            <p>Explore my projects and portfolio</p>
          </Link>
          <Link to="/skills" className="quick-link-card">
            <span className="quick-link-icon">🛠️</span>
            <h3>Skills</h3>
            <p>See my technical skills and expertise</p>
          </Link>
          <Link to="/search" className="quick-link-card">
            <span className="quick-link-icon">🔍</span>
            <h3>Search</h3>
            <p>Search through my portfolio</p>
          </Link>
        </div>
      </section>

      {apiHealth && (
        <section className="api-status">
          <div className="status-badge">
            <span className="status-dot green"></span>
            API Status: {apiHealth.status}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
