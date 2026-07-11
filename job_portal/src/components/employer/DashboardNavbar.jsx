import { useState } from "react";
import {
    Search,
    Bell,
    MessageSquare,
    Moon,
    Sun,
    ChevronDown,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

function DashboardNavbar() {
    const { user } = useAuth();

    const [darkMode, setDarkMode] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-gray-200">

            <div className="flex items-center justify-between px-6 py-4">

                {/* Search */}

                <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-3 w-[400px]">

                    <Search
                        size={20}
                        className="text-gray-500"
                    />

                    <input
                        type="text"
                        placeholder="Search jobs, applicants..."
                        className="bg-transparent outline-none ml-3 w-full"
                    />

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    {/* Dark Mode */}

                    <button
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                        className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                    >
                        {darkMode ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    {/* Messages */}

                    <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">

                        <MessageSquare size={20} />

                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">

                            3

                        </span>

                    </button>

                    {/* Notifications */}

                    <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">

                        <Bell size={20} />

                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">

                            5

                        </span>

                    </button>

                    {/* Profile */}

                    <div className="relative">

                        <button
                            onClick={() =>
                                setShowMenu(!showMenu)
                            }
                            className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
                        >

                            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                                {user?.username
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                            </div>

                            <div className="hidden md:block text-left">

                                <h4 className="font-semibold">

                                    {user?.username}

                                </h4>

                                <p className="text-xs text-gray-500">

                                    Employer

                                </p>

                            </div>

                            <ChevronDown size={18} />

                        </button>

                        {/* Dropdown */}

                        {showMenu && (

                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border">

                                <div className="p-4 border-b">

                                    <h3 className="font-semibold">

                                        {user?.username}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        Employer Account

                                    </p>

                                </div>

                                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">

                                    Profile

                                </button>

                                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">

                                    Settings

                                </button>

                                <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50">

                                    Logout

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
}

export default DashboardNavbar;