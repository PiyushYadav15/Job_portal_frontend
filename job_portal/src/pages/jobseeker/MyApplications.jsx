import { useEffect, useState } from "react";
import api from "../../api/axios";
import ApplicationCard from "../../components/jobseeker/ApplicationCard";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    const [filteredApplications, setFilteredApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchApplications();

    }, []);

    useEffect(() => {

        if (search === "") {

            setFilteredApplications(applications);

            return;

        }

        const filtered = applications.filter((application) =>

            application.job_title
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            application.company_name
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            application.status
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredApplications(filtered);

    }, [search, applications]);

    const fetchApplications = async () => {

        try {

            const response = await api.get(
                "/my-applications/"
            );

            setApplications(response.data);

            setFilteredApplications(response.data);

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

                    Loading...

                </h1>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        My Applications

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Track all your job applications.

                    </p>

                </div>

                <input

                    type="text"

                    placeholder="Search..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                    className="border rounded-xl px-4 py-3 w-80"

                />

            </div>

            {

                filteredApplications.length === 0 ?

                    (

                        <div className="bg-white rounded-xl shadow p-10 text-center">

                            <h2 className="text-2xl font-semibold">

                                No Applications Found

                            </h2>

                        </div>

                    )

                    :

                    (

                        <div className="space-y-6">

                            {

                                filteredApplications.map((application) => (

                                    <ApplicationCard

                                        key={application.id}

                                        application={application}

                                        refreshApplications={fetchApplications}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default MyApplications;