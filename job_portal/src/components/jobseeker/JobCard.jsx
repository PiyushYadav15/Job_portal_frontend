import { Link } from "react-router-dom";
import { MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";

function JobCard({ job }) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">

            {/* Header */}
            <div className="flex justify-between items-start">

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {job.title}
                    </h2>

                    <p className="text-gray-600 mt-1">
                        {job.company_name || job.employer_name}
                    </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {job.job_type || "Full Time"}
                </span>

            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-gray-600">

                <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{job.location || "Remote"}</span>
                </div>

                <div className="flex items-center gap-2">
                    <IndianRupee size={18} />
                    <span>
                        {job.salary || "Not Disclosed"}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Briefcase size={18} />
                    <span>
                        {job.experience || "Fresher"}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>
                        {job.created_at
                            ? new Date(job.created_at).toLocaleDateString()
                            : "Recently Posted"}
                    </span>
                </div>

            </div>

            {/* Description */}
            <p className="text-gray-700 mt-6 line-clamp-3">
                {job.description}
            </p>

            {/* Skills */}
            {job.skills && (
                <div className="flex flex-wrap gap-2 mt-5">
                    {Array.isArray(job.skills)
                        ? job.skills.map((skill, index) => (
                              <span
                                  key={index}
                                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                              >
                                  {skill}
                              </span>
                          ))
                        : (
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {job.skills}
                            </span>
                        )}
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-end mt-8">

                <Link
                    to={`/jobs/${job.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}

export default JobCard;