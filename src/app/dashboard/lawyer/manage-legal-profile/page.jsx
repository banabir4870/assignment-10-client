export default function ManageLegalProfilePage() {
    return (
        <div className="space-y-8">

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">

                <h1 className="text-4xl font-bold">
                    Manage Legal Profile
                </h1>

                <p className="mt-2 text-gray-300">
                    Create and manage your professional lawyer profile.
                </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-3">

                {/* Form */}

                <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold text-[#1E293B]">
                        Profile Information
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <label className="mb-2 block font-medium text-[#1E293B]">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter full name"
                                className="w-full rounded-xl border p-3 outline-none focus:border-[#C9A65B]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-[#1E293B]">
                                Specialization
                            </label>

                            <select className="w-full rounded-xl border p-3 outline-none focus:border-[#C9A65B]">

                                <option>
                                    Corporate Law
                                </option>

                                <option>
                                    Family Law
                                </option>

                                <option>
                                    Criminal Law
                                </option>

                                <option>
                                    Property Law
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium text-[#1E293B]">
                                Consultation Fee
                            </label>

                            <input
                                type="number"
                                placeholder="500"
                                className="w-full rounded-xl border p-3 outline-none focus:border-[#C9A65B]"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium text-[#1E293B]">
                                Profile Image
                            </label>

                            <input
                                type="file"
                                className="w-full rounded-xl border p-3"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium text-[#1E293B]">
                                Professional Bio
                            </label>

                            <textarea
                                rows={6}
                                placeholder="Tell clients about yourself..."
                                className="w-full rounded-xl border p-3 outline-none focus:border-[#C9A65B]"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium text-[#1E293B]">
                                Availability
                            </label>

                            <select className="w-full rounded-xl border p-3">

                                <option>
                                    Available
                                </option>

                                <option>
                                    Busy
                                </option>

                            </select>

                        </div>

                        <div className="flex gap-4">

                            <button className="rounded-xl bg-[#C9A65B] px-8 py-3 text-white hover:bg-[#ab8635]">
                                Save Changes
                            </button>

                            <button className="rounded-xl border px-8 py-3 text-red-400 hover:bg-red-50">
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

                {/* Preview */}

                <div className="rounded-3xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold text-[#1E293B]">
                        Profile Preview
                    </h2>

                    <div className="text-center">

                        <img
                            src="https://i.pravatar.cc/200"
                            alt=""
                            className="mx-auto h-32 w-32 rounded-full object-cover"
                        />

                        <h3 className="mt-4 text-2xl font-bold">
                            Banabir Barua
                        </h3>

                        <p className="text-[#C9A65B]">
                            Corporate Lawyer
                        </p>

                        <p className="mt-3 text-gray-500">
                            Consultation Fee: ৳500
                        </p>

                        <span className="mt-4 inline-block rounded-full bg-green-100 px-4 py-1 text-green-700">
                            Available
                        </span>

                    </div>

                    <div className="mt-8 rounded-2xl bg-slate-50 p-4">

                        <h4 className="font-semibold text-[#1E293B]">
                            Publication Status
                        </h4>

                        <p className="mt-2 text-green-600">
                            ● Published
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}