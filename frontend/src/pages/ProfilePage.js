import React, { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';
import ProfileCard from '../components/profile/ProfileCard';
import EducationList from '../components/profile/EducationList';
import WorkExperienceList from '../components/profile/WorkExperienceList';
import LinksList from '../components/profile/LinksList';
import CertificationsList from '../components/profile/CertificationsList';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await profileAPI.getById(1);
      setProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading profile..." />;
  if (error) return <Error message={error} onRetry={fetchProfile} />;

  return (
    <div className="profile-page">
      <h1 className="page-title">👤 Profile</h1>
      
      <ProfileCard profile={profile} />
      
      <div className="profile-sections">
        <EducationList education={profile?.education} />
        <WorkExperienceList workExperience={profile?.work_experience} />
        <CertificationsList certifications={profile?.certifications} />
        <LinksList links={profile?.links} />
      </div>
    </div>
  );
};

export default ProfilePage;
