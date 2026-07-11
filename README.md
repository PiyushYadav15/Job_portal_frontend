
# Job Board Portal 🧑‍💻

A full-stack job board where employers post jobs and candidates apply — built with Django REST Framework, React, and a sprinkle of AI.

I built this project to go beyond a basic CRUD app. The idea was simple: most job boards just store applications. Nobody tells you *why* you didn't get shortlisted. So I added AI features that actually help — resume feedback and an auto JD writer — all powered by Groq's LLaMA 3 model.

**Live demo:** [your-link.render.com](https://your-link.render.com) &nbsp;|&nbsp; **Backend API:** [api.your-link.render.com](https://api.your-link.render.com/api/)

---

## What it does

There are two types of users on this platform:

**Employers** can:
- Post job listings in seconds using the AI job description generator (type a title and skills → get a full JD)
- View all applicants for each job, ranked by AI match score
- Update applicant status (Applied → Reviewed → Rejected)

**Job seekers** can:
- Browse and search job listings without logging in
- Apply to jobs with a cover letter and resume upload
- Get AI-powered feedback on how well their resume matches the job
- Track all their applications in one place

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python, Django, Django REST Framework |
| Auth | JWT (djangorestframework-simplejwt) |
| Frontend | React.js, Axios, React Router |
| Database | PostgreSQL |
| AI | Groq API (LLaMA 3 8B) |
| PDF parsing | PyPDF2 |

---

## AI features

This is the part I'm most proud of. Two features, all using the same Groq API service under the hood.

### 1. Resume feedback
Upload your resume PDF and select a job → the AI reads both and tells you:
- A match score out of 100
- What's working in your resume for this role
- Skills you're missing
- Whether you should apply now or upskill first

### 2. JD generator (for employers)
Employers fill in: title, location, experience, key skills → one click → a full professional job description ready to post. They can edit it before publishing.

---

## Project structure

```
jobboard/
├── backend/
│   ├── accounts/          # Custom user model, JWT auth, register/login
│   ├── jobs/              # Job postings, applications, AI views
│   │   ├── models.py      # JobPosting, Application models
│   │   ├── views.py       # DRF viewsets with role-based permissions
│   │   ├── ai_views.py    # All 3 AI endpoints
│   │   ├── groq_service.py # Single Groq client used by all AI features
│   │   └── urls.py        # Router + AI routes
│   └── jobboard/          # Settings, main urls
│
└── frontend/
    ├── src/
    │   ├── api/           # Axios instance with JWT interceptor
    │   ├── context/       # AuthContext — login state across the app
    │   ├── pages/         # JobList, JobDetail, Login, Register, Dashboards
    │   └── components/    # JobCard, Navbar, ResumeFeedback, InterviewPrep
    └── public/
```

---

## API endpoints

```
Auth
POST   /api/accounts/register/       Register as employer or seeker
POST   /api/accounts/login/          Login → returns JWT tokens + user data
POST   /api/accounts/refresh/        Refresh access token
GET    /api/accounts/me/             Get logged-in user profile

Jobs
GET    /api/jobs/                    List all jobs (public)
POST   /api/jobs/                    Create a job (employers only)
GET    /api/jobs/{id}/               Job detail
PUT    /api/jobs/{id}/               Update job (owner only)
DELETE /api/jobs/{id}/               Delete job (owner only)
GET    /api/jobs/{id}/applicants/    Applicants for this job (employer only)

Applications
GET    /api/applications/            Your applications (role-filtered)
POST   /api/applications/            Apply to a job
PATCH  /api/applications/{id}/       Update status (employer only)

AI
POST   /api/ai/generate-jd/          Generate job description
POST   /api/ai/resume-feedback/      Match resume to job (PDF upload)
POST   /api/ai/interview-prep/       Get interview questions for a job
```

---

## Running locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- A free [Groq API key](https://console.groq.com)

### Backend setup

```bash
# Clone the repo
git clone https://github.com/PiyushYadav15/JobBoard.git
cd JobBoard/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate       # Mac/Linux
venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Fill in your GROQ_API_KEY, DB credentials, and SECRET_KEY

# Run migrations
python manage.py migrate

# Create a superuser (optional, for admin panel)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

### Frontend setup

```bash
cd ../frontend

npm install
npm start
```

The React app runs on `http://localhost:3000` and talks to Django on `http://localhost:8000`.

### Environment variables

Create a `.env` file in the `backend/` folder:

```
SECRET_KEY=your-django-secret-key
DEBUG=True
GROQ_API_KEY=gsk_your_groq_key_here

DB_NAME=jobboard_db
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
```

---

## How the AI works (quick version)

The AI layer is one small file — `groq_service.py` — that all three features share:

```python
def ask_groq(prompt, system, max_tokens=1024):
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": system},
            {"role": "user",   "content": prompt}
        ]
    )
    return response.choices[0].message.content
```

Each AI feature just builds a different prompt and passes it here. The model never sees your database — it only sees the text you put in the prompt. For the resume feedback, PyPDF2 extracts the text from the uploaded PDF first, then that text goes into the prompt alongside the job description.

---

## Role-based access

The permission logic is enforced server-side, not just in the UI:

- Only employers can create/edit/delete job postings
- Employers only see applications to *their own* jobs
- Seekers only see *their own* applications
- The `unique_together` constraint on Application prevents a seeker from applying to the same job twice

---


| Job listings | AI resume feedback | Employer dashboard |
|---|---|---|
| *coming soon* | *coming soon* | *coming soon* |

---

## Deployment

- **Backend** is deployed on [Render](https://render.com) with a managed PostgreSQL database
- **Frontend** is deployed on [Vercel](https://vercel.com) connected to the GitHub repo (auto-deploys on push)
- Set `CORS_ALLOWED_ORIGINS` in settings.py to your Vercel domain before deploying

---

## What I learned building this

A few things that weren't obvious until I actually built it:

- JWT auth in a decoupled React + DRF setup is completely different from Django's session-based login. The Axios interceptor pattern is what makes it clean.
- PyPDF2 extracts text but loses formatting — that's fine for AI prompts but you have to truncate it (I cap at 3000 characters) or the prompt gets too long.
- Groq's free tier is fast enough that the AI responses feel instant. No need for background tasks or WebSockets for this use case.
- `unique_together` on the Application model was one line but saved me from having to write any duplicate-check logic anywhere else.

---

## Planned improvements

- [ ] Add live deployed URLs to all projects
- [ ] Email notifications when application status changes
- [ ] Pagination for job listings
- [ ] Search and filter by location, salary, and job type
- [ ] Save jobs for later
- [ ] Employer analytics dashboard (applications over time, conversion rate)

---

## Author

**Piyush Yadav**
MCA student 
---

