import React, { useState, useEffect } from 'react';

const CertificationForm = ({ certification, profileId, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    profile_id: profileId || 1,
    title: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
    description: ''
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        profile_id: certification.profile_id || profileId || 1,
        title: certification.title || certification.name || '',
        issuing_organization: certification.issuing_organization || '',
        issue_date: certification.issue_date || '',
        expiry_date: certification.expiry_date || '',
        credential_id: certification.credential_id || '',
        credential_url: certification.credential_url || '',
        description: certification.description || ''
      });
    }
  }, [certification, profileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      issue_date: formData.issue_date || null,
      expiry_date: formData.expiry_date || null
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Certification Name *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., AWS Solutions Architect"
        />
      </div>

      <div className="form-group">
        <label htmlFor="issuing_organization">Issuing Organization</label>
        <input
          type="text"
          id="issuing_organization"
          name="issuing_organization"
          value={formData.issuing_organization}
          onChange={handleChange}
          placeholder="e.g., Amazon Web Services"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="issue_date">Issue Date</label>
          <input
            type="date"
            id="issue_date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry_date">Expiry Date</label>
          <input
            type="date"
            id="expiry_date"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="credential_id">Credential ID</label>
        <input
          type="text"
          id="credential_id"
          name="credential_id"
          value={formData.credential_id}
          onChange={handleChange}
          placeholder="e.g., ABC123XYZ"
        />
      </div>

      <div className="form-group">
        <label htmlFor="credential_url">Credential URL</label>
        <input
          type="url"
          id="credential_url"
          name="credential_url"
          value={formData.credential_url}
          onChange={handleChange}
          placeholder="https://www.credly.com/..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description of the certification..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (certification ? 'Update Certification' : 'Add Certification')}
        </button>
      </div>
    </form>
  );
};

export default CertificationForm;
