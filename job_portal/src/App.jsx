import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Layout
import Navbar from "./components/Navbar";

// Route Guards
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EmployerRoute from "./components/auth/EmployerRoute";
import JobSeekerRoute from "./components/auth/JobSeekerRoute";
import PublicRoute from "./components/auth/PublicRoute";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Employer Pages
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployerJobs from "./pages/employer/MyJobs";
import CreateJob from "./pages/employer/CreateJob";
import EditJob from "./pages/employer/EditJob";
import Applicants from "./pages/employer/Applicants";

// Job Seeker Pages
import Dashboard from "./pages/jobseeker/Dashboard";
import BrowseJobs from "./pages/jobseeker/BrowseJobs";
import JobDetails from "./pages/jobseeker/JobDetails";
import SavedJobs from "./pages/jobseeker/SavedJobs";
import MyApplications from "./pages/jobseeker/MyApplications";
import ApplyJob from "./pages/jobseeker/ApplyJob";

function App() {

    return (

        <AuthProvider>

            <BrowserRouter>

                <Navbar />

                <Routes>

                    {/* Default */}

                    <Route

                        path="/"

                        element={<Navigate to="/login" replace />}

                    />

                    {/* ========================= */}

                    {/* Public Routes */}

                    {/* ========================= */}

                    <Route element={<PublicRoute />}>

                        <Route

                            path="/login"

                            element={<Login />}

                        />

                        <Route

                            path="/register"

                            element={<Register />}

                        />

                    </Route>

                    {/* ========================= */}

                    {/* Protected */}

                    {/* ========================= */}

                    <Route element={<ProtectedRoute />}>

                        {/* Employer */}

                        <Route element={<EmployerRoute />}>

                            <Route

                                path="/employer/dashboard"

                                element={<EmployerDashboard />}

                            />

                            <Route

                                path="/employer/jobs"

                                element={<EmployerJobs />}

                            />

                            <Route

                                path="/employer/jobs/create"

                                element={<CreateJob />}

                            />

                            <Route

                                path="/employer/jobs/:id/edit"

                                element={<EditJob />}

                            />

                            <Route

                                path="/employer/jobs/:id/applicants"

                                element={<Applicants />}

                            />

                        </Route>

                        {/* Job Seeker */}

                        <Route element={<JobSeekerRoute />}>

                            <Route

                                path="/dashboard/jobseeker"

                                element={<Dashboard />}

                            />

                            <Route

                                path="/jobs"

                                element={<BrowseJobs />}

                            />

                            <Route

                                path="/jobs/:id"

                                element={<JobDetails />}

                            />

                            <Route

                                path="/saved-jobs"

                                element={<SavedJobs />}

                            />

                            <Route

                                path="/my-applications"

                                element={<MyApplications />}

                            />

                          <Route
                                path="/jobs/:id/apply"
                                element={<ApplyJob />}
                            />

                        </Route>

                    </Route>

                    {/* 404 */}

                    <Route

                        path="*"

                        element={

                            <h1 className="text-center mt-20 text-3xl">

                                404 Page Not Found

                            </h1>

                        }

                    />

                </Routes>

            </BrowserRouter>

        </AuthProvider>

    );

}

export default App;