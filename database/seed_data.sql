-- ============================================
-- Seed Data for Anuj Singh's Portfolio
-- ============================================

-- Insert Profile
INSERT INTO profiles (first_name, last_name, email, phone, location, summary, resume_url)
VALUES (
    'Anuj',
    'Singh',
    '242211004@nitdelhi.ac.in',
    '+91-9935525093',
    'New Delhi, India',
    'M.Tech student at NIT Delhi specializing in Computer Science & Engineering with expertise in Full Stack Development, Machine Learning, and Data Science. Passionate about building scalable web applications and AI/ML solutions.',
    'https://linkedin.com/in/anujsingh122002'
);

-- Insert Skill Categories
INSERT INTO skill_categories (name, description) VALUES
('Programming Languages', 'Core programming languages'),
('AI / ML', 'Artificial Intelligence and Machine Learning libraries'),
('Full Stack Development', 'Web development technologies'),
('Databases', 'Database management systems'),
('Data Structures', 'Data structure concepts and algorithms'),
('Tools & Platforms', 'Development tools and platforms');

-- Insert Skills
INSERT INTO skills (profile_id, category_id, name, proficiency_level) VALUES
-- Programming Languages
(1, 1, 'Python', 'advanced'),
-- AI / ML
(1, 2, 'NumPy', 'advanced'),
(1, 2, 'Pandas', 'advanced'),
(1, 2, 'Scikit-learn', 'intermediate'),
(1, 2, 'NLP', 'basic'),
(1, 2, 'Matplotlib', 'intermediate'),
(1, 2, 'Seaborn', 'intermediate'),
-- Full Stack Development
(1, 3, 'HTML', 'advanced'),
(1, 3, 'CSS', 'advanced'),
(1, 3, 'JavaScript', 'advanced'),
(1, 3, 'React.js', 'intermediate'),
(1, 3, 'PHP', 'intermediate'),
(1, 3, 'REST APIs', 'intermediate'),
-- Databases
(1, 4, 'MySQL', 'advanced'),
(1, 4, 'SQL', 'advanced'),
(1, 4, 'DBMS', 'advanced'),
-- Data Structures
(1, 5, 'Data Structures', 'advanced'),
-- Tools & Platforms
(1, 6, 'Git', 'advanced'),
(1, 6, 'GitHub', 'advanced'),
(1, 6, 'Visual Studio Code', 'advanced'),
(1, 6, 'Jupyter Notebook', 'advanced');

-- Insert Education
INSERT INTO education (profile_id, institution_name, degree, field_of_study, location, start_year, end_year, is_current) VALUES
(1, 'National Institute of Technology, Delhi', 'M.Tech', 'Computer Science & Engineering', 'New Delhi, India', 2024, 2026, TRUE),
(1, 'Veer Bahadur Singh Purvanchal University', 'B.Tech', 'Information Technology', 'Jaunpur, India', 2020, 2024, FALSE),
(1, 'Nav Jeevan Mission School', 'Class 12', NULL, 'Deoria, India', 2019, 2020, FALSE),
(1, 'Nav Jeevan Mission School', 'Class 10', NULL, 'Deoria, India', 2017, 2018, FALSE);

-- Insert Projects
INSERT INTO projects (profile_id, title, description, detailed_description, is_featured) VALUES
(1, 'Product Management System', 
   'Full-stack platform with secure CRUD operations and admin inventory management',
   'Developed a full-stack platform with secure CRUD operations, admin inventory management, and customer cart & checkout using PHP and MySQL. Features include user authentication, product catalog management, shopping cart functionality, and order processing.',
   TRUE),
(1, 'Google Calendar Clone', 
   'Responsive calendar application with event management',
   'Built a responsive calendar application using React.js, HTML, CSS, and JavaScript. Integrated APIs to support event creation, editing, and deletion with real-time updates. Features include drag-and-drop events, multiple calendar views, and event reminders.',
   TRUE),
(1, 'Credit Card Fraud Detection', 
   'ML model for detecting fraudulent transactions',
   'Created an ML model using Python, Pandas, NumPy, and Scikit-learn to detect credit card fraud. Performed data preprocessing and applied classification algorithms for improved accuracy. Implemented feature engineering and model evaluation metrics.',
   TRUE);

-- Insert Project Skills relationships
-- Product Management System
INSERT INTO project_skills (project_id, skill_id) 
SELECT 1, id FROM skills WHERE name IN ('PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript');

-- Google Calendar Clone
INSERT INTO project_skills (project_id, skill_id) 
SELECT 2, id FROM skills WHERE name IN ('React.js', 'HTML', 'CSS', 'JavaScript', 'REST APIs');

-- Credit Card Fraud Detection
INSERT INTO project_skills (project_id, skill_id) 
SELECT 3, id FROM skills WHERE name IN ('Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib');

-- Insert Work Experience
INSERT INTO work_experience (profile_id, company_name, job_title, location, start_date, end_date, description, achievements) VALUES
(1, 'National Institute of Electronics & Information Technology (NIELIT)', 
   'Web Development Intern', 
   'Govt. of India', 
   '2023-05-01', 
   '2023-06-30',
   'Industrial training focused on web development technologies',
   ARRAY[
       'Developed responsive web pages using HTML, CSS, and JavaScript for desktop and mobile devices',
       'Implemented interactive features such as menus, forms, buttons, and animations to improve user engagement',
       'Successfully completed the industrial training with Grade A from NIELIT'
   ]),
(1, 'NIT Delhi', 
   'Technical Intern & Event Co-Coordinator', 
   'New Delhi, India', 
   '2025-06-01', 
   '2025-08-31',
   'Conducted sessions on AI and ML as part of technical internship',
   ARRAY[
       'Conducted sessions on AI and ML',
       'Coordinated technical events and workshops'
   ]);

-- Insert Links
INSERT INTO links (profile_id, platform, url, display_name, is_primary) VALUES
(1, 'LinkedIn', 'https://linkedin.com/in/anujsingh122002', 'anujsingh122002', TRUE),
(1, 'Email', 'mailto:242211004@nitdelhi.ac.in', '242211004@nitdelhi.ac.in', TRUE),
(1, 'GitHub', 'https://github.com/anujsingh122002', 'anujsingh122002', FALSE);

-- Insert Certifications
INSERT INTO certifications (profile_id, title, issuing_organization, issue_date, description, credential_url) VALUES
(1, 'Technical Intern & Event Co-Coordinator Certificate', 
   'NIT Delhi', 
   '2025-08-31',
   'Certificate for conducting sessions on AI and ML',
   'https://example.com/certificate/nitdelhi'),
(1, 'Web Development Internship Certificate', 
   'NIELIT', 
   '2023-06-30',
   'Certificate for completing industrial training in HTML, CSS, JavaScript, Visual Studio Code with Grade A',
   'https://example.com/certificate/nielit');
