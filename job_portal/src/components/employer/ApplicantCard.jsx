import {
    User,
    Mail,
    CalendarDays,
    Download,
    CheckCircle,
    XCircle,
    Eye,
} from "lucide-react";

import api from "../../api/axios";

function ApplicantCard({
    applicant,
    onStatusChange,
}) {

    const updateStatus = async (status) => {

        try {

            await api.patch(
                `/applications/${applicant.id}/`,
                {
                    status,
                }
            );

            if (onStatusChange) {

                onStatusChange();

            }

        } catch (error) {

            console.error(error);

            alert("Unable to update application.");

        }

    };

    const badgeColor = () => {

        switch (applicant.status) {

            case "accepted":
                return "bg-green-100 text-green-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            case "reviewing":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold flex items-center gap-2">

                        <User size={22} />

                        {applicant.applicant_name}

                    </h2>

                    <p className="flex items-center gap-2 mt-2 text-gray-600">

                        <Mail size={18} />

                        {applicant.email}

                    </p>

                </div>

                <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor()}`}
                >

                    {applicant.status}

                </span>

            </div>

            {/* Cover Letter */}

            <div className="mt-6">

                <h3 className="font-semibold mb-2">

                    Cover Letter

                </h3>

                <p className="text-gray-600 leading-7">

                    {applicant.cover_letter}

                </p>

            </div>

            {/* Footer */}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

                <div className="flex items-center gap-2 text-gray-500">

                    <CalendarDays size={18} />

                    {new Date(
                        applicant.applied_at
                    ).toLocaleDateString()}

                </div>

                <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >

                    <Download size={18} />

                    Resume

                </a>

            </div>

            {/* Actions */}

            <div className="mt-8 flex flex-wrap gap-3">

                <button
                    onClick={() =>
                        updateStatus("reviewing")
                    }
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >

                    <Eye size={18} />

                    Reviewing

                </button>

                <button
                    onClick={() =>
                        updateStatus("accepted")
                    }
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >

                    <CheckCircle size={18} />

                    Accept

                </button>

                <button
                    onClick={() =>
                        updateStatus("rejected")
                    }
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >

                    <XCircle size={18} />

                    Reject

                </button>

            </div>

        </div>

    );

}

export default ApplicantCard;