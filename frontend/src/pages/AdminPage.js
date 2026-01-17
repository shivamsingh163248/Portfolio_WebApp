import React, { useState, useEffect, useCallback } from 'react';
import { 
  profileAPI, 
  skillsAPI, 
  projectsAPI, 
  educationAPI, 
  workExperienceAPI, 
  linksAPI, 
  certificationsAPI 
} from '../services/api';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import ProfileForm from '../components/forms/ProfileForm';
import SkillForm from '../components/forms/SkillForm';
import ProjectForm from '../components/forms/ProjectForm';
import EducationForm from '../components/forms/EducationForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import CertificationForm from '../components/forms/CertificationForm';
import LinkForm from '../components/forms/LinkForm';
import Loading from '../components/common/Loading';
import '../styles/AdminPage.css';

const AdminPage = () => {
  // Data state
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // UI state
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editItem, setEditItem] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const profileId = 1; // Default profile ID

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        profileRes,
        skillsRes,
        projectsRes,
        educationRes,
        workExpRes,
        certsRes,
        linksRes,
        categoriesRes
      ] = await Promise.all([
        profileAPI.getById(profileId).catch(() => null),
        skillsAPI.getAll({ profile_id: profileId }),
        projectsAPI.getAll({ profile_id: profileId }),
        educationAPI.getAll({ profile_id: profileId }),
        workExperienceAPI.getAll({ profile_id: profileId }),
        certificationsAPI.getAll({ profile_id: profileId }),
        linksAPI.getAll({ profile_id: profileId }),
        skillsAPI.getCategories()
      ]);

      setProfile(profileRes?.data || null);
      setSkills(skillsRes.data || []);
      setProjects(projectsRes.data || []);
      setEducation(educationRes.data || []);
      setWorkExperience(workExpRes.data || []);
      setCertifications(certsRes.data || []);
      setLinks(linksRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Open modal for create/edit
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setEditItem(null);
  };

  // Handle form submissions
  const handleSubmit = async (type, data) => {
    setIsSubmitting(true);
    try {
      let response;
      const isEdit = editItem !== null;

      switch (type) {
        case 'profile':
          response = isEdit
            ? await profileAPI.update(editItem.id, data)
            : await profileAPI.create(data);
          setProfile(response.data);
          break;
        case 'skill':
          response = isEdit
            ? await skillsAPI.update(editItem.id, data)
            : await skillsAPI.create(data);
          setSkills(prev => isEdit
            ? prev.map(s => s.id === editItem.id ? response.data : s)
            : [...prev, response.data]
          );
          break;
        case 'project':
          response = isEdit
            ? await projectsAPI.update(editItem.id, data)
            : await projectsAPI.create(data);
          setProjects(prev => isEdit
            ? prev.map(p => p.id === editItem.id ? response.data : p)
            : [...prev, response.data]
          );
          break;
        case 'education':
          response = isEdit
            ? await educationAPI.update(editItem.id, data)
            : await educationAPI.create(data);
          setEducation(prev => isEdit
            ? prev.map(e => e.id === editItem.id ? response.data : e)
            : [...prev, response.data]
          );
          break;
        case 'experience':
          response = isEdit
            ? await workExperienceAPI.update(editItem.id, data)
            : await workExperienceAPI.create(data);
          setWorkExperience(prev => isEdit
            ? prev.map(w => w.id === editItem.id ? response.data : w)
            : [...prev, response.data]
          );
          break;
        case 'certification':
          response = isEdit
            ? await certificationsAPI.update(editItem.id, data)
            : await certificationsAPI.create(data);
          setCertifications(prev => isEdit
            ? prev.map(c => c.id === editItem.id ? response.data : c)
            : [...prev, response.data]
          );
          break;
        case 'link':
          response = isEdit
            ? await linksAPI.update(editItem.id, data)
            : await linksAPI.create(data);
          setLinks(prev => isEdit
            ? prev.map(l => l.id === editItem.id ? response.data : l)
            : [...prev, response.data]
          );
          break;
        default:
          break;
      }

      showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} ${isEdit ? 'updated' : 'created'} successfully!`);
      closeModal();
    } catch (error) {
      console.error('Error submitting:', error);
      showToast(error.response?.data?.detail || 'Operation failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      switch (type) {
        case 'skill':
          await skillsAPI.delete(id);
          setSkills(prev => prev.filter(s => s.id !== id));
          break;
        case 'project':
          await projectsAPI.delete(id);
          setProjects(prev => prev.filter(p => p.id !== id));
          break;
        case 'education':
          await educationAPI.delete(id);
          setEducation(prev => prev.filter(e => e.id !== id));
          break;
        case 'experience':
          await workExperienceAPI.delete(id);
          setWorkExperience(prev => prev.filter(w => w.id !== id));
          break;
        case 'certification':
          await certificationsAPI.delete(id);
          setCertifications(prev => prev.filter(c => c.id !== id));
          break;
        case 'link':
          await linksAPI.delete(id);
          setLinks(prev => prev.filter(l => l.id !== id));
          break;
        default:
          break;
      }
      showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
    } catch (error) {
      console.error('Error deleting:', error);
      showToast('Delete failed', 'error');
    }
  };

  // Get modal title
  const getModalTitle = () => {
    const action = editItem ? 'Edit' : 'Add';
    const titles = {
      profile: `${action} Profile`,
      skill: `${action} Skill`,
      project: `${action} Project`,
      education: `${action} Education`,
      experience: `${action} Work Experience`,
      certification: `${action} Certification`,
      link: `${action} Link`
    };
    return titles[modalType] || '';
  };

  // Render modal content
  const renderModalContent = () => {
    const commonProps = {
      onCancel: closeModal,
      isLoading: isSubmitting,
      profileId
    };

    switch (modalType) {
      case 'profile':
        return (
          <ProfileForm
            profile={editItem}
            onSubmit={(data) => handleSubmit('profile', data)}
            {...commonProps}
          />
        );
      case 'skill':
        return (
          <SkillForm
            skill={editItem}
            categories={categories}
            onSubmit={(data) => handleSubmit('skill', data)}
            {...commonProps}
          />
        );
      case 'project':
        return (
          <ProjectForm
            project={editItem}
            skills={skills}
            onSubmit={(data) => handleSubmit('project', data)}
            {...commonProps}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={editItem}
            onSubmit={(data) => handleSubmit('education', data)}
            {...commonProps}
          />
        );
      case 'experience':
        return (
          <WorkExperienceForm
            experience={editItem}
            onSubmit={(data) => handleSubmit('experience', data)}
            {...commonProps}
          />
        );
      case 'certification':
        return (
          <CertificationForm
            certification={editItem}
            onSubmit={(data) => handleSubmit('certification', data)}
            {...commonProps}
          />
        );
      case 'link':
        return (
          <LinkForm
            link={editItem}
            onSubmit={(data) => handleSubmit('link', data)}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <Loading message="Loading admin panel..." />;

  const tabs = [
    { id: 'profile', label: '👤 Profile', count: profile ? 1 : 0 },
    { id: 'skills', label: '🛠️ Skills', count: skills.length },
    { id: 'projects', label: '📁 Projects', count: projects.length },
    { id: 'education', label: '🎓 Education', count: education.length },
    { id: 'experience', label: '💼 Experience', count: workExperience.length },
    { id: 'certifications', label: '📜 Certifications', count: certifications.length },
    { id: 'links', label: '🔗 Links', count: links.length }
  ];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Manage your portfolio data dynamically</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Profile Information</h2>
              <button 
                className="btn btn-primary"
                onClick={() => openModal('profile', profile)}
              >
                {profile ? '✏️ Edit Profile' : '➕ Create Profile'}
              </button>
            </div>
            {profile ? (
              <div className="profile-card-admin">
                <h3>{profile.first_name} {profile.last_name}</h3>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                <p><strong>Location:</strong> {profile.location || 'N/A'}</p>
                <p><strong>Summary:</strong> {profile.summary || 'N/A'}</p>
              </div>
            ) : (
              <div className="empty-state">
                <p>No profile created yet. Click "Create Profile" to get started.</p>
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Skills ({skills.length})</h2>
              <button className="btn btn-primary" onClick={() => openModal('skill')}>
                ➕ Add Skill
              </button>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Proficiency</th>
                    <th>Years</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map(skill => (
                    <tr key={skill.id}>
                      <td>{skill.name}</td>
                      <td>
                        <span className={`badge badge-${skill.proficiency_level}`}>
                          {skill.proficiency_level}
                        </span>
                      </td>
                      <td>{skill.years_of_experience || '-'}</td>
                      <td className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => openModal('skill', skill)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete('skill', skill.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {skills.length === 0 && (
                <div className="empty-state">No skills added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Projects ({projects.length})</h2>
              <button className="btn btn-primary" onClick={() => openModal('project')}>
                ➕ Add Project
              </button>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Featured</th>
                    <th>Links</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td><strong>{project.title}</strong></td>
                      <td className="truncate">{project.description || '-'}</td>
                      <td>{project.is_featured ? '⭐' : '-'}</td>
                      <td>
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={{marginLeft: '8px'}}>Live</a>
                        )}
                      </td>
                      <td className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => openModal('project', project)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete('project', project.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {projects.length === 0 && (
                <div className="empty-state">No projects added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Education ({education.length})</h2>
              <button className="btn btn-primary" onClick={() => openModal('education')}>
                ➕ Add Education
              </button>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Institution</th>
                    <th>Degree</th>
                    <th>Field</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map(edu => (
                    <tr key={edu.id}>
                      <td><strong>{edu.institution_name}</strong></td>
                      <td>{edu.degree || '-'}</td>
                      <td>{edu.field_of_study || '-'}</td>
                      <td>
                        {edu.start_year} - {edu.is_current ? 'Present' : (edu.end_year || 'N/A')}
                      </td>
                      <td className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => openModal('education', edu)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete('education', edu.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {education.length === 0 && (
                <div className="empty-state">No education records added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Work Experience Tab */}
        {activeTab === 'experience' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Work Experience ({workExperience.length})</h2>
              <button className="btn btn-primary" onClick={() => openModal('experience')}>
                ➕ Add Experience
              </button>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workExperience.map(exp => (
                    <tr key={exp.id}>
                      <td><strong>{exp.company_name}</strong></td>
                      <td>{exp.job_title}</td>
                      <td>{exp.location || '-'}</td>
                      <td>
                        {exp.start_date} - {exp.is_current ? 'Present' : (exp.end_date || 'N/A')}
                      </td>
                      <td className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => openModal('experience', exp)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete('experience', exp.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {workExperience.length === 0 && (
                <div className="empty-state">No work experience added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Certifications ({certifications.length})</h2>
              <button className="btn btn-primary" onClick={() => openModal('certification')}>
                ➕ Add Certification
              </button>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Organization</th>
                    <th>Issue Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map(cert => (
                    <tr key={cert.id}>
                      <td><strong>{cert.title || cert.name}</strong></td>
                      <td>{cert.issuing_organization}</td>
                      <td>{cert.issue_date || '-'}</td>
                      <td className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => openModal('certification', cert)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete('certification', cert.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {certifications.length === 0 && (
                <div className="empty-state">No certifications added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Social Links ({links.length})</h2>
              <button className="btn btn-primary" onClick={() => openModal('link')}>
                ➕ Add Link
              </button>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>URL</th>
                    <th>Display Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map(link => (
                    <tr key={link.id}>
                      <td><strong>{link.platform}</strong></td>
                      <td>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.url}
                        </a>
                      </td>
                      <td>{link.display_name || '-'}</td>
                      <td className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => openModal('link', link)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete('link', link.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {links.length === 0 && (
                <div className="empty-state">No links added yet.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        size="large"
      >
        {renderModalContent()}
      </Modal>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
};

export default AdminPage;
