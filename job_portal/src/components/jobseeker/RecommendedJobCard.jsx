import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

import {
    Building2,
    MapPin,
    IndianRupee,
    Briefcase,
    Bookmark,
    BookmarkCheck,
    ArrowRight,
} from "lucide-react";

function RecommendedJobCard({ job }) {

    const [saved, setSaved] = useState(job.is_saved);

    const [loading, setLoading] = useState(false);

    const saveJob = async () => {

        setLoading(true);

        try {

            await api.post(`/jobs/${job.id}/save/`);

            setSaved(true);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const unsaveJob = async () => {

        setLoading(true);

        try {

            await api.delete(`/jobs/${job.id}/unsave/`);

            setSaved(false);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white border rounded-2xl p-6 hover:shadow-lg transition duration-300">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold">

                        {job.title}

                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-gray-600">

                        <Building2 size={18} />

                        {job.employer_name}

                    </div>

                </div>

                <button

                    disabled={loading}

                    onClick={() =>

                        saved

                            ? unsaveJob()

                            : saveJob()

                    }

                >

                    {

                        saved ?

                            <BookmarkCheck
                                className="text-blue-600"
                            />

                            :

                            <Bookmark />

                    }

                </button>

            </div>

            {/* Description */}

            <p className="text-gray-600 mt-5 line-clamp-3">

                {job.description}

            </p>

            {/* Location */}

            <div className="flex items-center gap-2 mt-5">

                <MapPin
                    size={18}
                    className="text-red-500"
                />

                <span>

                    {job.location}

                </span>

            </div>

            {/* Salary */}

            <div className="flex items-center gap-2 mt-3">

                <IndianRupee
                    size={18}
                    className="text-green-600"
                />

                <span>

                    ₹{job.salary_min} - ₹{job.salary_max}

                </span>

            </div>

            {/* Employment Type */}

            <div className="flex items-center gap-2 mt-3">

                <Briefcase
                    size={18}
                    className="text-purple-600"
                />

                <span className="capitalize">

                    {job.employment_type.replace("_", " ")}

                </span>

            </div>

            {/* Footer */}

            <div className="flex gap-3 mt-8">

                <Link

                    to={`/jobs/${job.id}`}

                    className="flex-1"

                >

                    <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50">

                        Details

                    </button>

                </Link>

                <Link

                    to={`/jobs/${job.id}/apply`}

                    className="flex-1"

                >

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                        Apply

                        <ArrowRight size={18} />

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default RecommendedJobCard;