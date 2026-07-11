import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        username: "",
        email: "",
        role: "job_seeker",

        password: "",
        confirm_password: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirm_password) {

            setError("Passwords do not match.");

            return;

        }

        setLoading(true);

        try {

            await register(formData);

            alert("Registration successful. Please login.");

            navigate("/login");

        }

        catch (err) {

            if (err.response?.data) {

                const errors = err.response.data;

                const firstError = Object.values(errors)[0];

                setError(

                    Array.isArray(firstError)

                        ? firstError[0]

                        : firstError

                );

            }

            else {

                setError("Registration failed.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center">

                    Create Account

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Join our Job Portal

                </p>

                {

                    error && (

                        <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5">

                            {error}

                        </div>

                    )

                }

                <form

                    onSubmit={handleSubmit}

                    className="mt-6 space-y-4"

                >

                    <div className="grid grid-cols-2 gap-4">

                        <input

                            type="text"

                            name="first_name"

                            placeholder="First Name"

                            value={formData.first_name}

                            onChange={handleChange}

                            required

                            className="border rounded-lg px-4 py-3"

                        />

                        <input

                            type="text"

                            name="last_name"

                            placeholder="Last Name"

                            value={formData.last_name}

                            onChange={handleChange}

                            required

                            className="border rounded-lg px-4 py-3"

                        />

                    </div>

                    <input

                        type="text"

                        name="username"

                        placeholder="Username"

                        value={formData.username}

                        onChange={handleChange}

                        required

                        className="w-full border rounded-lg px-4 py-3"

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                        className="w-full border rounded-lg px-4 py-3"

                    />

                    <select

                        name="role"

                        value={formData.role}

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-3"

                    >

                        <option value="job_seeker">

                            Job Seeker

                        </option>

                        <option value="employer">

                            Employer

                        </option>

                    </select>

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                        className="w-full border rounded-lg px-4 py-3"

                    />

                    <input

                        type="password"

                        name="confirm_password"

                        placeholder="Confirm Password"

                        value={formData.confirm_password}

                        onChange={handleChange}

                        required

                        className="w-full border rounded-lg px-4 py-3"

                    />

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"

                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Register"

                        }

                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?

                    {" "}

                    <Link

                        to="/login"

                        className="text-blue-600 font-semibold"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;