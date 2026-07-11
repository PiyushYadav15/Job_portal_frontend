import {
    Eye,
    CheckCircle,
    XCircle,
    Download,
    CalendarDays,
    Mail,
    User,
} from "lucide-react";

import api from "../../api/axios";

function ApplicantTable({
    applicants = [],
    onStatusChange,
}) {

const updateStatus = async (id, action) => {

    try {

        await api.patch(
            `/employer/applications/${id}/${action}/`
        );

        onStatusChange();

    } catch (error) {

        console.error(error.response?.data);

        alert("Unable to update application.");

    }

};

    const badgeColor = (status) => {

        switch (status) {

            case "accepted":
                return "bg-green-100 text-green-700";

            case "reviewing":
                return "bg-yellow-100 text-yellow-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    if (applicants.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow p-10 text-center">

                <h2 className="text-2xl font-bold">

                    No Applicants Yet

                </h2>

                <p className="text-gray-500 mt-2">

                    Applications will appear here.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Applicant
                            </th>

                            <th className="px-6 py-4 text-left">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left">
                                Applied
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center">
                                Resume
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {applicants.map((applicant) => (

                            <tr
                                key={applicant.id}
                                className="border-t hover:bg-gray-50"
                            >

                                {/* Applicant */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                                            {applicant.applicant_name
                                                ?.charAt(0)
                                                ?.toUpperCase()}

                                        </div>

                                        <div>

                                            <p className="font-semibold flex items-center gap-2">

                                                <User size={16} />

                                                {applicant.applicant_name}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Email */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2">

                                        <Mail size={16} />

                                        {applicant.email}

                                    </div>

                                </td>

                                {/* Applied Date */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2">

                                        <CalendarDays size={16} />

                                        {new Date(
                                            applicant.applied_at
                                        ).toLocaleDateString()}

                                    </div>

                                </td>

                                {/* Status */}

                                <td className="px-6 py-5">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(
                                            applicant.status
                                        )}`}
                                    >

                                        {applicant.status}

                                    </span>

                                </td>

                                {/* Resume */}

                                <td className="px-6 py-5 text-center">

                                    <a
                                        href={applicant.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                                    >

                                        <Download size={16} />

                                        Resume

                                    </a>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    applicant.id,
                                                    "reviewing"
                                                )
                                            }
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                                            title="review"
                                        >

                                            <Eye size={18} />

                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    applicant.id,
                                                    "accept"
                                                )
                                            }
                                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                                            title="Accept"
                                        >

                                            <CheckCircle size={18} />

                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    applicant.id,
                                                    "reject"
                                                )
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                                            title="Reject"
                                        >

                                            <XCircle size={18} />

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

export default ApplicantTable;