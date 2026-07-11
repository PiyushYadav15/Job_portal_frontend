import { useState } from "react";
import api from "../../api/axios";

function JobForm({ initialData = null, onSuccess }) {

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        location: initialData?.location || "",
        salary_min: initialData?.salary_min || "",
        salary_max: initialData?.salary_max || "",
        employment_type:
            initialData?.employment_type || "full_time",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (initialData) {

              await api.put(
                `/employer/jobs/${initialData.id}/`,
                formData
            );

                alert("Job Updated Successfully");

            } else {

               await api.post(
                     "/employer/jobs/",
                      formData
                    );
                alert("Job Created Successfully");

            }

            if (onSuccess) {

                onSuccess();

            }

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-8">

                {initialData
                    ? "Edit Job"
                    : "Post New Job"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Job Title */}

                <div>

                    <label className="font-semibold">

                        Job Title

                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

                {/* Location */}

                <div>

                    <label className="font-semibold">

                        Location

                    </label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

                {/* Salary */}

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="font-semibold">

                            Minimum Salary

                        </label>

                        <input
                            type="number"
                            name="salary_min"
                            value={formData.salary_min}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full border rounded-xl p-3"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Maximum Salary

                        </label>

                        <input
                            type="number"
                            name="salary_max"
                            value={formData.salary_max}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full border rounded-xl p-3"
                        />

                    </div>

                </div>

                {/* Employment Type */}

                <div>

                    <label className="font-semibold">

                        Employment Type

                    </label>

                    <select
                        name="employment_type"
                        value={formData.employment_type}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    >

                        <option value="full_time">

                            Full Time

                        </option>

                        <option value="part_time">

                            Part Time

                        </option>

                        <option value="contract">

                            Contract

                        </option>

                        <option value="internship">

                            Internship

                        </option>

                        <option value="remote">

                            Remote

                        </option>

                    </select>

                </div>

                {/* Description */}

                <div>

                    <label className="font-semibold">

                        Job Description

                    </label>

                    <textarea
                        rows="8"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full border rounded-xl p-3 resize-none"
                    />

                </div>

                {/* Submit */}

                <button
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
                >

                    {loading
                        ? "Saving..."
                        : initialData
                        ? "Update Job"
                        : "Publish Job"}

                </button>

            </form>

        </div>

    );

}

export default JobForm;