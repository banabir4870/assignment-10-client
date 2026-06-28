"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import {
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    DollarSign,
    Star,
} from "lucide-react";

import { Button, Spinner } from "@heroui/react";
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function FeaturedLawyers() {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/featured-lawyers`
                );

                const data = await res.json();

                // backend যদি array return করে
                if (Array.isArray(data)) {
                    setLawyers(data);
                }

                // backend যদি {success:true, lawyers:[...]} return করে
                else if (data.success) {
                    setLawyers(data.lawyers);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

                    <div>
                        <p className="text-primary font-semibold uppercase tracking-widest">
                            Featured Lawyers
                        </p>

                        <h2 className="mt-2 text-4xl font-bold">
                            Find Trusted Legal Professionals
                        </h2>

                        <p className="mt-4 max-w-2xl text-default-500">
                            Browse our latest verified lawyers from different
                            legal categories. Choose the right expert based on
                            specialization, ratings and experience.
                        </p>
                    </div>

                    <Link href="/lawyers">
                        <Button
                            color="primary"
                            endContent={<ArrowRight size={18} />}
                        >
                            Browse All Lawyers
                        </Button>
                    </Link>

                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {lawyers.map((lawyer) => (
                            <motion.div
                                key={lawyer._id}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.04,
                                    y: -6,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className="overflow-hidden rounded-3xl border border-default-200 bg-content1 shadow-sm"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={lawyer.image}
                                        alt={lawyer.fullName}
                                        fill
                                        className="object-cover transition duration-500 hover:scale-110"
                                    />

                                    <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white flex items-center gap-1">
                                        <BadgeCheck size={14} />
                                        Verified
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="space-y-4 p-6">

                                    <div>
                                        <h3 className="text-2xl font-bold">
                                            {lawyer.fullName}
                                        </h3>

                                        <div className="mt-2 flex items-center gap-2 text-default-500">
                                            <BriefcaseBusiness size={16} />
                                            <span>{lawyer.specialization}</span>
                                        </div>
                                    </div>

                                    {/* Rating + Fee */}
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star
                                                size={18}
                                                fill="currentColor"
                                            />
                                            <span className="font-semibold">
                                                {lawyer.rating || 0}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1 font-semibold text-primary">
                                            <DollarSign size={18} />
                                            {lawyer.fee}
                                        </div>

                                    </div>

                                    {/* Bio */}
                                    <p className="line-clamp-3 text-sm text-default-500">
                                        {lawyer.bio}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t pt-5">

                                        <span className="text-sm text-default-500">
                                            {lawyer.totalHires || 0} Hires
                                        </span>

                                        <Link href={`/lawyers/${lawyer._id}`}>
                                            <Button
                                                color="primary"
                                                radius="full"
                                                endContent={<ArrowRight size={16} />}
                                            >
                                                View Profile
                                            </Button>
                                        </Link>

                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}