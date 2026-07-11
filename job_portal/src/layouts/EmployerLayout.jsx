import { Outlet } from "react-router-dom";
import Sidebar from "../components/employer/Sidebar";
import DashboardNavbar from "../components/employer/DashboardNavbar";

function EmployerLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">

                    {/* Top Navbar */}
                    <DashboardNavbar />

                    {/* Page Content */}
                    <main className="flex-1 p-8 overflow-auto">
                        <Outlet />
                    </main>

                </div>

            </div>
        </div>
    );
}

export default EmployerLayout;