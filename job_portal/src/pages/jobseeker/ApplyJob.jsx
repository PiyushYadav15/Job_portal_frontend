import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

import {
    Upload,
    FileText,
    Send,
    ArrowLeft,
} from "lucide-react";

function ApplyJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        cover_letter: "",

        resume: null,

    });

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const response = await api.get(`/jobs/${id}/`);

            setJob(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleResume = (e) => {

        setFormData({

            ...formData,

            resume: e.target.files[0],

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = new FormData();

            data.append(
                "cover_letter",
                formData.cover_letter
            );

            data.append(
                "resume",
                formData.resume
            );

            await api.post(

                `/jobs/${id}/apply/`,

                data,

                {

                    headers: {

                        "Content-Type":
                            "multipart/form-data",

                    },

                }

            );

            alert("Application submitted successfully.");

            navigate("/my-applications");

        }

        catch (error) {

            console.error(error);

            if (error.response?.data) {

                alert(

                    JSON.stringify(
                        error.response.data
                    )

                );

            }

            else {

                alert("Something went wrong.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-4xl mx-auto py-10 px-6">

            <div className="bg-white rounded-2xl shadow-xl p-8">

                <button

                    onClick={() => navigate(-1)}

                    className="flex items-center gap-2 text-blue-600 mb-8"

                >

                    <ArrowLeft size={20} />

                    Back

                </button>

                <h1 className="text-3xl font-bold">

                    Apply for Job

                </h1>

                {job && (

                    <div className="mt-4 bg-blue-50 rounded-xl p-5">

                        <h2 className="text-xl font-bold">

                            {job.title}

                        </h2>

                        <p className="text-gray-600">

                            {job.employer_name}

                        </p>

                    </div>

                )}

                <form

                    onSubmit={handleSubmit}

                    className="space-y-8 mt-8"

                >

                    <div>

                        <label className="font-semibold">

                            Cover Letter

                        </label>

                        <textarea

                            rows="8"

                            name="cover_letter"

                            value={formData.cover_letter}

                            onChange={handleChange}

                            required

                            placeholder="Write your cover letter..."

                            className="w-full border rounded-xl p-4 mt-2"

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Resume

                        </label>

                        <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer mt-3">

                            <Upload
                                size={45}
                                className="text-blue-600"
                            />

                            <p className="mt-4">

                                Click to upload resume

                            </p>

                            <input

                                type="file"

                                accept=".pdf,.doc,.docx"

                                hidden

                                onChange={handleResume}

                            />

                        </label>

                        {

                            formData.resume && (

                                <div className="mt-3 flex items-center gap-2">

                                    <FileText />

                                    {formData.resume.name}

                                </div>

                            )

                        }

                    </div>

                    <button

                        disabled={loading}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"

                    >

                        <Send size={18} />

                        {

                            loading

                                ? "Submitting..."

                                : "Submit Application"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ApplyJob;