import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function EmployerRoute() {

    const {

        loading,
        isAuthenticated,
        isEmployer,

    } = useAuth();

    // Wait until authentication is loaded
    if (loading) {

        return (

            <div className="h-screen flex justify-center items-center">

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

    // Logged in but not an employer
    if (!isEmployer) {

        return <Navigate to="/dashboard/jobseeker" replace />;

    }

    // Employer can access the route
    return <Outlet />;

}

export default EmployerRoute;