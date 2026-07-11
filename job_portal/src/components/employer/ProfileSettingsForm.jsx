import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    User,
    Mail,
    Phone,
    Globe,
    MapPin,
    Building2,
    FileText,
    Save,
} from "lucide-react";

function ProfileSettingsForm({
    profile,
    onUpdated,
}) {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        company_name: "",
        website: "",
        location: "",
        bio: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (profile) {

            setFormData({

                first_name:
                    profile.first_name || "",

                last_name:
                    profile.last_name || "",

                username:
                    profile.username || "",

                email:
                    profile.email || "",

                phone:
                    profile.phone || "",

                company_name:
                    profile.company_name || "",

                website:
                    profile.website || "",

                location:
                    profile.location || "",

                bio:
                    profile.bio || "",

            });

        }

    }, [profile]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.put(
                "/accounts/profile/",
                formData
            );

            alert("Profile Updated Successfully");

            if (onUpdated) {

                onUpdated();

            }

        } catch (error) {

            console.error(error);

            alert("Unable to update profile.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-8">

                Profile Information

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div className="grid md:grid-cols-2 gap-6">

                    <Input
                        icon={<User size={18} />}
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<User size={18} />}
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<User size={18} />}
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<Mail size={18} />}
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<Phone size={18} />}
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<Building2 size={18} />}
                        label="Company"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<Globe size={18} />}
                        label="Website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<MapPin size={18} />}
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label className="font-semibold">

                        Bio

                    </label>

                    <div className="relative mt-2">

                        <FileText
                            size={18}
                            className="absolute left-3 top-4 text-gray-500"
                        />

                        <textarea
                            rows="5"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full border rounded-xl pl-10 p-3"
                        />

                    </div>

                </div>

                <button
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >

                    <Save size={18} />

                    {loading
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </form>

        </div>

    );

}

function Input({
    label,
    icon,
    ...props
}) {

    return (

        <div>

            <label className="font-semibold">

                {label}

            </label>

            <div className="relative mt-2">

                <div className="absolute left-3 top-3 text-gray-500">

                    {icon}

                </div>

                <input
                    {...props}
                    className="w-full border rounded-xl pl-10 p-3"
                />

            </div>

        </div>

    );

}

export default ProfileSettingsForm;