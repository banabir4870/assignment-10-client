"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    BriefcaseBusiness,
    CalendarDays,
    CircleDollarSign,
    Star,
    Users,
} from "lucide-react";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export default function LawyerDetailsPage({ id }) {
    const { data: session } = useSession();

    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hireLoading, setHireLoading] = useState(false);

    useEffect(() => {
        const fetchLawyer = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/profile/${id}`
                );

                const data = await res.json();

                if (data.success) {
                    setLawyer(data.profile);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLawyer();
        }
    }, [id]);

    const handleHire = async () => {
        if (!session?.user) {
            alert("Please login first");
            return;
        }

        if (session.user.role === "lawyer") {
            alert("Lawyers cannot hire other lawyers");
            return;
        }

        if (session.user.id === lawyer.userId) {
            alert("You cannot hire yourself");
            return;
        }

        try {
            setHireLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/hire`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lawyerId: lawyer._id,
                        lawyerName: lawyer.fullName,
                        lawyerFee: lawyer.fee,

                        userId: session.user.id,
                        userName: session.user.name,
                        userEmail: session.user.email,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                alert("Hiring request submitted successfully");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setHireLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="animate-pulse">
                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="h-[550px] rounded-3xl bg-gray-200"></div>

                        <div className="space-y-5">
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-40 bg-gray-200 rounded"></div>
                            <div className="h-14 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="py-24 text-center">
                <h2 className="text-4xl font-bold">
                    Lawyer Not Found
                </h2>
            </div>
        );
    }

    const isLawyer = session?.user?.role === "lawyer";
    const isOwnProfile = session?.user?.id === lawyer.userId;

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">

            <div className="grid lg:grid-cols-2 gap-10">

                <div className="relative h-[550px] rounded-3xl overflow-hidden border">
                    <Image
                        src={lawyer.image}
                        alt={lawyer.fullName}
                        fill
                        className="object-cover"
                    />
                </div>

                <div>

                    <h1 className="text-5xl font-bold">
                        {lawyer.fullName}
                    </h1>

                    <div className="flex items-center gap-2 mt-4 text-primary">
                        <BriefcaseBusiness size={20} />
                        <span>{lawyer.specialization}</span>
                    </div>

                    <div className="mt-6">
                        <span
                            className={`px-4 py-2 rounded-full text-white ${
                                lawyer.availability === "Available"
                                    ? "bg-green-600"
                                    : "bg-red-500"
                            }`}
                        >
                            {lawyer.availability}
                        </span>
                    </div>

                    <p className="mt-8 text-default-500 leading-8">
                        {lawyer.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-5 mt-10">

                        <div className="border rounded-2xl p-5">
                            <div className="flex items-center gap-2">
                                <CircleDollarSign size={20} />
                                Fee
                            </div>

                            <h3 className="text-3xl font-bold mt-2">
                                ${lawyer.fee}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-5">
                            <div className="flex items-center gap-2">
                                <Users size={20} />
                                Hires
                            </div>

                            <h3 className="text-3xl font-bold mt-2">
                                {lawyer.totalHires}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-5">
                            <div className="flex items-center gap-2">
                                <Star size={20} />
                                Rating
                            </div>

                            <h3 className="text-3xl font-bold mt-2">
                                {lawyer.rating || 0}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-5">
                            <div className="flex items-center gap-2">
                                <CalendarDays size={20} />
                                Joined
                            </div>

                            <h3 className="font-semibold mt-2">
                                {new Date(
                                    lawyer.createdAt
                                ).toLocaleDateString()}
                            </h3>
                        </div>

                    </div>

                    <Button
                        onClick={handleHire}
                        disabled={
                            hireLoading ||
                            isLawyer ||
                            isOwnProfile
                        }
                        className="w-full mt-10 bg-primary text-black py-6 rounded-2xl font-semibold"
                    >
                        {hireLoading
                            ? "Sending Request..."
                            : isOwnProfile
                            ? "This Is Your Profile"
                            : isLawyer
                            ? "Lawyers Cannot Hire"
                            : "Hire This Lawyer"}
                    </Button>

                </div>

            </div>

        </section>
    );
}