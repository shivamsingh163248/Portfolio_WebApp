import React, { useState, useEffect } from 'react';

const LinkForm = ({ link, profileId, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    profile_id: profileId || 1,
    platform: '',
    url: '',
    display_name: ''
  });

  useEffect(() => {
    if (link) {
      setFormData({
        profile_id: link.profile_id || profileId || 1,
        platform: link.platform || '',
        url: link.url || '',
        display_name: link.display_name || ''
      });
    }
  }, [link, profileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const platforms = [
    'GitHub',
    'LinkedIn',
    'Twitter',
    'Portfolio',
    'Blog',
    'YouTube',
    'Instagram',
    'Facebook',
    'Medium',
    'Dev.to',
    'Kaggle',
    'LeetCode',
    'HackerRank',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="platform">Platform *</label>
        <select
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          required
        >
          <option value="">Select Platform</option>
          {platforms.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="url">URL *</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="display_name">Display Name</label>
        <input
          type="text"
          id="display_name"
          name="display_name"
          value={formData.display_name}
          onChange={handleChange}
          placeholder="e.g., @username or My Portfolio"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (link ? 'Update Link' : 'Add Link')}
        </button>
      </div>
    </form>
  );
};

export default LinkForm;
