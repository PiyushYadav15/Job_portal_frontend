import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BriefcaseBusiness,
    Users,
    Clock3,
    CheckCircle,
    Plus,
} from "lucide-react";

import api from "../../api/axios";

import DashboardCard from "../../components/employer/DashboardCard";
import EmployerJobCard from "../../components/employer/EmployerJobCard";
import DeleteModal from "../../components/employer/DeleteModal";

function Dashboard() {

    const [stats, setStats] = useState({
        total_jobs: 0,
        total_applications: 0,
        pending: 0,
        accepted: 0,
    });

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

           const dashboard = await api.get("/employer/dashboard/");

            setStats(dashboard.data);

            const jobsResponse = await api.get("/employer/jobs/");

            setJobs(jobsResponse.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const openDelete = (id) => {

        setSelectedJob(id);

        setDeleteModal(true);

    };

    const deleteJob = async () => {

        try {

            await api.delete(`/employer/jobs/${selectedJob}/`);

            setDeleteModal(false);

            fetchDashboard();

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Employer Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage jobs and applicants

                    </p>

                </div>

               

            </div>

            {/* Statistics */}

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                <DashboardCard
                    title="Jobs"
                    value={stats.total_jobs}
                    subtitle="Total Jobs"
                    icon={BriefcaseBusiness}
                    color="from-blue-600 to-cyan-500"
                />

                <DashboardCard
                    title="Applications"
                    value={stats.total_applications}
                    subtitle="Applications"
                    icon={Users}
                    color="from-purple-600 to-pink-500"
                />

                <DashboardCard
                    title="Pending"
                    value={stats.pending}
                    subtitle="Need Review"
                    icon={Clock3}
                    color="from-orange-500 to-red-500"
                />

                <DashboardCard
                    title="Accepted"
                    value={stats.accepted}
                    subtitle="Candidates"
                    icon={CheckCircle}
                    color="from-green-500 to-emerald-600"
                />

            </div>

            {/* Recent Jobs */}

            <div>

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        Recent Job Postings

                    </h2>


                </div>

                <div className="space-y-6">

                    {jobs.length > 0 ? (

                        jobs.slice(0, 5).map((job) => (

                            <EmployerJobCard
                                key={job.id}
                                job={job}
                                onDelete={openDelete}
                            />

                        ))

                    ) : (

                        <div className="bg-white rounded-xl shadow p-10 text-center">

                            <h2 className="text-2xl font-bold">

                                No Jobs Posted

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Click "Post Job" to publish your first job.

                            </p>

                        </div>

                    )}

                </div>

            </div>

            {/* Delete Modal */}

            <DeleteModal
                isOpen={deleteModal}
                title="Delete Job"
                message="This job and all its applications will be permanently deleted."
                onClose={() => setDeleteModal(false)}
                onConfirm={deleteJob}
            />

        </div>

    );

}

export default Dashboard;