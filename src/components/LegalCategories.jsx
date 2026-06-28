"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
    Scale,
    BriefcaseBusiness,
    Users,
    Building2,
    Landmark,
    Shield,
    Gavel,
    FileText,
} from "lucide-react";

const categories = [
    {
        title: "Criminal Law",
        icon: Shield,
        color: "bg-red-100 text-red-600",
        query: "Criminal Law",
    },
    {
        title: "Corporate Law",
        icon: Building2,
        color: "bg-blue-100 text-blue-600",
        query: "Corporate Law",
    },
    {
        title: "Family Law",
        icon: Users,
        color: "bg-pink-100 text-pink-600",
        query: "Family Law",
    },
    {
        title: "Property Law",
        icon: Landmark,
        color: "bg-green-100 text-green-600",
        query: "Property Law",
    },
    {
        title: "Immigration Law",
        icon: FileText,
        color: "bg-yellow-100 text-yellow-600",
        query: "Immigration Law",
    },
    {
        title: "Civil Law",
        icon: Scale,
        color: "bg-purple-100 text-purple-600",
        query: "Civil Law",
    },
    {
        title: "Tax Law",
        icon: BriefcaseBusiness,
        color: "bg-orange-100 text-orange-600",
        query: "Tax Law",
    },
    {
        title: "Cyber Law",
        icon: Gavel,
        color: "bg-cyan-100 text-cyan-600",
        query: "Cyber Law",
    },
];

export default function LegalCategories() {
    return (
        <section className="py-20 bg-content2">
            <div className="container mx-auto px-5">

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .6 }}
                    className="text-center mb-14"
                >
                    <p className="uppercase tracking-widest text-primary font-semibold">
                        Practice Areas
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        Legal Categories
                    </h2>

                    <p className="text-default-500 mt-4 max-w-2xl mx-auto">
                        Find experienced lawyers based on their legal specialization.
                    </p>
                </motion.div>

                {/* Grid */}

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {categories.map((item, index) => {

                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: .4,
                                    delay: index * .08,
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                }}
                            >
                                <Link
                                    href={`/lawyers?specialization=${encodeURIComponent(
                                        item.query
                                    )}`}
                                    className="block rounded-3xl border bg-content1 p-8 shadow-sm hover:shadow-xl transition"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color}`}
                                    >
                                        <Icon size={30} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-default-500">
                                        Browse expert lawyers specializing in {item.title}.
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}