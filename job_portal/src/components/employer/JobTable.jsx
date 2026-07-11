import {
    Pencil,
    Trash2,
    Eye,
    MapPin,
    CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";

function JobTable({
    jobs = [],
    onDelete,
}) {

    if (jobs.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
                <h2 className="text-2xl font-bold">
                    No Jobs Found
                </h2>

                <p className="text-gray-500 mt-2">
                    Create your first job posting.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    {/* Table Header */}

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Job
                            </th>

                            <th className="px-6 py-4 text-left">
                                Location
                            </th>

                            <th className="px-6 py-4 text-left">
                                Salary
                            </th>

                            <th className="px-6 py-4 text-left">
                                Applicants
                            </th>

                            <th className="px-6 py-4 text-left">
                                Posted
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    {/* Table Body */}

                    <tbody>

                        {jobs.map((job) => (

                            <tr
                                key={job.id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                {/* Job */}

                                <td className="px-6 py-5">

                                    <h3 className="font-bold">

                                        {job.title}

                                    </h3>

                                    <p className="text-gray-500 text-sm">

                                        {job.employment_type
                                            ?.replace("_", " ")
                                            .toUpperCase()}

                                    </p>

                                </td>

                                {/* Location */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2">

                                        <MapPin
                                            size={18}
                                            className="text-blue-600"
                                        />

                                        {job.location}

                                    </div>

                                </td>

                                {/* Salary */}

                                <td className="px-6 py-5">

                                    ₹{job.salary_min} - ₹{job.salary_max}

                                </td>

                                {/* Applicants */}

                                <td className="px-6 py-5">

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                                        {job.application_count ?? 0}

                                    </span>

                                </td>

                                {/* Date */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2">

                                        <CalendarDays
                                            size={18}
                                            className="text-gray-500"
                                        />

                                        {new Date(
                                            job.created_at
                                        ).toLocaleDateString()}

                                    </div>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-3">

                                        {/* Applicants */}

                                        <Link
                                            to={`/employer/jobs/${job.id}/applicants`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                                            title="View Applicants"
                                        >

                                            <Eye size={18} />

                                        </Link>

                                        {/* Edit */}

                                        <Link
                                            to={`/employer/jobs/${job.id}/edit`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                                            title="Edit Job"
                                        >

                                            <Pencil size={18} />

                                        </Link>

                                        {/* Delete */}

                                        <button
                                            onClick={() =>
                                                onDelete(job.id)
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                                            title="Delete Job"
                                        >

                                            <Trash2 size={18} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default JobTable;