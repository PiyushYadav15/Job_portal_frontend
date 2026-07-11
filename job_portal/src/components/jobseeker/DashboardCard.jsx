import React from "react";

function DashboardCard({
    title,
    value,
    icon,
    color = "bg-blue-500",
    subtitle = "",
}) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="text-gray-400 mt-2 text-sm">

                            {subtitle}

                        </p>

                    )}

                </div>

                {/* <div
                    className={`${color} h-14 w-14 rounded-full flex items-center justify-center text-white text-2xl`}
                >
                    {icon}
                </div> */}

            </div>

        </div>
    );
}

export default DashboardCard;