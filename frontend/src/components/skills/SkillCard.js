import React from 'react';
import '../../styles/SkillCard.css';

const SkillCard = ({ category, skills }) => {
  const getProficiencyClass = (level) => {
    const classes = {
      'basic': 'proficiency-basic',
      'intermediate': 'proficiency-intermediate',
      'advanced': 'proficiency-advanced',
      'expert': 'proficiency-expert'
    };
    return classes[level] || classes.intermediate;
  };

  return (
    <div className="skill-card">
      <h4 className="skill-category">{category}</h4>
      <div className="skill-items">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-item">
            <span className="skill-name">{skill.name}</span>
            <span className={`skill-proficiency ${getProficiencyClass(skill.proficiency_level)}`}>
              {skill.proficiency_level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
