import {
    MapPin,
    CalendarDays,
    IndianRupee,
    Users,
    Pencil,
    Trash2,
    Eye,
    BriefcaseBusiness,
} from "lucide-react";

import { Link } from "react-router-dom";

function EmployerJobCard({
    job,
    onDelete,
}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">

            {/* Header */}

            <div className="p-6 border-b">

                <div className="flex justify-between items-start">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="bg-blue-100 p-3 rounded-xl">

                                <BriefcaseBusiness
                                    className="text-blue-600"
                                    size={28}
                                />

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">

                                    {job.title}

                                </h2>

                                <p className="text-gray-500">

                                    {job.employment_type
                                        ?.replace("_", " ")
                                        .toUpperCase()}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Body */}

            <div className="p-6">

                <div className="grid md:grid-cols-2 gap-5">

                    <div className="flex items-center gap-3">

                        <MapPin
                            className="text-blue-600"
                            size={20}
                        />

                        <span>{job.location}</span>

                    </div>

                    <div className="flex items-center gap-3">

                        <IndianRupee
                            className="text-green-600"
                            size={20}
                        />

                        <span>

                            ₹{job.salary_min} - ₹{job.salary_max}

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            className="text-purple-600"
                            size={20}
                        />

                        <span>

                            {new Date(
                                job.created_at
                            ).toLocaleDateString()}

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <Users
                            className="text-orange-500"
                            size={20}
                        />

                        <span>

                            {job.application_count ?? 0} Applicants

                        </span>

                    </div>

                </div>

                {/* Description */}

                <div className="mt-6">

                    <p className="text-gray-600 line-clamp-3">

                        {job.description}

                    </p>

                </div>

            </div>

            {/* Footer */}

            <div className="border-t p-5 flex flex-wrap gap-3">

                <Link
                    to={`/employer/jobs/${job.id}/applicants`}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >

                    <Eye size={18} />

                    View Applicants

                </Link>

                <Link
                    to={`/employer/jobs/${job.id}/edit`}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
                >

                    <Pencil size={18} />

                    Edit

                </Link>

                <button
                    onClick={() => onDelete(job.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >

                    <Trash2 size={18} />

                    Delete

                </button>

            </div>

        </div>
    );
}

export default EmployerJobCard;