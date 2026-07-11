import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PublicRoute() {

    const {

        loading,
        isAuthenticated,
        isEmployer,
        isJobSeeker,

    } = useAuth();

    // Wait until auth state is initialized
    if (loading) {

        return (

            <div className="h-screen flex items-center justify-center">

                <h2 className="text-xl font-semibold">

                    Loading...

                </h2>

            </div>

        );

    }

    // If already logged in, redirect based on role
    if (isAuthenticated) {

        if (isEmployer) {

            return (
                <Navigate
                    to="/employer/dashboard"
                    replace
                />
            );

        }

        if (isJobSeeker) {

            return (
                <Navigate
                    to="/dashboard/jobseeker"
                    replace
                />
            );

        }

    }

    // Guest users can access login/register
    return <Outlet />;

}

export default PublicRoute;