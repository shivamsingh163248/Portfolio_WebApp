import React from 'react';
import '../../styles/LinksList.css';

const LinksList = ({ links }) => {
  if (!links || links.length === 0) return null;

  const getIcon = (platform) => {
    const icons = {
      'LinkedIn': '💼',
      'GitHub': '🐙',
      'Email': '✉️',
      'Portfolio': '🌐',
      'Twitter': '🐦',
      'default': '🔗'
    };
    return icons[platform] || icons.default;
  };

  return (
    <div className="links-list">
      <h3 className="section-title">🔗 Links</h3>
      <div className="links-items">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item"
          >
            <span className="link-icon">{getIcon(link.platform)}</span>
            <span className="link-platform">{link.platform}</span>
            {link.display_name && (
              <span className="link-display-name">{link.display_name}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksList;
