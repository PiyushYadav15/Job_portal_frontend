import { ArrowUpRight } from "lucide-react";

function DashboardCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "from-blue-600 to-indigo-600",
}) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                ${color}
                text-white
                shadow-xl
                p-6
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
            `}
        >
            {/* Background Circle */}

            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/10"></div>

            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/5"></div>

            <div className="relative flex justify-between items-start">

                <div>

                    <p className="text-sm uppercase tracking-widest text-white/80">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-3">

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="mt-3 text-white/90">

                            {subtitle}

                        </p>

                    )}

                </div>

                <div className="bg-white/20 p-4 rounded-xl">

                    {Icon && <Icon size={34} />}

                </div>

            </div>

            <div className="mt-8 flex items-center gap-2 text-sm">

                <ArrowUpRight size={18} />

                <span>

                    Updated just now

                </span>

            </div>

        </div>
    );
}

export default DashboardCard;