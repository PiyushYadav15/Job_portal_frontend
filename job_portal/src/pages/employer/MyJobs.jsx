import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Plus,
    BriefcaseBusiness,
} from "lucide-react";

import api from "../../api/axios";

import JobTable from "../../components/employer/JobTable";
import DeleteModal from "../../components/employer/DeleteModal";

function MyJobs() {

    const [jobs, setJobs] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [selectedJob, setSelectedJob] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {

        fetchJobs();

    }, []);

    useEffect(() => {

        const filtered = jobs.filter((job) =>
            job.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredJobs(filtered);

    }, [search, jobs]);

    const fetchJobs = async () => {

        try {

            const response = await api.get("/jobs/");

            setJobs(response.data);

            setFilteredJobs(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const openDeleteModal = (id) => {

        setSelectedJob(id);

        setShowDeleteModal(true);

    };

    const deleteJob = async () => {

        try {

            await api.delete(`/jobs/${selectedJob}/`);

            setShowDeleteModal(false);

            fetchJobs();

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-8 px-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">

                <div>

                    <h1 className="text-4xl font-bold flex items-center gap-3">

                        <BriefcaseBusiness />

                        My Job Postings

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage all your published jobs.

                    </p>

                </div>

             

            </div>

            {/* Search */}

            <div className="relative mb-8">

                <Search
                    className="absolute left-4 top-3 text-gray-500"
                    size={20}
                />

                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />

            </div>

            {/* Jobs */}

            <JobTable
                jobs={filteredJobs}
                onDelete={openDeleteModal}
            />

            {/* Delete */}

            <DeleteModal
                isOpen={showDeleteModal}
                title="Delete Job"
                message="This job posting and all applications will be permanently deleted."
                onClose={() =>
                    setShowDeleteModal(false)
                }
                onConfirm={deleteJob}
            />

        </div>

    );

}

export default MyJobs;