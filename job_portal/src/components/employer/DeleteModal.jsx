import { AlertTriangle, X } from "lucide-react";

function DeleteModal({
    isOpen,
    title = "Delete Item",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    onClose,
    onConfirm,
    loading = false,
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}

                <div className="flex items-center justify-between p-6 border-b">

                    <div className="flex items-center gap-3">

                        <div className="bg-red-100 p-3 rounded-full">

                            <AlertTriangle
                                className="text-red-600"
                                size={28}
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold">

                                {title}

                            </h2>

                            <p className="text-sm text-gray-500">

                                Please confirm your action

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="hover:bg-gray-100 p-2 rounded-lg transition"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <p className="text-gray-600 leading-7">

                        {message}

                    </p>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50"
                    >

                        {loading
                            ? "Deleting..."
                            : "Delete"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;