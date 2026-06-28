"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BriefcaseBusiness } from "lucide-react";
import { Badge, Button, Chip } from "@heroui/react";

export default function TopLegalExperts() {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopLawyers();
    }, []);

    const fetchTopLawyers = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/top`
            );

            const data = await res.json();

            if (data.success) {
                setLawyers(data.lawyers);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-20">
                <div className="container mx-auto text-center">
                    <p>Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20">
            <div className="w-8/12 mx-auto px-5">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-primary font-semibold uppercase tracking-widest">
                        Trusted Professionals
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        Top Legal Experts
                    </h2>

                    <p className="mt-4 text-default-500 max-w-2xl mx-auto">
                        Meet the highest performing lawyers on LegalEase based on
                        successful client hires and outstanding ratings.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {lawyers.map((lawyer, index) => (

                        <motion.div
                            key={lawyer._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: .5,
                                delay: index * .15
                            }}
                            whileHover={{
                                y: -8,
                                scale: 1.02
                            }}
                            className="bg-content1 border rounded-3xl overflow-hidden shadow-sm"
                        >

                            <div className="relative h-72">

                                <Image
                                    src={lawyer.image}
                                    alt={lawyer.fullName}
                                    fill
                                    className="object-cover object-top"
                                />

                            </div>

                            <div className="p-6 space-y-4">

                                <h3 className="text-2xl font-bold">
                                    {lawyer.fullName}
                                </h3>

                                <Chip>
                                    {lawyer.specialization}
                                </Chip>

                                <div className="flex justify-between mt-6">

                                    <div className="flex items-center gap-2">

                                        <Star
                                            className="text-yellow-500"
                                            fill="currentColor"
                                            size={18}
                                        />

                                        <span className="font-semibold">
                                            {lawyer.rating}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <BriefcaseBusiness
                                            size={18}
                                            className="text-primary"
                                        />

                                        <span className="font-semibold">
                                            {lawyer.totalHires} Hires
                                        </span>

                                    </div>

                                </div>

                                <Link
                                    href={`/lawyers/${lawyer._id}`}
                                >
                                    <Button className={"w-full"}>View Profile</Button>
                                </Link>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}