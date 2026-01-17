import React, { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';
import SkillList from '../components/skills/SkillList';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import '../styles/SkillsPage.css';

const SkillsPage = () => {
  const [skillsByCategory, setSkillsByCategory] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [categoryRes, topRes] = await Promise.all([
        skillsAPI.getByCategory(1),
        skillsAPI.getTop(10)
      ]);
      
      setSkillsByCategory(categoryRes.data);
      setTopSkills(topRes.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err.message || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading skills..." />;
  if (error) return <Error message={error} onRetry={fetchSkills} />;

  return (
    <div className="skills-page">
      <h1 className="page-title">🛠️ Skills</h1>
      
      {topSkills.length > 0 && (
        <section className="top-skills-section">
          <h2 className="section-subtitle">Top Skills (by project usage)</h2>
          <div className="top-skills">
            {topSkills.map((skill, index) => (
              <div key={index} className="top-skill-item">
                <span className="top-skill-name">{skill.name}</span>
                <span className="top-skill-count">{skill.project_count} project{skill.project_count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="all-skills-section">
        <h2 className="section-subtitle">Skills by Category</h2>
        <SkillList skillsByCategory={skillsByCategory} />
      </section>
    </div>
  );
};

export default SkillsPage;
