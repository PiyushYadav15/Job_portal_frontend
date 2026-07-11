import { useState } from "react";
import api from "../../api/axios";

import {
    Building2,
    MapPin,
    Calendar,
    FileText,
    Trash2,
    Download,
} from "lucide-react";

function ApplicationCard({

    application,

    refreshApplications,

}) {

    const [loading, setLoading] = useState(false);

    const withdrawApplication = async () => {

        const confirmWithdraw = window.confirm(
            "Are you sure you want to withdraw this application?"
        );

        if (!confirmWithdraw) return;

        setLoading(true);

        try {

            await api.delete(
                `/applications/${application.id}/withdraw/`
            );

            alert("Application withdrawn successfully.");

            refreshApplications();

        }

        catch (error) {

            console.error(error);

            alert("Unable to withdraw application.");

        }

        finally {

            setLoading(false);

        }

    };

    const statusColor = () => {

        switch (application.status) {

            case "accepted":

                return "bg-green-100 text-green-700";

            case "rejected":

                return "bg-red-100 text-red-700";

            case "reviewing":

                return "bg-blue-100 text-blue-700";

            case "shortlisted":

                return "bg-purple-100 text-purple-700";

            default:

                return "bg-yellow-100 text-yellow-700";

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold">

                        {application.job_title}

                    </h2>

                    <div className="flex items-center gap-2 mt-3 text-gray-600">

                        <Building2 size={18} />

                        {application.company_name}

                    </div>

                    <div className="flex items-center gap-2 mt-2 text-gray-600">

                        <MapPin size={18} />

                        {application.location}

                    </div>

                    <div className="flex items-center gap-2 mt-2 text-gray-600">

                        <Calendar size={18} />

                        {new Date(
                            application.applied_at
                        ).toLocaleDateString()}

                    </div>

                </div>

                <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${statusColor()}`}
                >

                    {application.status}

                </span>

            </div>

            <div className="mt-6">

                <h3 className="font-semibold mb-2">

                    Cover Letter

                </h3>

                <p className="text-gray-600 whitespace-pre-line">

                    {application.cover_letter}

                </p>

            </div>

            {

                application.resume && (

                    <div className="mt-6">

                        <a

                            href={application.resume}

                            target="_blank"

                            rel="noreferrer"

                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"

                        >

                            <Download size={18} />

                            Download Resume

                        </a>

                    </div>

                )

            }

            <div className="flex justify-end mt-8">

                <button

                    disabled={loading}

                    onClick={withdrawApplication}

                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                >

                    <Trash2 size={18} />

                    {

                        loading

                            ? "Withdrawing..."

                            : "Withdraw"

                    }

                </button>

            </div>

        </div>

    );

}

export default ApplicationCard;