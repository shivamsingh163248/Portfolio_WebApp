import React, { useState, useEffect } from 'react';

const EducationForm = ({ education, profileId, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    profile_id: profileId || 1,
    institution_name: '',
    degree: '',
    field_of_study: '',
    location: '',
    start_year: '',
    end_year: '',
    grade: '',
    description: '',
    is_current: false
  });

  useEffect(() => {
    if (education) {
      setFormData({
        profile_id: education.profile_id || profileId || 1,
        institution_name: education.institution_name || '',
        degree: education.degree || '',
        field_of_study: education.field_of_study || '',
        location: education.location || '',
        start_year: education.start_year || '',
        end_year: education.end_year || '',
        grade: education.grade || '',
        description: education.description || '',
        is_current: education.is_current || false
      });
    }
  }, [education, profileId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
        : (name === 'start_year' || name === 'end_year')
        ? (value === '' ? '' : parseInt(value))
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      start_year: formData.start_year || null,
      end_year: formData.is_current ? null : (formData.end_year || null)
    };
    onSubmit(submitData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="institution_name">Institution Name *</label>
        <input
          type="text"
          id="institution_name"
          name="institution_name"
          value={formData.institution_name}
          onChange={handleChange}
          required
          placeholder="e.g., Harvard University"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="e.g., Bachelor of Science"
          />
        </div>
        <div className="form-group">
          <label htmlFor="field_of_study">Field of Study</label>
          <input
            type="text"
            id="field_of_study"
            name="field_of_study"
            value={formData.field_of_study}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
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
          placeholder="e.g., Cambridge, MA, USA"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="start_year">Start Year</label>
          <select
            id="start_year"
            name="start_year"
            value={formData.start_year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="end_year">End Year</label>
          <select
            id="end_year"
            name="end_year"
            value={formData.end_year}
            onChange={handleChange}
            disabled={formData.is_current}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
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
          Currently Studying Here
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="grade">Grade/GPA</label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="e.g., 3.8/4.0 or 8.5 CGPA"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Relevant coursework, achievements, etc..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (education ? 'Update Education' : 'Add Education')}
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
