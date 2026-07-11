import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function JobSeekerRoute() {

    const {

        loading,
        isAuthenticated,
        isJobSeeker,

    } = useAuth();

    // Wait until authentication is initialized
    if (loading) {

        return (

            <div className="h-screen flex items-center justify-center">

                <h2 className="text-xl font-semibold">

                    Loading...

                </h2>

            </div>

        );

    }

    // User is not logged in
    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    // Logged in but not a job seeker
    if (!isJobSeeker) {

        return <Navigate to="/employer/dashboard" replace />;

    }

    // Job seeker can access the route
    return <Outlet />;

}

export default JobSeekerRoute;