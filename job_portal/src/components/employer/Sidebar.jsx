import {
    LayoutDashboard,
    Briefcase,
    PlusCircle,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Sidebar() {

    const { logout } = useAuth();

    const menu = [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/employer/dashboard",
        },

        {
            title: "My Jobs",
            icon: Briefcase,
            path: "/employer/my-jobs",
        },

        {
            title: "Post Job",
            icon: PlusCircle,
            path: "/employer/create-job",
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/employer/settings",
        },

    ];

    return (

        <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

            <div className="text-center py-8">

                <h1 className="text-3xl font-bold">

                    Employer

                </h1>

            </div>

            <nav className="flex-1 px-4 space-y-2">

                {

                    menu.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.title}

                                to={item.path}

                                className={({ isActive }) =>

                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition

                                    ${isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-700"}`

                                }

                            >

                                <Icon size={20} />

                                {item.title}

                            </NavLink>

                        );

                    })

                }

            </nav>

            <div className="p-4">

                <button

                    onClick={logout}

                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl"

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Sidebar;