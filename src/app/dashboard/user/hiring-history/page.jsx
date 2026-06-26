"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function UserHiringHistory() {
    const { data: session } = useSession();

    const [hirings, setHirings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            if (!session?.user?.id) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/user/${session.user.id}`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                if (data.success) {
                    setHirings(data.hirings);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [session]);

    const filtered = useMemo(() => {
        return hirings.filter((item) =>
            item.lawyerName
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [hirings, search]);

    const pending = hirings.filter(
        (item) => item.status === "pending"
    ).length;

    const accepted = hirings.filter(
        (item) => item.status === "accepted"
    ).length;

    const completed = hirings.filter(
        (item) => item.paymentStatus === "paid"
    ).length;

    const handlePayment = async (hire) => {
    //     try {
    //         const res = await fetch(
    //             `${process.env.NEXT_PUBLIC_SERVER_URL}/create-checkout-session`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     hireId: hire._id,
    //                 }),
    //             }
    //         );

    //         const data = await res.json();

    //         if (data.url) {
    //             window.location.href = data.url;
    //         } else {
    //             alert(data.message || "Unable to start payment.");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    };

    if (loading) {
        return (
            <div className="space-y-8">

                <div className="h-40 rounded-3xl bg-gray-200 animate-pulse"></div>

                <div className="grid md:grid-cols-3 gap-5">

                    <div className="h-28 rounded-2xl bg-gray-200 animate-pulse"></div>

                    <div className="h-28 rounded-2xl bg-gray-200 animate-pulse"></div>

                    <div className="h-28 rounded-2xl bg-gray-200 animate-pulse"></div>

                </div>

                <div className="h-96 rounded-3xl bg-gray-200 animate-pulse"></div>

            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">

                <h1 className="text-4xl font-bold">
                    Hiring History
                </h1>

                <p className="mt-2 text-gray-300">
                    Track all your lawyer hiring requests and payments.
                </p>

            </div>

            {/* Stats */}

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
                        Completed
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-blue-600">
                        {completed}
                    </h2>

                </div>

            </div>

            {/* Table */}

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <h2 className="text-2xl font-bold text-[#1E293B]">
                        My Hiring Requests
                    </h2>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search lawyer..."
                        className="rounded-xl border px-4 py-2 outline-none focus:border-primary"
                    />

                </div>

                {filtered.length === 0 ? (

                    <div className="py-20 text-center">

                        <h2 className="text-3xl font-bold text-black">
                            No Hiring Requests
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Hire a lawyer to get started.
                        </p>

                        <Link
                            href="/lawyers"
                            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-black"
                        >
                            Browse Lawyers
                        </Link>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="py-4 text-left text-black">
                                        Lawyer
                                    </th>

                                    <th className="py-4 text-left text-black">
                                        Fee
                                    </th>

                                    <th className="py-4 text-left text-black">
                                        Request
                                    </th>

                                    <th className="py-4 text-left text-black">
                                        Payment
                                    </th>

                                    <th className="py-4 text-left text-black">
                                        Date
                                    </th>

                                    <th className="py-4 text-left text-black">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filtered.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border-b"
                                    >

                                        <td className="py-5 font-medium text-black">
                                            {item.lawyerName}
                                        </td>

                                        <td className="text-black">
                                            ${item.lawyerFee}
                                        </td>

                                        <td>

                                            {item.status === "pending" && (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                    Pending
                                                </span>
                                            )}

                                            {item.status === "accepted" && (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                    Accepted
                                                </span>
                                            )}

                                            {item.status === "rejected" && (
                                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                                                    Rejected
                                                </span>
                                            )}

                                        </td>

                                        <td>

                                            {item.paymentStatus === "paid" ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                                                    Unpaid
                                                </span>
                                            )}

                                        </td>

                                        <td className="text-black">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>

                                            {item.status === "pending" && (
                                                <span className="text-yellow-600 font-medium">
                                                    Waiting...
                                                </span>
                                            )}

                                            {item.status === "rejected" && (
                                                <span className="text-red-600 font-medium">
                                                    Request Rejected
                                                </span>
                                            )}

                                            {item.status === "accepted" &&
                                                item.paymentStatus ===
                                                    "unpaid" && (
                                                    <Button
                                                        color="primary"
                                                        onClick={() =>
                                                            handlePayment(item)
                                                        }
                                                    >
                                                        Pay Now
                                                    </Button>
                                                )}

                                            {item.status === "accepted" &&
                                                item.paymentStatus ===
                                                    "paid" && (
                                                    <span className="font-semibold text-green-600">
                                                        Payment Completed
                                                    </span>
                                                )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}