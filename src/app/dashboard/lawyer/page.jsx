import Link from "next/link";
import {
    BadgeCheck,
    CircleDollarSign,
    Clock3,
    UserRound
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function LawyerDashboard() {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const userId = session?.user?.id;

    // Lawyer Profile
    const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/profile/user/${userId}`,
        {
            cache: "no-store",
        }
    );

    const profileData = await profileRes.json();

    if (!profileData.exists) {
        return (
            <div className="rounded-3xl bg-white p-10 text-center shadow">
                <h2 className="text-3xl font-bold text-[#1E293B]">
                    Complete Your Lawyer Profile
                </h2>

                <p className="mt-3 text-gray-500">
                    Before using the lawyer dashboard, please complete your legal
                    profile.
                </p>

                <Link
                    href="/dashboard/lawyer/manage-legal-profile"
                    className="mt-6 inline-block rounded-xl bg-[#C9A65B] px-6 py-3 text-white hover:bg-[#ab8635]"
                >
                    Create Profile
                </Link>
            </div>
        );
    }

    const lawyerProfile = profileData.profile;

    // Hiring History
    const hiringRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/lawyer/${userId}`,
        {
            cache: "no-store",
        }
    );

    const hiringData = await hiringRes.json();

    const hirings = hiringData.success
        ? hiringData.hirings
        : [];

    const {
        fullName,
        specialization,
        fee,
        availability,
        image,
        totalHires,
        isPublished,
    } = lawyerProfile;

    const pendingRequests = hirings.filter(
        item => item.status === "pending"
    ).length;

    const totalEarnings = hirings
        .filter(item => item.paymentStatus === "paid")
        .reduce(
            (sum, item) => sum + Number(item.lawyerFee),
            0
        );

    return (
        <div className="space-y-8">

            {/* Welcome */}

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                    <div>

                        <p className="font-medium text-[#C9A65B]">
                            Welcome Back
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            {fullName} 👋
                        </h1>

                        <p className="mt-3 text-gray-300">
                            Manage your legal profile and hiring requests.
                        </p>

                    </div>

                    <div className="mt-6 md:mt-0">

                        <span className="rounded-full bg-[#C9A65B] px-5 py-2 font-semibold text-black">
                            Premium Lawyer
                        </span>

                    </div>

                </div>

            </div>

            {/* Stats */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl bg-white p-6 shadow">

                    <UserRound className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">
                        Total Hires
                    </h3>

                    <p className="mt-2 text-4xl font-bold text-black">
                        {totalHires}
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <CircleDollarSign className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">
                        Total Earnings
                    </h3>

                    <p className="mt-2 text-4xl font-bold text-black">
                        ${totalEarnings}
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <Clock3 className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">
                        Pending Requests
                    </h3>

                    <p className="mt-2 text-4xl font-bold text-black">
                        {pendingRequests}
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <BadgeCheck className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">
                        Profile Status
                    </h3>

                    <p
                        className={`mt-2 text-2xl font-bold ${isPublished
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                    >
                        {isPublished ? "Published" : "Draft"}
                    </p>

                </div>

            </div>
            {/* Profile */}

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-[#1E293B]">
                        Current Legal Profile
                    </h2>

                    <Link
                        href="/dashboard/lawyer/manage-legal-profile"
                        className="rounded-xl bg-[#C9A65B] px-5 py-2 text-white hover:bg-[#ab8635]"
                    >
                        Manage Profile
                    </Link>

                </div>

                <div className="mt-8 flex flex-col items-center gap-6 md:flex-row">

                    <Image
                        src={image}
                        alt={fullName}
                        width={160}
                        height={160}
                        className="h-40 w-40 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                        <h3 className="text-3xl font-bold text-[#1E293B]">
                            {fullName}
                        </h3>

                        <p className="mt-2 text-gray-500">
                            {specialization}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-4">

                            <span
                                className={`rounded-full px-4 py-1 ${availability === "Available"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {availability}
                            </span>

                            <span className="rounded-full bg-[#C9A65B]/10 px-4 py-1 text-[#C9A65B]">
                                ${fee} / Consultation
                            </span>

                            <span className="rounded-full bg-blue-100 px-4 py-1 text-blue-700">
                                ⭐ {lawyerProfile.rating || 0} Rating
                            </span>

                            <span className="rounded-full bg-purple-100 px-4 py-1 text-purple-700">
                                {totalHires} Total Hires
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Requests */}

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-black">
                        Recent Hiring Requests
                    </h2>

                    <Link
                        href="/dashboard/lawyer/hiring-history"
                        className="text-[#C9A65B] hover:underline"
                    >
                        View All
                    </Link>

                </div>

                <div className="mt-8 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="py-4 text-left text-black/40">
                                    Client
                                </th>

                                <th className="py-4 text-left text-black/40">
                                    Date
                                </th>

                                <th className="py-4 text-left text-black/40">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                hirings.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={3}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            No hiring requests found.
                                        </td>

                                    </tr>

                                ) : (

                                    hirings
                                        .slice(0, 5)
                                        .map((item) => (

                                            <tr
                                                key={item._id}
                                                className="border-b last:border-none"
                                            >

                                                <td className="py-5 text-black font-medium">
                                                    {item.userName}
                                                </td>

                                                <td className="text-black">
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-sm font-medium
                                                        ${item.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : item.status === "accepted"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : item.status === "completed"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {item.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            item.status.slice(1)}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}