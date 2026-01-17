import React from 'react';
import '../../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="project-card">
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        {project.skills && project.skills.length > 0 && (
          <div className="project-skills">
            {project.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}
        
        <div className="project-links">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link github"
            >
              🐙 GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link live"
            >
              🌐 Live Demo
            </a>
          )}
        </div>
      </div>
      
      {project.is_featured && (
        <span className="featured-badge">⭐ Featured</span>
      )}
    </div>
  );
};

export default ProjectCard;
