Job Board Portal — Frontend 🎨

The React frontend for my Job Board Portal project. Built with React.js, Axios, and React Router — connects to a Django REST Framework backend with JWT authentication and AI-powered features.



Live demo: your-vercel-link.vercel.app


What it looks like

Three main experiences depending on who's logged in:

For job seekers:


Browse all job listings without even logging in
Search jobs by title
Apply to jobs with a cover letter and resume PDF
Upload resume and get instant AI feedback — match score, strengths, missing skills
Track all applications in one dashboard


For employers:


Post jobs using the AI job description generator (fill 4 fields → get a full JD)
View all applicants per job listing
Update applicant status (Applied → Reviewed → Rejected)
Manage and edit existing job postings


Public (no login needed):


Browse and search all job listings
View job details



Tech used

ThingWhyReact.jsUI frameworkReact Router v6Page navigation without full reloadsAxiosHTTP requests to the Django APIContext APISharing login state across the whole appJWT (localStorage)Keeping the user logged in across page refreshes

No UI library used — all styled with plain CSS so the code is easier to read and understand.


Folder structure

src/
├── api/
│   └── axios.js          # Axios instance with JWT interceptor — all API calls go through here
│
├── context/
│   └── AuthContext.js    # Global login state — user info, login(), logout()
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── JobList.jsx           # Public job listings with search
│   ├── JobDetail.jsx         # Single job + AI resume feedback + interview prep
│   ├── ApplyForm.jsx         # Application form with PDF resume upload
│   ├── SeekerDashboard.jsx   # Seeker's application history
│   └── EmployerDashboard.jsx # Employer's jobs + applicant management
│
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── ResumeFeedback.jsx    # AI resume vs JD analysis component
│   ├── InterviewPrep.jsx     # AI interview question generator
│   └── GenerateJD.jsx        # AI job description writer for employers
│
└── App.jsx                   # Routes and AuthProvider wrapper


How the JWT auth works

When you log in, the backend returns an access token and a refresh token. The frontend stores them in localStorage and attaches the access token to every API request automatically using an Axios interceptor:

js// api/axios.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

This means you never have to manually add the auth header anywhere. Every component just calls api.get(...) or api.post(...) and the token is attached behind the scenes.


Running locally


Setup

bash# Clone the repo
git clone https://github.com/PiyushYadav15/Job_portal-Frontend.git
cd Job_portal-Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

Add this to your .env file:

REACT_APP_API_URL=http://localhost:8000/api

bash# Start the development server
npm start

Opens on http://localhost:3000. Make sure the Django backend is already running before you open this.


Environment variables

VariableValue (local)Value (production)REACT_APP_API_URLhttp://localhost:8000/apihttps://your-backend.render.com/api


AI features (frontend side)

Three AI components — all sit inside existing pages, not separate pages.

Resume feedback (ResumeFeedback.jsx)

Lives inside JobDetail.jsx. Seeker uploads a PDF → component sends it to /api/ai/resume-feedback/ as FormData (not JSON, because it's a file) → displays the AI response in structured cards showing score, strengths, missing skills, and verdict.

Interview prep (InterviewPrep.jsx)

Also lives inside JobDetail.jsx. One button click → sends job_id to /api/ai/interview-prep/ → displays technical questions, HR questions, key topics, and an insider tip in an accordion layout.

JD generator (GenerateJD.jsx)

Lives inside EmployerDashboard.jsx. Employer fills title, location, experience, skills → sends to /api/ai/generate-jd/ → returns a full JD in a textarea the employer can edit before posting.


Pages and routes

/                    → redirects to /jobs
/login               → Login page
/register            → Register (choose role: employer or seeker)
/jobs                → Job listings (public)
/jobs/:id            → Job detail + AI features (public view, AI needs login)
/apply/:id           → Application form (seekers only)
/dashboard/seeker    → My applications (seekers only)
/dashboard/employer  → My jobs + applicants (employers only)


Connecting to the backend

All API calls go through src/api/axios.js. The base URL is set from the environment variable:

jsconst api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

When deploying, just change REACT_APP_API_URL in your Vercel environment variables to point to the live Render backend URL — no code changes needed.


Deployment (Vercel)


Push this repo to GitHub
Go to vercel.com → Import project → select this repo
Add environment variable: REACT_APP_API_URL = your Render backend URL
Click Deploy


Vercel auto-deploys every time you push to main. Takes about 90 seconds.

One thing to set up after deploying — go to your Django backend settings and add your Vercel URL to CORS_ALLOWED_ORIGINS:

pythonCORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",
]

Without this, the browser will block all API calls from the frontend.


Common issues

Blank page after login
Usually means the backend isn't running or the REACT_APP_API_URL in .env is wrong. Check the browser console for CORS or 404 errors.

"Network Error" on API calls
Backend is not running. Start Django first with python manage.py runserver.

PDF upload not working
Make sure you're sending FormData not JSON for the resume feedback endpoint. Regular JSON.stringify doesn't handle file uploads.

Login works but pages show "unauthorized"
Access token might be expired. Clear localStorage and log in again. In production this is handled by the refresh token flow.


Related


Backend repo: Job_portal-Backend — Django REST Framework + Groq AI
Full project writeup: in the backend README



Author

Piyush Yadav
MCA student 


License

MIT — feel free to use this as a reference for your own proj
