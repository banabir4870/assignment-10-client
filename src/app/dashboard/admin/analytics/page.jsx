"use client";

import { useEffect, useState } from "react";

import {
    Users,
    Briefcase,
    FileCheck,
    DollarSign,
    MessageSquare,
    Star,
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import {
    Card,
    Avatar,
    Spinner,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const COLORS = [
    "#006FEE",
    "#17C964",
    "#F5A524",
    "#F31260",
];

export default function AdminAnalytics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const {data: tokenData} = await authClient.token()
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/analytics`, {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${tokenData?.token}`
                    }
                }
                );

                const data = await res.json();

                if (data.success) {
                    setStats(data.analytics);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    console.log("stats:", stats)

    if (!stats) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Failed to load analytics.
            </div>
        );
    }

    const hiringData = [
        {
            name: "Pending",
            value: stats.pending,
        },
        {
            name: "Accepted",
            value: stats.accepted,
        },
        {
            name: "Rejected",
            value: stats.rejected,
        },
        {
            name: "Completed",
            value: stats.completed,
        },
    ];

    const userStats = [
        {
            name: "Clients",
            value: stats.totalUsers - stats.totalLawyers,
        },
        {
            name: "Lawyers",
            value: stats.totalLawyers,
        },
    ];

    return (
        <div className="p-6 space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold">
                    Analytics Dashboard
                </h1>

                <p className="text-default-500 mt-1">
                    Overall platform overview
                </p>

            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 text-black">

                <Card>

                    <div className="flex flex-row items-center gap-4">

                        <DollarSign
                            size={36}
                            className="text-success"
                        />

                        <div>

                            <p className="text-default-500 text-sm">
                                Total Revenue
                            </p>

                            <h2 className="text-2xl font-bold">
                                ${stats.totalRevenue}
                            </h2>

                        </div>

                    </div>

                </Card>

                <Card>

                    <div className="flex flex-row items-center gap-4 text-black">

                        <Users
                            size={36}
                            className="text-primary"
                        />

                        <div>

                            <p className="text-default-500 text-sm">
                                Total Users
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.totalUsers}
                            </h2>

                        </div>

                    </div>

                </Card>

                <Card>

                    <div className="flex flex-row items-center gap-4">

                        <Briefcase
                            size={36}
                            className="text-secondary"
                        />

                        <div>

                            <p className="text-default-500 text-sm">
                                Total Lawyers
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.totalLawyers}
                            </h2>

                        </div>

                    </div>

                </Card>

                <Card>

                    <div className="flex flex-row items-center gap-4">

                        <FileCheck
                            size={36}
                            className="text-warning"
                        />

                        <div>

                            <p className="text-default-500 text-sm">
                                Total Hirings
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.totalHirings}
                            </h2>

                        </div>

                    </div>

                </Card>

                <Card>

                    <div className="flex flex-row items-center gap-4">

                        <MessageSquare
                            size={36}
                            className="text-danger"
                        />

                        <div>

                            <p className="text-default-500 text-sm">
                                Total Comments
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.totalComments}
                            </h2>

                        </div>

                    </div>

                </Card>

            </div>

            {/* Charts Section Starts Here */}
            {/* Charts */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 text-black">

                {/* Hiring Status */}

                <Card>

                    <div className="p-5">

                        <h2 className="text-xl font-semibold mb-6">
                            Hiring Status
                        </h2>

                        <div className="h-[340px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={hiringData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={90}
                                        paddingAngle={3}
                                    >

                                        {hiringData.map((item, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
                                            />

                                        ))}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </Card>

                {/* User Distribution */}

                <Card>

                    <div className="p-5">

                        <h2 className="text-xl font-semibold mb-6">
                            User Distribution
                        </h2>

                        <div className="h-[340px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart data={userStats}>

                                    <XAxis
                                        dataKey="name"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        fill="#006FEE"
                                        radius={[8, 8, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </Card>

            </div>

            {/* Top Lawyers */}

            <div className="mt-6">

                <h2 className="text-xl font-semibold mb-4">
                    Top Rated Lawyers
                </h2>

                {!stats.topLawyers || stats.topLawyers.length === 0 ? (
                    <Card>
                        <div className="text-center py-10 text-default-500">
                            No top lawyers found.
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 text-black">

                        {stats.topLawyers.map((lawyer, index) => (
                            <Card
                                key={lawyer._id || index}
                                className="hover:scale-[1.02] transition-transform"
                            >

                                <div className="flex items-center gap-4 p-4">

                                    <Avatar size='lg'>
                                        <Avatar.Image referrerPolicy="no-referrer" alt={lawyer.fullName} src={lawyer.image} />
                                    </Avatar>

                                    <div className="flex flex-col">

                                        <h3 className="font-semibold text-lg text-black">
                                            {lawyer.fullName}
                                        </h3>


                                        <p className="text-sm text-default-500 text-black">
                                            {lawyer.specialization}
                                        </p>

                                        <p className="text-xs text-default-400 mt-1">
                                            ⭐ Rating: {lawyer.rating}
                                        </p>

                                        <p className="text-xs text-default-400 mt-1">
                                            💼 Total Hires: {lawyer.totalHires}
                                        </p>

                                    </div>

                                </div>

                            </Card>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}
