import { useEffect, useState } from "react";
import api from "../../api/axios";
import SavedJobCard from "../../components/jobseeker/SavedJobCard";

function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchSavedJobs();

    }, []);

    useEffect(() => {

        if (search === "") {

            setFilteredJobs(savedJobs);

            return;

        }

        const filtered = savedJobs.filter((saved) =>

            saved.job.title
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            saved.job.employer_name
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            saved.job.location
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredJobs(filtered);

    }, [search, savedJobs]);

    const fetchSavedJobs = async () => {

        try {

            const response = await api.get(
                "/saved-jobs/"
            );

            setSavedJobs(response.data);

            setFilteredJobs(response.data);

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

                        Saved Jobs

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Your bookmarked jobs.

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

                filteredJobs.length === 0 ?

                    (

                        <div className="bg-white rounded-xl shadow p-10 text-center">

                            <h2 className="text-2xl font-semibold">

                                No Saved Jobs

                            </h2>

                        </div>

                    )

                    :

                    (

                        <div className="grid lg:grid-cols-2 gap-6">

                            {

                                filteredJobs.map((saved) => (

                                    <SavedJobCard

                                        key={saved.id}

                                        savedJob={saved}

                                        refreshSavedJobs={fetchSavedJobs}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default SavedJobs;