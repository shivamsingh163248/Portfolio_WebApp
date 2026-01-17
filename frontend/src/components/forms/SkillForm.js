import React, { useState, useEffect } from 'react';

const SkillForm = ({ skill, categories, profileId, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    profile_id: profileId || 1,
    category_id: '',
    name: '',
    proficiency_level: 'intermediate',
    years_of_experience: ''
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        profile_id: skill.profile_id || profileId || 1,
        category_id: skill.category_id || '',
        name: skill.name || '',
        proficiency_level: skill.proficiency_level || 'intermediate',
        years_of_experience: skill.years_of_experience || ''
      });
    }
  }, [skill, profileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category_id' || name === 'profile_id' 
        ? (value === '' ? '' : parseInt(value)) 
        : name === 'years_of_experience'
        ? (value === '' ? '' : parseFloat(value))
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      category_id: formData.category_id || null,
      years_of_experience: formData.years_of_experience || null
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Skill Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Python, React, Machine Learning"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="proficiency_level">Proficiency Level</label>
          <select
            id="proficiency_level"
            name="proficiency_level"
            value={formData.proficiency_level}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="years_of_experience">Years of Experience</label>
        <input
          type="number"
          id="years_of_experience"
          name="years_of_experience"
          value={formData.years_of_experience}
          onChange={handleChange}
          min="0"
          max="50"
          step="0.5"
          placeholder="e.g., 2.5"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (skill ? 'Update Skill' : 'Add Skill')}
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
