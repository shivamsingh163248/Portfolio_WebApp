import React from 'react';
import '../../styles/EducationList.css';

const EducationList = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <div className="education-list">
      <h3 className="section-title">🎓 Education</h3>
      <div className="education-items">
        {education.map((edu) => (
          <div key={edu.id} className="education-item">
            <div className="education-header">
              <h4 className="institution-name">{edu.institution_name}</h4>
              <span className="education-years">
                {edu.start_year} - {edu.is_current ? 'Present' : edu.end_year}
              </span>
            </div>
            {edu.degree && (
              <p className="education-degree">
                {edu.degree}
                {edu.field_of_study && ` in ${edu.field_of_study}`}
              </p>
            )}
            {edu.location && (
              <p className="education-location">📍 {edu.location}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationList;
