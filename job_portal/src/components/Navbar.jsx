import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Navbar() {

    const navigate = useNavigate();

    const {

        user,
        logout,
        isAuthenticated,
        isEmployer,
        isJobSeeker,

    } = useAuth();

    const [mobileMenu, setMobileMenu] = useState(false);

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    const activeClass =
        "text-blue-600 font-semibold";

    const normalClass =
        "text-gray-700 hover:text-blue-600 transition";

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-5">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}

                    <Link

                        to="/"

                        className="text-2xl font-bold text-blue-600"

                    >

                        JobPortal

                    </Link>

                    {/* Desktop */}

                    <div className="hidden md:flex items-center gap-6">

                        {/* =================== */}

                        {/* Employer */}

                        {/* =================== */}

                        {

                            isAuthenticated &&

                            isEmployer &&

                            <>

                                <NavLink

                                    to="/employer/dashboard"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    Dashboard

                                </NavLink>

                                <NavLink

                                    to="/employer/jobs"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    My Jobs

                                </NavLink>

                                <NavLink

                                    to="/employer/jobs/create"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    Post Job

                                </NavLink>

                            </>

                        }

                        {/* =================== */}

                        {/* Job Seeker */}

                        {/* =================== */}

                        {

                            isAuthenticated &&

                            isJobSeeker &&

                            <>

                                <NavLink

                                    to="/dashboard/jobseeker"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    Dashboard

                                </NavLink>

                                <NavLink

                                    to="/jobs"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    Browse Jobs

                                </NavLink>

                                <NavLink

                                    to="/saved-jobs"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    Saved Jobs

                                </NavLink>

                                <NavLink

                                    to="/my-applications"

                                    className={({isActive})=>isActive?activeClass:normalClass}

                                >

                                    Applications

                                </NavLink>

                            </>

                        }

                    </div>

                    {/* Right Side */}

                    <div className="hidden md:flex items-center gap-4">

                        {

                            !isAuthenticated &&

                            <>

                                <Link

                                    to="/login"

                                    className="text-gray-700"

                                >

                                    Login

                                </Link>

                                <Link

                                    to="/register"

                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"

                                >

                                    Register

                                </Link>

                            </>

                        }

                        {

                            isAuthenticated &&

                            <>

                                <span className="font-semibold">

                                    Hello,

                                    {" "}

                                    {user?.first_name || user?.username}

                                </span>

                                <button

                                    onClick={handleLogout}

                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"

                                >

                                    Logout

                                </button>

                            </>

                        }

                    </div>

                    {/* Mobile Button */}

                    <button

                        className="md:hidden"

                        onClick={()=>

                            setMobileMenu(

                                !mobileMenu

                            )

                        }

                    >

                        ☰

                    </button>

                </div>

                {/* Mobile Menu */}

                {

                    mobileMenu &&

                    <div className="md:hidden py-4 border-t">

                        {

                            !isAuthenticated &&

                            <>

                                <Link

                                    to="/login"

                                    className="block py-2"

                                >

                                    Login

                                </Link>

                                <Link

                                    to="/register"

                                    className="block py-2"

                                >

                                    Register

                                </Link>

                            </>

                        }

                        {

                            isEmployer &&

                            <>

                                <Link

                                    to="/employer/dashboard"

                                    className="block py-2"

                                >

                                    Dashboard

                                </Link>

                                <Link

                                    to="/employer/jobs"

                                    className="block py-2"

                                >

                                    My Jobs

                                </Link>

                            </>

                        }

                        {

                            isJobSeeker &&

                            <>

                                <Link

                                    to="/dashboard/jobseeker"

                                    className="block py-2"

                                >

                                    Dashboard

                                </Link>

                                <Link

                                    to="/jobs"

                                    className="block py-2"

                                >

                                    Browse Jobs

                                </Link>

                            </>

                        }

                        {

                            isAuthenticated &&

                            <button

                                onClick={handleLogout}

                                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"

                            >

                                Logout

                            </button>

                        }

                    </div>

                }

            </div>

        </nav>

    );

}

export default Navbar;