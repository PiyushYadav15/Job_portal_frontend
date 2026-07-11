import React from "react";
import { Link } from "react-router-dom";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Reviewed: "bg-blue-100 text-blue-700",
    Shortlisted: "bg-green-100 text-green-700",
    Interview: "bg-purple-100 text-purple-700",
    Rejected: "bg-red-100 text-red-700",
    Accepted: "bg-emerald-100 text-emerald-700",
};

function RecentApplicationCard({ application }) {

    if (!application) return null;

    return (

        <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 p-5">

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="text-lg font-bold text-gray-800">

                        {application.job_title}

                    </h3>

                    <p className="text-gray-500 mt-1">

                        🏢 {application.company_name}

                    </p>

                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[application.status] ||
                        "bg-gray-100 text-gray-700"
                    }`}
                >
                    {application.status}
                </span>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 text-sm text-gray-600">

                <div>

                    <p className="font-medium text-gray-800">

                        📍 Location

                    </p>

                    <p>

                        {application.location || "Not Available"}

                    </p>

                </div>

                <div>

                    <p className="font-medium text-gray-800">

                        💰 Salary

                    </p>

                    <p>

                        {application.salary || "Not Disclosed"}

                    </p>

                </div>

                <div>

                    <p className="font-medium text-gray-800">

                        📅 Applied On

                    </p>

                    <p>

                        {new Date(
                            application.applied_at
                        ).toLocaleDateString()}

                    </p>

                </div>

                <div>

                    <p className="font-medium text-gray-800">

                        🕒 Employment

                    </p>

                    <p>

                        {application.job_type || "Full Time"}

                    </p>

                </div>

            </div>

            <div className="flex justify-end mt-6">

                <Link
                    to={`/jobs/${application.job}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    View Job
                </Link>

            </div>

        </div>

    );

}

export default RecentApplicationCard;