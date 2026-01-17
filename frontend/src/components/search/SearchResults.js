import React from 'react';
import '../../styles/SearchResults.css';

const SearchResults = ({ results }) => {
  if (!results) return null;

  return (
    <div className="search-results">
      <div className="results-summary">
        <p>Found <strong>{results.total_results}</strong> results for "{results.query}"</p>
      </div>

      {results.profiles && results.profiles.length > 0 && (
        <div className="results-section">
          <h3>👤 Profiles</h3>
          <div className="results-items">
            {results.profiles.map((profile) => (
              <div key={profile.id} className="result-item">
                <span className="result-name">{profile.name}</span>
                <span className="result-detail">{profile.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.skills && results.skills.length > 0 && (
        <div className="results-section">
          <h3>🛠️ Skills</h3>
          <div className="results-items">
            {results.skills.map((skill) => (
              <div key={skill.id} className="result-item">
                <span className="result-name">{skill.name}</span>
                <span className="result-detail">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.projects && results.projects.length > 0 && (
        <div className="results-section">
          <h3>📁 Projects</h3>
          <div className="results-items">
            {results.projects.map((project) => (
              <div key={project.id} className="result-item">
                <span className="result-name">{project.title}</span>
                <span className="result-detail">{project.description}</span>
                {project.skills && (
                  <div className="result-skills">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag-small">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {results.education && results.education.length > 0 && (
        <div className="results-section">
          <h3>🎓 Education</h3>
          <div className="results-items">
            {results.education.map((edu) => (
              <div key={edu.id} className="result-item">
                <span className="result-name">{edu.institution}</span>
                <span className="result-detail">{edu.degree} {edu.field && `in ${edu.field}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.work_experience && results.work_experience.length > 0 && (
        <div className="results-section">
          <h3>💼 Work Experience</h3>
          <div className="results-items">
            {results.work_experience.map((work) => (
              <div key={work.id} className="result-item">
                <span className="result-name">{work.job_title}</span>
                <span className="result-detail">{work.company}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.total_results === 0 && (
        <div className="no-results">
          <p>No results found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
