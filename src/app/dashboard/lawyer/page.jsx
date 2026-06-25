import Link from "next/link";
import {
    BadgeCheck,
    BriefcaseBusiness,
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
    })

    const userId = session?.user?.id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/profile/user/${userId}`);
    const data = await res.json();
    if (!data.exists) {
        return (
            <div className="rounded-3xl bg-white p-10 text-center shadow">
                <h2 className="text-3xl font-bold text-[#1E293B]">
                    Complete Your Lawyer Profile
                </h2>

                <p className="mt-3 text-gray-500">
                    Before using the lawyer dashboard, please complete your legal profile.
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
    const lawyerProfile = data.profile;
    console.log("lawyerProfile", lawyerProfile);
    const { fullName, specialization, fee, bio, availability, image, totalHires } = lawyerProfile;

    return (
        <div className="space-y-8">

            {/* Welcome */}

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                    <div>

                        <p className="text-[#C9A65B] font-medium">
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

                        <span className="rounded-full bg-[#C9A65B] px-5 py-2 font-semibold">

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

                    <p className="mt-2 text-black text-4xl font-bold">

                        {totalHires}

                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <CircleDollarSign className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">

                        Total Earnings

                    </h3>

                    <p className="mt-2 text-4xl text-black font-bold">

                        ${totalHires * fee}

                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <Clock3 className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">

                        Pending Requests

                    </h3>

                    <p className="mt-2 text-4xl text-black font-bold">

                        3

                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <BadgeCheck className="text-[#C9A65B]" />

                    <h3 className="mt-4 text-gray-500">

                        Profile Status

                    </h3>

                    <p className="mt-2 text-2xl font-bold text-green-600">

                        Published

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
                        width={128}
                        height={128}
                        className="h-40 w-40 rounded-2xl object-cover"
                    />

                    <div>

                        <h3 className="text-3xl font-bold text-[#1E293B]">

                            {fullName}

                        </h3>

                        <p className="mt-2 text-gray-500">

                            {specialization}

                        </p>

                        <div className="mt-5 flex gap-4">

                            <span className="rounded-full bg-green-100 px-4 py-1 text-green-700">

                                Available

                            </span>

                            <span className="rounded-full bg-[#C9A65B]/10 px-4 py-1 text-[#C9A65B]">

                                ${fee} / Consultation

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Requests */}

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl text-black font-bold">

                        Recent Hiring Requests

                    </h2>

                    <Link
                        href="/dashboard/lawyer/hiring-history"
                        className="text-[#C9A65B]"
                    >
                        View All
                    </Link>

                </div>

                <div className="mt-8 overflow-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="py-4 text-black/30 text-left">Client</th>
                                <th className="py-4 text-black/30 text-left">Date</th>
                                <th className="py-4 text-black/30 text-left">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr className="border-b">

                                <td className="py-5 text-black">John Doe</td>

                                <td className="text-black">22 Jun 2026</td>

                                <td>

                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                                        Pending

                                    </span>

                                </td>

                            </tr>

                            <tr>

                                <td className="py-5 text-black">Alex Smith</td>

                                <td className="text-black">20 Jun 2026</td>

                                <td>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                                        Accepted

                                    </span>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}