import { Link } from "react-router-dom";
import api from "../../api/axios";

import {
    Building2,
    MapPin,
    IndianRupee,
    Briefcase,
    BookmarkX,
    ArrowRight,
} from "lucide-react";

function SavedJobCard({

    savedJob,

    refreshSavedJobs,

}) {

    const { job } = savedJob;

    const removeSavedJob = async () => {

        const confirmDelete = window.confirm(
            "Remove this job from saved jobs?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(

                `/jobs/${job.id}/unsave/`

            );

            refreshSavedJobs();

        }

        catch (error) {

            console.error(error);

            alert("Unable to remove saved job.");

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6">

            {/* Header */}

            <div className="flex justify-between">

                <div>

                    <h2 className="text-2xl font-bold">

                        {job.title}

                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-gray-600">

                        <Building2 size={18} />

                        {job.employer_name}

                    </div>

                </div>

                <button

                    onClick={removeSavedJob}

                    className="text-red-500 hover:text-red-700"

                >

                    <BookmarkX size={28} />

                </button>

            </div>

            {/* Description */}

            <p className="mt-5 text-gray-600 line-clamp-3">

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

                    ₹{job.salary_min}

                    {" - "}

                    ₹{job.salary_max}

                </span>

            </div>

            {/* Employment Type */}

            <div className="flex items-center gap-2 mt-3">

                <Briefcase
                    size={18}
                    className="text-blue-600"
                />

                <span className="capitalize">

                    {job.employment_type.replace(
                        "_",
                        " "
                    )}

                </span>

            </div>

            {/* Saved Date */}

            <div className="mt-5 text-sm text-gray-500">

                Saved on

                {" "}

                {new Date(

                    savedJob.saved_at

                ).toLocaleDateString()}

            </div>

            {/* Buttons */}

            <div className="flex gap-3 mt-8">

                <Link

                    to={`/jobs/${job.id}`}

                    className="flex-1"

                >

                    <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50">

                        View Details

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

export default SavedJobCard;