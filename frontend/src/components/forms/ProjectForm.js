import React, { useState, useEffect } from 'react';

const ProjectForm = ({ project, skills, profileId, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    profile_id: profileId || 1,
    title: '',
    description: '',
    detailed_description: '',
    github_url: '',
    live_url: '',
    image_url: '',
    start_date: '',
    end_date: '',
    is_featured: false,
    skill_ids: []
  });

  useEffect(() => {
    if (project) {
      setFormData({
        profile_id: project.profile_id || profileId || 1,
        title: project.title || '',
        description: project.description || '',
        detailed_description: project.detailed_description || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        image_url: project.image_url || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        is_featured: project.is_featured || false,
        skill_ids: project.skill_ids || []
      });
    }
  }, [project, profileId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillToggle = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skill_ids: prev.skill_ids.includes(skillId)
        ? prev.skill_ids.filter(id => id !== skillId)
        : [...prev.skill_ids, skillId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter project title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Short Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the project..."
          rows="2"
        />
      </div>

      <div className="form-group">
        <label htmlFor="detailed_description">Detailed Description</label>
        <textarea
          id="detailed_description"
          name="detailed_description"
          value={formData.detailed_description}
          onChange={handleChange}
          placeholder="Detailed description with features, challenges, etc..."
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="github_url">GitHub URL</label>
          <input
            type="url"
            id="github_url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="live_url">Live Demo URL</label>
          <input
            type="url"
            id="live_url"
            name="live_url"
            value={formData.live_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image_url">Project Image URL</label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://example.com/image.png"
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
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
          />
          Featured Project
        </label>
      </div>

      <div className="form-group">
        <label>Technologies Used</label>
        <div className="skills-checkbox-grid">
          {skills?.map(skill => (
            <label key={skill.id} className="skill-checkbox">
              <input
                type="checkbox"
                checked={formData.skill_ids.includes(skill.id)}
                onChange={() => handleSkillToggle(skill.id)}
              />
              {skill.name}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (project ? 'Update Project' : 'Add Project')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
