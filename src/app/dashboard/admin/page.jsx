"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Users,
    Briefcase,
    DollarSign,
    FileCheck,
    Clock,
    CheckCircle,
    XCircle,
    MessageSquare,
    BarChart2,
    Settings,
    CreditCard,
    Shield,
    Star,
    TrendingUp,
} from "lucide-react";
import { Spinner } from "@heroui/react";

export default function AdminHomePage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/analytics`
                );
                const data = await res.json();
                if (data.success) setStats(data.analytics);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-primary to-amber-400 p-8 text-black">
                <div className="flex items-center gap-3 mb-3">
                    <Shield size={32} className="text-black/70" />
                    <span className="text-sm font-semibold uppercase tracking-widest opacity-70">
                        Admin Panel
                    </span>
                </div>
                <h1 className="text-4xl font-bold">Welcome, Admin 👋</h1>
                <p className="mt-3 max-w-2xl text-lg opacity-80">
                    Monitor your platform, manage users, track lawyer subscriptions,
                    review hiring activity, and analyze LegalEase performance from one place.
                </p>
            </div>

            {/* Live Stats Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : stats ? (
                <>
                    {/* Primary Metrics */}
                    <div>
                        <h2 className="text-lg font-semibold text-white/70 mb-4 uppercase tracking-wider text-sm">
                            Platform Overview
                        </h2>
                        <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                icon={<DollarSign size={22} />}
                                label="Total Revenue"
                                value={`$${(stats.totalRevenue || 0).toLocaleString()}`}
                                iconBg="bg-green-500"
                                textColor="text-green-400"
                            />
                            <StatCard
                                icon={<Users size={22} />}
                                label="Total Users"
                                value={stats.totalUsers || 0}
                                iconBg="bg-blue-500"
                                textColor="text-blue-400"
                            />
                            <StatCard
                                icon={<Briefcase size={22} />}
                                label="Total Lawyers"
                                value={stats.totalLawyers || 0}
                                iconBg="bg-purple-500"
                                textColor="text-purple-400"
                            />
                            <StatCard
                                icon={<FileCheck size={22} />}
                                label="Total Hirings"
                                value={stats.totalHirings || 0}
                                iconBg="bg-amber-500"
                                textColor="text-amber-400"
                            />
                        </div>
                    </div>

                    {/* Hiring Breakdown */}
                    <div>
                        <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">
                            Hiring Status Breakdown
                        </h2>
                        <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                icon={<Clock size={22} />}
                                label="Pending"
                                value={stats.pending || 0}
                                iconBg="bg-yellow-500"
                                textColor="text-yellow-400"
                            />
                            <StatCard
                                icon={<TrendingUp size={22} />}
                                label="Accepted"
                                value={stats.accepted || 0}
                                iconBg="bg-cyan-500"
                                textColor="text-cyan-400"
                            />
                            <StatCard
                                icon={<CheckCircle size={22} />}
                                label="Completed"
                                value={stats.completed || 0}
                                iconBg="bg-green-600"
                                textColor="text-green-400"
                            />
                            <StatCard
                                icon={<XCircle size={22} />}
                                label="Rejected"
                                value={stats.rejected || 0}
                                iconBg="bg-red-500"
                                textColor="text-red-400"
                            />
                        </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="grid gap-4 grid-cols-2">
                        <StatCard
                            icon={<MessageSquare size={22} />}
                            label="Total Comments"
                            value={stats.totalComments || 0}
                            iconBg="bg-orange-500"
                            textColor="text-orange-400"
                        />
                    </div>
                </>
            ) : (
                <p className="text-red-400 text-sm">Failed to load statistics.</p>
            )}

            {/* Quick Actions */}
            <div>
                <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">
                    Quick Actions
                </h2>
                <div className="grid gap-6 lg:grid-cols-3">
                    <QuickLink
                        href="/dashboard/admin/manage-users"
                        icon={<Users size={40} />}
                        title="Manage Users"
                        description="View, search, update roles and plans, or remove users from the platform. Admins are protected from modification."
                    />
                    <QuickLink
                        href="/dashboard/admin/all-transactions"
                        icon={<CreditCard size={40} />}
                        title="Subscription Transactions"
                        description="View all successful lawyer subscription payments. Search by lawyer name or email and monitor LegalEase revenue."
                    />
                    <QuickLink
                        href="/dashboard/admin/analytics"
                        icon={<BarChart2 size={40} />}
                        title="Analytics"
                        description="Visualize platform health with charts — hiring status distribution, user composition, and top lawyers by hires."
                    />
                </div>
            </div>

            {/* Admin Tip */}
            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">
                <div className="flex items-center gap-3">
                    <Shield size={28} className="text-primary" />
                    <h2 className="text-2xl font-bold">Admin Reminder</h2>
                </div>
                <p className="mt-5 leading-8 text-gray-300">
                    Admin accounts are fully protected — you cannot modify or delete other
                    admins from the panel. When changing a users role to
                    <span className="text-primary font-semibold"> lawyer </span>
                    the user must purchase the
                    <span className="text-primary font-semibold"> $15 Lawyer Pro Plan </span>
                    before enjoying premium lawyer benefits. Client hiring payments belong to
                    the lawyer, while LegalEase revenue comes only from subscription payments.
                </p>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, sub, iconBg, textColor }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">{label}</p>
                    <h2 className={`mt-2 text-3xl font-bold ${textColor}`}>{value}</h2>
                    {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
                </div>
                <div className={`rounded-2xl ${iconBg} p-4 text-white`}>{icon}</div>
            </div>
        </div>
    );
}

function QuickLink({ href, icon, title, description }) {
    return (
        <Link
            href={href}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:shadow-lg hover:bg-white/10"
        >
            <div className="mb-5 text-primary">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-gray-400 leading-7">{description}</p>
        </Link>
    );
}