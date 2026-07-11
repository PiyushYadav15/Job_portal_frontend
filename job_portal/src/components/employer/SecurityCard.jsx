import { useState } from "react";
import api from "../../api/axios";
import {
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
} from "lucide-react";

function SecurityCard() {

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post(
                "/accounts/change-password/",
                formData
            );

            alert("Password changed successfully.");

            setFormData({

                current_password: "",

                new_password: "",

                confirm_password: "",

            });

        } catch (error) {

            console.error(error);

            if (error.response?.data) {

                const message = Object.values(
                    error.response.data
                )
                    .flat()
                    .join("\n");

                alert(message);

            } else {

                alert("Unable to change password.");

            }

        } finally {

            setLoading(false);

        }

    };

    const PasswordField = ({
        label,
        name,
        value,
        show,
        setShow,
    }) => (

        <div>

            <label className="block font-semibold mb-2">

                {label}

            </label>

            <div className="relative">

                <Lock
                    size={18}
                    className="absolute left-3 top-4 text-gray-500"
                />

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl pl-10 pr-12 py-3"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-3"
                >

                    {show ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}

                </button>

            </div>

        </div>

    );

    return (

        <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="flex items-center gap-3 mb-8">

                <ShieldCheck
                    className="text-green-600"
                    size={32}
                />

                <div>

                    <h2 className="text-2xl font-bold">

                        Security

                    </h2>

                    <p className="text-gray-500">

                        Change your account password.

                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <PasswordField
                    label="Current Password"
                    name="current_password"
                    value={formData.current_password}
                    show={showCurrent}
                    setShow={setShowCurrent}
                />

                <PasswordField
                    label="New Password"
                    name="new_password"
                    value={formData.new_password}
                    show={showNew}
                    setShow={setShowNew}
                />

                <PasswordField
                    label="Confirm Password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    show={showConfirm}
                    setShow={setShowConfirm}
                />

                <button
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-60"
                >

                    {loading
                        ? "Updating..."
                        : "Update Password"}

                </button>

            </form>

        </div>

    );

}

export default SecurityCard;