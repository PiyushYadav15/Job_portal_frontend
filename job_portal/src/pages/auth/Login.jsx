import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({

        username: "",

        password: "",

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const user = await login(

                formData.username,

                formData.password

            );

            if (user.role === "employer") {

                navigate("/employer/dashboard");

            }

            else {

                navigate("/dashboard/jobseeker");

            }

        }

        catch (err) {

            if (err.response?.data?.detail) {

                setError(err.response.data.detail);

            }

            else {

                setError("Invalid username or password.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center">

                    Login

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Welcome back!

                </p>

                {error && (

                    <div className="mt-5 bg-red-100 text-red-700 p-3 rounded-lg">

                        {error}

                    </div>

                )}

                <form

                    onSubmit={handleSubmit}

                    className="mt-6 space-y-5"

                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Username

                        </label>

                        <input

                            type="text"

                            name="username"

                            value={formData.username}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <input

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"

                    >

                        {

                            loading

                                ? "Signing In..."

                                : "Login"

                        }

                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?

                    {" "}

                    <Link

                        to="/register"

                        className="text-blue-600 font-semibold"

                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;