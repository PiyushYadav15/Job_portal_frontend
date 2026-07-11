import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    Search,
    Users,
} from "lucide-react";

import api from "../../api/axios";

import ApplicantTable from "../../components/employer/ApplicantTable";

function Applicants() {

    const { id } = useParams();

    const [applications, setApplications] = useState([]);

    const [filteredApplications, setFilteredApplications] = useState([]);

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {

        fetchApplicants();

    }, []);

    useEffect(() => {

        filterApplicants();

    }, [search, statusFilter, applications]);

    const fetchApplicants = async () => {

        try {

            const jobResponse = await api.get(`/jobs/${id}/`);

            setJob(jobResponse.data);

            const applicationResponse = await api.get(
               `/employer/jobs/${id}/applications/`
                );
            setApplications(applicationResponse.data);

            setFilteredApplications(applicationResponse.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const filterApplicants = () => {

        let data = [...applications];

        if (search) {

            data = data.filter((applicant) =>

             applicant.applicant
                      ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        if (statusFilter !== "all") {

            data = data.filter(

                (applicant) =>
                    applicant.status === statusFilter

            );

        }

        setFilteredApplications(data);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold flex items-center gap-3">

                        <Users />

                        Applicants

                    </h1>

                    <p className="text-gray-500 mt-2">

                        {job?.title}

                    </p>

                </div>

                <Link
                    to="/employer/jobs"
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl"
                >

                    <ArrowLeft size={20} />

                    Back

                </Link>

            </div>

            {/* Filters */}

            <div className="grid md:grid-cols-2 gap-5 mb-8">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search applicant..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full border rounded-xl pl-11 pr-4 py-3"
                    />

                </div>

                {/* Status */}

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="border rounded-xl px-4 py-3"
                >

                    <option value="all">

                        All Applications

                    </option>

                    <option value="pending">

                        Pending

                    </option>

                    <option value="reviewing">

                        Reviewing

                    </option>

                    <option value="accepted">

                        Accepted

                    </option>

                    <option value="rejected">

                        Rejected

                    </option>

                </select>

            </div>

            {/* Applicant Table */}

            <ApplicantTable
                applicants={filteredApplications}
                onStatusChange={fetchApplicants}
            />

        </div>

    );

}

export default Applicants;