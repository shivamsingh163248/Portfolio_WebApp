import React from 'react';
import SkillCard from './SkillCard';
import '../../styles/SkillList.css';

const SkillList = ({ skillsByCategory }) => {
  if (!skillsByCategory || skillsByCategory.length === 0) {
    return (
      <div className="no-skills">
        <p>No skills found.</p>
      </div>
    );
  }

  return (
    <div className="skill-list">
      {skillsByCategory.map((group) => (
        <SkillCard
          key={group.category_id}
          category={group.category}
          skills={group.skills}
        />
      ))}
    </div>
  );
};

export default SkillList;
