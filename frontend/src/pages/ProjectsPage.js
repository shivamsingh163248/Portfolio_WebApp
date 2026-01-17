import React, { useState, useEffect } from 'react';
import { projectsAPI, skillsAPI } from '../services/api';
import ProjectList from '../components/projects/ProjectList';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import '../styles/ProjectsPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [projectsRes, skillsRes] = await Promise.all([
        projectsAPI.getAll({ profile_id: 1 }),
        skillsAPI.getAll({ profile_id: 1 })
      ]);
      
      setProjects(projectsRes.data);
      setSkills(skillsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillFilter = async (skill) => {
    setSelectedSkill(skill);
    try {
      setLoading(true);
      if (skill) {
        const response = await projectsAPI.getBySkill(skill);
        setProjects(response.data);
      } else {
        const response = await projectsAPI.getAll({ profile_id: 1 });
        setProjects(response.data);
      }
    } catch (err) {
      console.error('Error filtering projects:', err);
      setError(err.message || 'Failed to filter projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading && projects.length === 0) return <Loading message="Loading projects..." />;
  if (error) return <Error message={error} onRetry={fetchInitialData} />;

  return (
    <div className="projects-page">
      <h1 className="page-title">📁 Projects</h1>
      
      <div className="filter-section">
        <label className="filter-label">Filter by Skill:</label>
        <select
          className="filter-select"
          value={selectedSkill}
          onChange={(e) => handleSkillFilter(e.target.value)}
        >
          <option value="">All Skills</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading message="Filtering projects..." />
      ) : (
        <>
          <p className="projects-count">
            Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
            {selectedSkill && ` for "${selectedSkill}"`}
          </p>
          <ProjectList projects={projects} />
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
