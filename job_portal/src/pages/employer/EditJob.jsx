import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import api from "../../api/axios";
import JobForm from "../../components/employer/JobForm";

function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const response = await api.get(
                `/jobs/${id}/`
            );

            setJob(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load job.");

        } finally {

            setLoading(false);

        }

    };

    const handleSuccess = () => {

        navigate("/employer/my-jobs");

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <Loader2
                    className="animate-spin"
                    size={45}
                />

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto py-8 px-6">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Edit Job

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Update your job posting.

                    </p>

                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl"
                >

                    <ArrowLeft size={20} />

                    Back

                </button>

            </div>

            {/* Form */}

            <JobForm
                initialData={job}
                onSuccess={handleSuccess}
            />

        </div>

    );

}

export default EditJob;