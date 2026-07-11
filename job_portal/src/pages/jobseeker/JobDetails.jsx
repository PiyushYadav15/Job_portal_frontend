import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

import {
    MapPin,
    Building2,
    IndianRupee,
    Briefcase,
    Calendar,
    Bookmark,
    BookmarkCheck,
    ArrowRight,
} from "lucide-react";

function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saved, setSaved] = useState(false);

    useEffect(() => {

        fetchJob();

    }, [id]);

    const fetchJob = async () => {

        try {

            const response = await api.get(
                `/jobs/${id}/`
            );

            setJob(response.data);

            setSaved(response.data.is_saved);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const saveJob = async () => {

        try {

            await api.post(
                `/jobs/${id}/save/`
            );

            setSaved(true);

        } catch (error) {

            console.error(error);

        }

    };

    const unsaveJob = async () => {

        try {

            await api.delete(
                `/jobs/${id}/unsave/`
            );

            setSaved(false);

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="h-screen flex justify-center items-center">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-5xl mx-auto py-10 px-6">

            <div className="bg-white rounded-2xl shadow-xl p-8">

                {/* Header */}

                <div className="flex justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            {job.title}

                        </h1>

                        <div className="flex items-center gap-2 mt-4 text-gray-600">

                            <Building2 size={18} />

                            {job.employer_name}

                        </div>

                    </div>

                    <button

                        onClick={() =>

                            saved

                                ? unsaveJob()

                                : saveJob()

                        }

                    >

                        {

                            saved ?

                                <BookmarkCheck
                                    size={28}
                                    className="text-blue-600"
                                />

                                :

                                <Bookmark size={28} />

                        }

                    </button>

                </div>

                {/* Job Information */}

                <div className="grid md:grid-cols-2 gap-6 mt-10">

                    <div className="flex items-center gap-3">

                        <MapPin className="text-red-500" />

                        <span>

                            {job.location}

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <Briefcase className="text-blue-500" />

                        <span className="capitalize">

                            {job.employment_type.replace(
                                "_",
                                " "
                            )}

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <IndianRupee className="text-green-600" />

                        <span>

                            ₹{job.salary_min}

                            {" - "}

                            ₹{job.salary_max}

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <Calendar className="text-purple-600" />

                        <span>

                            {new Date(
                                job.created_at
                            ).toLocaleDateString()}

                        </span>

                    </div>

                </div>

                {/* Description */}

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">

                        Job Description

                    </h2>

                    <div className="text-gray-700 leading-8 whitespace-pre-line">

                        {job.description}

                    </div>

                </div>

                {/* Footer */}

                <div className="flex gap-4 mt-12">

                    <button

                        onClick={() =>

                            navigate(`/jobs/${id}/apply`)

                        }

                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"

                    >

                        Apply Now

                        <ArrowRight size={18} />

                    </button>

                    <button

                        onClick={() => navigate(-1)}

                        className="border px-8 py-3 rounded-xl"

                    >

                        Back

                    </button>

                </div>

            </div>

        </div>

    );

}

export default JobDetails;