import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import JobForm from "../../components/employer/JobForm";

function CreateJob() {

    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/employer/my-jobs");
    };

    return (

        <div className="max-w-6xl mx-auto py-8 px-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Post New Job

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Fill in the details below to publish a new job opening.

                    </p>

                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl transition"
                >

                    <ArrowLeft size={20} />

                    Back

                </button>

            </div>

            {/* Form */}

            <JobForm
                onSuccess={handleSuccess}
            />

        </div>

    );

}

export default CreateJob;