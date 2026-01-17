# Portfolio Web Application

A full-stack portfolio application built with React.js (Frontend), FastAPI (Backend), and PostgreSQL (Database).

## 🚀 Live Demo

- **Frontend URL**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📑 Resume

**Anuj Singh**  
📧 242211004@nitdelhi.ac.in  
🔗 [LinkedIn](https://linkedin.com/in/anujsingh122002)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Docker Compose                          │
├─────────────────┬─────────────────┬─────────────────────────────┤
│                 │                 │                             │
│   Frontend      │    Backend      │        Database             │
│   (React.js)    │   (FastAPI)     │     (PostgreSQL)            │
│   Port: 3000    │   Port: 8000    │     Port: 5432              │
│                 │                 │                             │
│  ┌───────────┐  │  ┌───────────┐  │  ┌───────────────────────┐  │
│  │ Components│  │  │  Routes   │  │  │      Tables           │  │
│  │ - Profile │  │  │  - /api   │  │  │  - profiles           │  │
│  │ - Projects│  │  │  - /health│  │  │  - skills             │  │
│  │ - Skills  │  │  │  - /search│  │  │  - projects           │  │
│  │ - Search  │  │  │           │  │  │  - education          │  │
│  └───────────┘  │  └───────────┘  │  │  - work_experience    │  │
│        │        │        │        │  │  - links              │  │
│        ▼        │        ▼        │  │  - certifications     │  │
│   Axios API     │   SQLAlchemy    │  └───────────────────────┘  │
│    Calls        │      ORM        │                             │
│                 │                 │                             │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

---

## 📁 Project Structure

```
Portfolio_WebApp/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── models/            # SQLAlchemy ORM Models
│   │   │   ├── profile.py
│   │   │   ├── skill.py
│   │   │   ├── skill_category.py
│   │   │   ├── project.py
│   │   │   ├── education.py
│   │   │   ├── work_experience.py
│   │   │   ├── link.py
│   │   │   └── certification.py
│   │   ├── routes/            # API Endpoints
│   │   │   ├── health.py
│   │   │   ├── profile.py
│   │   │   ├── skills.py
│   │   │   ├── projects.py
│   │   │   ├── education.py
│   │   │   ├── work_experience.py
│   │   │   ├── links.py
│   │   │   ├── certifications.py
│   │   │   └── search.py
│   │   ├── schemas/           # Pydantic Schemas
│   │   ├── database.py        # Database Configuration
│   │   └── config.py          # App Configuration
│   ├── main.py                # FastAPI Entry Point
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .gitignore
│
├── frontend/                   # React.js Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Shared Components
│   │   │   ├── layout/        # Header, Footer
│   │   │   ├── profile/       # Profile Components
│   │   │   ├── projects/      # Project Components
│   │   │   ├── skills/        # Skill Components
│   │   │   └── search/        # Search Components
│   │   ├── pages/             # Page Components
│   │   ├── services/          # API Services
│   │   ├── styles/            # CSS Styles
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   └── .gitignore
│
├── database/                   # Database Scripts
│   ├── schema.sql             # Database Schema
│   ├── seed_data.sql          # Seed Data
│   └── init.sh                # Initialization Script
│
├── docker-compose.yml          # Production Docker Compose
├── docker-compose.dev.yml      # Development Docker Compose
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

### Tables (9 tables - Normalized to 3NF)

| Table | Description |
|-------|-------------|
| `profiles` | Main user profile information |
| `skill_categories` | Skill groupings (Programming, AI/ML, etc.) |
| `skills` | Individual skills with proficiency levels |
| `education` | Educational background |
| `projects` | Portfolio projects |
| `project_skills` | Many-to-many: Projects ↔ Skills |
| `work_experience` | Work history with achievements |
| `links` | Social/Professional links |
| `certifications` | Certificates and awards |

### Entity Relationship

```
profiles (1) ──── (N) skills
    │                    │
    │                    └── (N) skill_categories (1)
    │
    ├── (N) education
    │
    ├── (N) projects ──── (N) project_skills ──── (N) skills
    │
    ├── (N) work_experience
    │
    ├── (N) links
    │
    └── (N) certifications
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Quick Start (Docker)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio_WebApp
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Local Development

#### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Database Setup (Local PostgreSQL)
```bash
# Create database
psql -U postgres -c "CREATE DATABASE portfolio_db;"
psql -U postgres -c "CREATE USER portfolio_user WITH PASSWORD 'portfolio_pass';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;"

# Run migrations
psql -U portfolio_user -d portfolio_db -f database/schema.sql
psql -U portfolio_user -d portfolio_db -f database/seed_data.sql
```

---

## 📡 API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (liveness probe) |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile/` | Get all profiles |
| GET | `/api/profile/{id}` | Get profile with all details |
| POST | `/api/profile/` | Create new profile |
| PUT | `/api/profile/{id}` | Update profile |
| DELETE | `/api/profile/{id}` | Delete profile |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills/` | Get all skills |
| GET | `/api/skills/top` | Get top skills by project usage |
| GET | `/api/skills/categories` | Get skill categories |
| GET | `/api/skills/by-category` | Get skills grouped by category |
| GET | `/api/skills/{id}` | Get specific skill |
| POST | `/api/skills/` | Create skill |
| PUT | `/api/skills/{id}` | Update skill |
| DELETE | `/api/skills/{id}` | Delete skill |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/` | Get all projects |
| GET | `/api/projects/?skill=python` | Filter projects by skill |
| GET | `/api/projects/{id}` | Get specific project |
| POST | `/api/projects/` | Create project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search/?q={query}` | Global search |
| GET | `/api/search/projects-by-skill?skill={skill}` | Search projects by skill |

---

## 🧪 Sample API Requests

### cURL Examples

```bash
# Health Check
curl http://localhost:8000/health

# Get Profile
curl http://localhost:8000/api/profile/1

# Get All Skills
curl http://localhost:8000/api/skills/

# Get Top Skills
curl http://localhost:8000/api/skills/top?limit=5

# Filter Projects by Skill
curl "http://localhost:8000/api/projects/?skill=python"

# Global Search
curl "http://localhost:8000/api/search/?q=python"

# Search Projects by Skill
curl "http://localhost:8000/api/search/projects-by-skill?skill=React"
```

### Postman Collection

Import the following endpoints in Postman:

```json
{
  "info": {
    "name": "Portfolio API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/profile/1"
      }
    },
    {
      "name": "Get Skills",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/skills/"
      }
    },
    {
      "name": "Get Projects",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/projects/"
      }
    },
    {
      "name": "Search",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/search/?q=python"
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8000"
    }
  ]
}
```

---

## ⚠️ Known Limitations

1. **Authentication**: No authentication implemented for write operations (create/update/delete)
2. **Rate Limiting**: No rate limiting implemented
3. **File Uploads**: No support for image/file uploads
4. **Pagination**: Basic pagination implemented, no cursor-based pagination
5. **Caching**: No caching layer implemented
6. **Testing**: Unit and integration tests not implemented
7. **CI/CD**: No CI/CD pipeline configured

---

## 🔮 Future Improvements

- [ ] Add JWT authentication for write operations
- [ ] Implement rate limiting
- [ ] Add file upload support for profile images
- [ ] Add comprehensive test suite
- [ ] Set up CI/CD pipeline
- [ ] Add Redis caching
- [ ] Implement logging and monitoring
- [ ] Add dark mode to frontend

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Anuj Singh**
- 📧 Email: 242211004@nitdelhi.ac.in
- 🔗 LinkedIn: [linkedin.com/in/anujsingh122002](https://linkedin.com/in/anujsingh122002)
- 📍 New Delhi, India
- 🎓 M.Tech in Computer Science & Engineering, NIT Delhi (2024-2026)
