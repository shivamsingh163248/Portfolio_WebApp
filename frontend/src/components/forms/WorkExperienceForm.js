import React, { useState, useEffect } from 'react';

const WorkExperienceForm = ({ experience, profileId, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    profile_id: profileId || 1,
    company_name: '',
    job_title: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    achievements: ''
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        profile_id: experience.profile_id || profileId || 1,
        company_name: experience.company_name || '',
        job_title: experience.job_title || '',
        location: experience.location || '',
        start_date: experience.start_date || '',
        end_date: experience.end_date || '',
        is_current: experience.is_current || false,
        description: experience.description || '',
        achievements: Array.isArray(experience.achievements) 
          ? experience.achievements.join('\n') 
          : (experience.achievements || '')
      });
    }
  }, [experience, profileId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const achievementsArray = formData.achievements
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);
    
    const submitData = {
      ...formData,
      achievements: achievementsArray.length > 0 ? achievementsArray : null,
      end_date: formData.is_current ? null : (formData.end_date || null),
      start_date: formData.start_date || null
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company_name">Company Name *</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            placeholder="e.g., Google Inc."
          />
        </div>
        <div className="form-group">
          <label htmlFor="job_title">Job Title *</label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            required
            placeholder="e.g., Software Engineer"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., San Francisco, CA"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            disabled={formData.is_current}
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="is_current"
            checked={formData.is_current}
            onChange={handleChange}
          />
          Currently Working Here
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your role and responsibilities..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="achievements">Key Achievements (one per line)</label>
        <textarea
          id="achievements"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="Led team of 5 developers&#10;Increased performance by 40%&#10;Implemented new CI/CD pipeline"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (experience ? 'Update Experience' : 'Add Experience')}
        </button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
