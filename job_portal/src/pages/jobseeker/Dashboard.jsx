import { useEffect, useState } from "react";
import api from "../../api/axios";

import DashboardCard from "../../components/jobseeker/DashboardCard";
import RecentApplicationCard from "../../components/jobseeker/RecentApplicationCard";
import SavedJobCard from "../../components/jobseeker/SavedJobCard";
import RecommendedJobCard from "../../components/jobseeker/RecommendedJobCard";

import {
    Briefcase,
    Bookmark,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    Star,
} from "lucide-react";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get(
                "/dashboard/jobseeker/"
            );

            setDashboard(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="h-screen flex justify-center items-center">

                <h1 className="text-2xl">

                    Loading Dashboard...

                </h1>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    Job Seeker Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Welcome back. Here's an overview of your job search.

                </p>

            </div>

            {/* Statistics */}

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                <DashboardCard
                    title="Applications"
                    value={dashboard.total_applications}
                    icon={Briefcase}
                    color="blue"
                />

                <DashboardCard
                    title="Saved Jobs"
                    value={dashboard.saved_jobs}
                    icon={Bookmark}
                    color="yellow"
                />

                <DashboardCard
                    title="Accepted"
                    value={dashboard.accepted}
                    icon={CheckCircle}
                    color="green"
                />

                <DashboardCard
                    title="Pending"
                    value={dashboard.pending}
                    icon={Clock}
                    color="purple"
                />

                <DashboardCard
                    title="Rejected"
                    value={dashboard.rejected}
                    icon={XCircle}
                    color="red"
                />

                <DashboardCard
                    title="Reviewing"
                    value={dashboard.reviewing}
                    icon={Eye}
                    color="indigo"
                />


            </div>

            {/* Content */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">

                {/* Recent Applications */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-5">

                        Recent Applications

                    </h2>

                    <div className="space-y-5">

                        {

                            dashboard.recent_applications.length ?

                                dashboard.recent_applications.map(

                                    (application) => (

                                        <RecentApplicationCard

                                            key={application.id}

                                            application={application}

                                        />

                                    )

                                )

                                :

                                <p>

                                    No applications yet.

                                </p>

                        }

                    </div>

                </div>

                {/* Saved Jobs */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-5">

                        Recently Saved Jobs

                    </h2>

                    <div className="space-y-5">

                        {

                            dashboard.saved_jobs_list.length ?

                                dashboard.saved_jobs_list.map(

                                    (saved) => (

                                        <SavedJobCard

                                            key={saved.id}

                                            savedJob={saved}

                                            refreshSavedJobs={fetchDashboard}

                                        />

                                    )

                                )

                                :

                                <p>

                                    No saved jobs.

                                </p>

                        }

                    </div>

                </div>

            </div>

            {/* Recommended Jobs */}

            <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                <h2 className="text-2xl font-bold mb-6">

                    Recommended Jobs

                </h2>

                <div className="grid lg:grid-cols-3 gap-6">

                    {

                        dashboard.recommended_jobs.map(

                            (job) => (

                                <RecommendedJobCard

                                    key={job.id}

                                    job={job}

                                />

                            )

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default Dashboard;