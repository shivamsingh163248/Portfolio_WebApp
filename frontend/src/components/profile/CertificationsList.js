import React from 'react';
import '../../styles/CertificationsList.css';

const CertificationsList = ({ certifications }) => {
  if (!certifications || certifications.length === 0) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="certifications-list">
      <h3 className="section-title">🏆 Certifications</h3>
      <div className="certifications-items">
        {certifications.map((cert) => (
          <div key={cert.id} className="certification-item">
            <div className="certification-header">
              <h4 className="certification-title">{cert.title}</h4>
              {cert.issue_date && (
                <span className="certification-date">{formatDate(cert.issue_date)}</span>
              )}
            </div>
            {cert.issuing_organization && (
              <p className="certification-org">{cert.issuing_organization}</p>
            )}
            {cert.description && (
              <p className="certification-description">{cert.description}</p>
            )}
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-link"
              >
                View Certificate →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsList;
