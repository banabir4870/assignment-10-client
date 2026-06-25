"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function HiringHistoryPage() {
    const { data: session } = useSession();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            if (!session?.user?.id) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/lawyer/${session.user.id}`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                if (data.success) {
                    setRequests(data.hirings);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [session]);

    const handleAccept = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/${id}/accept`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();

            if (data.success) {
                setRequests((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? { ...item, status: "accepted" }
                            : item
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/${id}/reject`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();

            if (data.success) {
                setRequests((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? { ...item, status: "rejected" }
                            : item
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filteredRequests = useMemo(() => {
        return requests.filter((request) =>
            request.userName
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [requests, search]);

    const pending = requests.filter(
        (r) => r.status === "pending"
    ).length;

    const accepted = requests.filter(
        (r) => r.status === "accepted"
    ).length;

    const rejected = requests.filter(
        (r) => r.status === "rejected"
    ).length;

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-40 rounded-3xl bg-gray-200 animate-pulse"></div>

                <div className="grid md:grid-cols-3 gap-5">
                    <div className="h-32 rounded-2xl bg-gray-200 animate-pulse"></div>
                    <div className="h-32 rounded-2xl bg-gray-200 animate-pulse"></div>
                    <div className="h-32 rounded-2xl bg-gray-200 animate-pulse"></div>
                </div>

                <div className="h-96 rounded-3xl bg-gray-200 animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">
                <h1 className="text-4xl font-bold">
                    Hiring Requests
                </h1>

                <p className="mt-2 text-gray-300">
                    Manage client hiring requests.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-gray-500">
                        Pending
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-yellow-500">
                        {pending}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-gray-500">
                        Accepted
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-green-600">
                        {accepted}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-gray-500">
                        Rejected
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-red-500">
                        {rejected}
                    </h2>
                </div>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:justify-between">

                    <h2 className="text-2xl font-bold text-[#1E293B]">
                        Recent Requests
                    </h2>

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search client..."
                        className="rounded-xl border px-4 py-2 text-[#1E293B] outline-none focus:border-[#C9A65B]"
                    />

                </div>

                {filteredRequests.length === 0 ? (
                    <div className="py-16 text-center">
                        <h3 className="text-2xl font-bold text-[#1E293B]">
                            No Hiring Requests Found
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Requests will appear here when
                            clients hire you.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="py-4 text-left text-[#1E293B]">
                                        Client
                                    </th>

                                    <th className="py-4 text-left text-[#1E293B]">
                                        Date
                                    </th>

                                    <th className="py-4 text-left text-[#1E293B]">
                                        Fee
                                    </th>

                                    <th className="py-4 text-left text-[#1E293B]">
                                        Status
                                    </th>

                                    <th className="py-4 text-left text-[#1E293B]">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredRequests.map(
                                    (request) => (
                                        <tr
                                            key={request._id}
                                            className="border-b"
                                        >
                                            <td className="py-5 text-[#1E293B] font-medium">
                                                {
                                                    request.userName
                                                }
                                            </td>

                                            <td className="text-[#1E293B]">
                                                {new Date(
                                                    request.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="text-[#1E293B] font-semibold">
                                                $
                                                {
                                                    request.lawyerFee
                                                }
                                            </td>

                                            <td>
                                                {request.status ===
                                                    "pending" && (
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                        Pending
                                                    </span>
                                                )}

                                                {request.status ===
                                                    "accepted" && (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                        Accepted
                                                    </span>
                                                )}

                                                {request.status ===
                                                    "rejected" && (
                                                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                                                        Rejected
                                                    </span>
                                                )}
                                            </td>

                                            <td>
                                                {request.status ===
                                                "pending" ? (
                                                    <div className="flex gap-2">

                                                        <button
                                                            onClick={() =>
                                                                handleAccept(
                                                                    request._id
                                                                )
                                                            }
                                                            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                                        >
                                                            Accept
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleReject(
                                                                    request._id
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                                        >
                                                            Reject
                                                        </button>

                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Completed
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}
            </div>

        </div>
    );
}