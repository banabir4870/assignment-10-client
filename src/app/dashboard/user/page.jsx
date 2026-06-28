"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
    BriefcaseBusiness,
    CircleCheckBig,
    Clock3,
    FileText,
    Scale,
    Search,
    ShieldCheck,
} from "lucide-react";

export default function UserHomePage() {
    const { data: session } = useSession();

    const [hirings, setHirings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.id) return;

        const fetchHirings = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/user/${session.user.id}`
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

        fetchHirings();
    }, [session]);

    const totalRequests = hirings.length;

    const pending = hirings.filter(
        (item) => item.status === "pending"
    ).length;

    const accepted = hirings.filter(
        (item) => item.status === "accepted"
    ).length;

    const completed = hirings.filter(
        (item) => item.status === "completed"
    ).length;

    return (
        <div className="space-y-8">

            {/* Welcome Banner */}

            <div className="rounded-3xl bg-linear-to-r  from-amber-400 to-primary p-8 text-black">

                <h1 className="text-4xl font-bold">
                    Welcome Back, {session?.user?.name} 👋
                </h1>

                <p className="mt-3 max-w-2xl text-lg">
                    Manage your legal services, track hiring requests and
                    connect with experienced lawyers from one dashboard.
                </p>

            </div>

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">
                                Total Requests
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-slate-800">
                                {loading ? "..." : totalRequests}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-blue-100 p-4">
                            <FileText className="text-blue-600" />
                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">
                                Pending
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-yellow-500">
                                {loading ? "..." : pending}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-yellow-100 p-4">
                            <Clock3 className="text-yellow-600" />
                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">
                                Accepted
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-green-600">
                                {loading ? "..." : accepted}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-green-100 p-4">
                            <Scale className="text-green-600" />
                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">
                                Completed
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-indigo-600">
                                {loading ? "..." : completed}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-indigo-100 p-4">
                            <CircleCheckBig className="text-indigo-600" />
                        </div>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="grid gap-6 lg:grid-cols-3">

                <Link
                    href="/lawyers"
                    className="rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
                >

                    <Search
                        className="mb-5 text-black"
                        size={40}
                    />

                    <h3 className="text-2xl font-bold text-slate-800">
                        Browse Lawyers
                    </h3>

                    <p className="mt-3 text-gray-500 leading-7">
                        Explore experienced lawyers across different legal fields and
                        choose the right expert for your legal needs.
                    </p>

                </Link>

                <Link
                    href="/dashboard/user/hiring-history"
                    className="rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
                >

                    <BriefcaseBusiness
                        className="mb-5 text-black"
                        size={40}
                    />

                    <h3 className="text-2xl font-bold text-slate-800">
                        Hiring History
                    </h3>

                    <p className="mt-3 text-gray-500 leading-7">
                        View all your hiring requests, payment status and completed
                        legal services from one place.
                    </p>

                </Link>

                <Link
                    href="/dashboard/user/update-profile"
                    className="rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
                >

                    <FileText
                        className="mb-5 text-black"
                        size={40}
                    />

                    <h3 className="text-2xl font-bold text-slate-800">
                        Update Profile
                    </h3>

                    <p className="mt-3 text-gray-500 leading-7">
                        Keep your personal information up to date so lawyers can
                        communicate with you more effectively during legal services.
                    </p>

                </Link>

            </div>

            {/* Legal Tips */}

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        size={28}
                        className="text-primary"
                    />

                    <h2 className="text-2xl font-bold">
                        Legal Tip
                    </h2>

                </div>

                <p className="mt-5 leading-8 text-gray-300">
                    Before hiring a lawyer, review their specialization,
                    consultation fee, availability and previous client
                    ratings to make the best decision for your legal
                    matter.
                </p>

            </div>

        </div>
    );
}