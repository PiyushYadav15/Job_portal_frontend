import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, AlertTriangle } from "lucide-react";
import api from "../../api/axios";

function DeleteAccountCard() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        setLoading(true);

        try {

            await api.delete(
                "/accounts/delete-account/",
                {
                    data: {
                        password: password,
                    },
                }
            );

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            alert("Account deleted successfully.");

            navigate("/login");

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

                alert("Unable to delete account.");

            }

        } finally {

            setLoading(false);

            setShowModal(false);

        }

    };

    return (

        <>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">

                <div className="flex items-center gap-4">

                    <AlertTriangle
                        className="text-red-600"
                        size={35}
                    />

                    <div>

                        <h2 className="text-2xl font-bold text-red-600">

                            Delete Account

                        </h2>

                        <p className="text-gray-500 mt-1">

                            This action is permanent and cannot be undone.

                        </p>

                    </div>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >

                    <Trash2 size={18} />

                    Delete My Account

                </button>

            </div>

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                        <h2 className="text-2xl font-bold text-red-600">

                            Confirm Account Deletion

                        </h2>

                        <p className="mt-3 text-gray-600">

                            Enter your password to permanently delete your account.

                        </p>

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border rounded-xl p-3 mt-6"
                        />

                        <div className="flex justify-end gap-4 mt-8">

                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setPassword("");
                                }}
                                className="px-5 py-2 rounded-xl border"
                            >

                                Cancel

                            </button>

                            <button
                                disabled={loading}
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl disabled:opacity-60"
                            >

                                {loading
                                    ? "Deleting..."
                                    : "Delete"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}

export default DeleteAccountCard;