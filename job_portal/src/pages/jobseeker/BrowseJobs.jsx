import { useEffect, useState } from "react";
import api from "../../api/axios";
import JobCard from "../../components/jobseeker/JobCard";

function BrowseJobs() {

    const [jobs, setJobs] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchJobs();

    }, []);

    useEffect(() => {

        if (search === "") {

            setFilteredJobs(jobs);

            return;

        }

        const result = jobs.filter((job) =>

            job.title
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            job.location
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            job.employer_name
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredJobs(result);

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

    if (loading) {

        return (

            <div className="h-screen flex justify-center items-center">

                <h1 className="text-2xl">

                    Loading Jobs...

                </h1>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Browse Jobs

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Find your dream job.

                    </p>

                </div>

                <input

                    type="text"

                    placeholder="Search jobs..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                    className="border rounded-xl px-4 py-3 w-80"

                />

            </div>

            {

                filteredJobs.length === 0 ?

                    (

                        <div className="bg-white rounded-xl shadow p-10 text-center">

                            <h2 className="text-2xl font-semibold">

                                No Jobs Found

                            </h2>

                        </div>

                    )

                    :

                    (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {

                                filteredJobs.map((job) => (

                                    <JobCard

                                        key={job.id}

                                        job={job}

                                        refreshJobs={fetchJobs}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default BrowseJobs;