import React from 'react';
import '../../styles/WorkExperienceList.css';

const WorkExperienceList = ({ workExperience }) => {
  if (!workExperience || workExperience.length === 0) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="work-experience-list">
      <h3 className="section-title">💼 Work Experience</h3>
      <div className="work-items">
        {workExperience.map((work) => (
          <div key={work.id} className="work-item">
            <div className="work-header">
              <h4 className="job-title">{work.job_title}</h4>
              <span className="work-duration">
                {formatDate(work.start_date)} - {work.is_current ? 'Present' : formatDate(work.end_date)}
              </span>
            </div>
            <p className="company-name">{work.company_name}</p>
            {work.location && <p className="work-location">📍 {work.location}</p>}
            {work.description && <p className="work-description">{work.description}</p>}
            {work.achievements && work.achievements.length > 0 && (
              <ul className="work-achievements">
                {work.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceList;
