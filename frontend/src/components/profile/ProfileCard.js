import React from 'react';
import '../../styles/ProfileCard.css';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <span className="avatar-text">
          {profile.first_name?.[0]}{profile.last_name?.[0]}
        </span>
      </div>
      <div className="profile-info">
        <h2 className="profile-name">
          {profile.first_name} {profile.last_name}
        </h2>
        <p className="profile-location">📍 {profile.location}</p>
        <p className="profile-email">✉️ {profile.email}</p>
        {profile.phone && <p className="profile-phone">📞 {profile.phone}</p>}
        {profile.summary && (
          <p className="profile-summary">{profile.summary}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
