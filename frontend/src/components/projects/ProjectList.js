import React from 'react';
import ProjectCard from './ProjectCard';
import '../../styles/ProjectList.css';

const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="no-projects">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
