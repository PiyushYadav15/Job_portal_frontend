import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute() {

    const {

        loading,
        isAuthenticated,

    } = useAuth();

    if (loading) {

        return (

            <div className="h-screen flex items-center justify-center">

                <div className="text-xl font-semibold">

                    Loading...

                </div>

            </div>

        );

    }

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    return <Outlet />;

}

export default ProtectedRoute;