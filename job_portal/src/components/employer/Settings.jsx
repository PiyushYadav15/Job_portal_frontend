import { useEffect, useState } from "react";
import api from "../../api/axios";

import ProfileSettingsForm from "../../components/employer/ProfileSettingsForm";
import SecurityCard from "../../components/employer/SecurityCard";
import DeleteAccountCard from "../../components/employer/DeleteAccountCard";

function Settings() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const response = await api.get(
                "/accounts/profile/"
            );

            setProfile(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

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

        <div className="max-w-6xl mx-auto p-8">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Settings

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage your employer account.

                </p>

            </div>

            <div className="space-y-8">

                <ProfileSettingsForm
                    profile={profile}
                    onUpdated={fetchProfile}
                />

                <SecurityCard />

                <DeleteAccountCard />

            </div>

        </div>

    );

}

export default Settings;