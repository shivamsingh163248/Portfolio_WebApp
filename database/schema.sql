-- ============================================
-- Portfolio Database Schema
-- Normalized Database Design (3NF)
-- ============================================

-- Drop tables if exist (for clean setup)
DROP TABLE IF EXISTS project_skills CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS work_experience CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS skill_categories CASCADE;

-- ============================================
-- Table 1: profiles (Main user profile)
-- ============================================
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    summary TEXT,
    resume_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table 2: skill_categories (Skill grouping)
-- ============================================
CREATE TABLE skill_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table 3: skills (Individual skills)
-- ============================================
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES skill_categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(50) DEFAULT 'intermediate',
    years_of_experience DECIMAL(3,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, name)
);

-- ============================================
-- Table 4: education (Educational background)
-- ============================================
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(100),
    field_of_study VARCHAR(100),
    location VARCHAR(255),
    start_year INTEGER,
    end_year INTEGER,
    grade VARCHAR(50),
    description TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table 5: projects (Portfolio projects)
-- ============================================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    detailed_description TEXT,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table 6: project_skills (Many-to-Many: Projects <-> Skills)
-- ============================================
CREATE TABLE project_skills (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(project_id, skill_id)
);

-- ============================================
-- Table 7: work_experience (Work history)
-- ============================================
CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table 8: links (Social/Professional links)
-- ============================================
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_name VARCHAR(255),
    icon VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, platform)
);

-- ============================================
-- Table 9: certifications (Certificates & Awards)
-- ============================================
CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes for better query performance
-- ============================================
CREATE INDEX idx_skills_profile ON skills(profile_id);
CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_skills_name ON skills(name);
CREATE INDEX idx_education_profile ON education(profile_id);
CREATE INDEX idx_projects_profile ON projects(profile_id);
CREATE INDEX idx_projects_title ON projects(title);
CREATE INDEX idx_work_experience_profile ON work_experience(profile_id);
CREATE INDEX idx_links_profile ON links(profile_id);
CREATE INDEX idx_certifications_profile ON certifications(profile_id);
CREATE INDEX idx_project_skills_project ON project_skills(project_id);
CREATE INDEX idx_project_skills_skill ON project_skills(skill_id);

-- Full-text search indexes
CREATE INDEX idx_projects_search ON projects USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_skills_search ON skills USING gin(to_tsvector('english', name));
