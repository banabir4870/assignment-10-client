"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

const slides = [
    {
        title: "Find & Hire Expert Legal Counsel",
        desc: "Connect with verified lawyers and get professional legal support anytime.",
        img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        icon: "⚖️",
    },
    {
        title: "Trusted Legal Professionals",
        desc: "Browse top-rated lawyers across criminal, corporate, and family law.",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        icon: "🧑‍⚖️",
    },
    {
        title: "Secure & Fast Hiring System",
        desc: "Hire lawyers instantly with secure verification and payment system.",
        img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
        icon: "🔒",
    },
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    // auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const current = slides[index];

    return (
        <section className="relative w-full min-h-[85vh] flex items-center bg-gradient-to-br from-white via-slate-50 to-blue-50 overflow-hidden">

            {/* background glow */}
            <div className="absolute w-[400px] h-[400px] bg-blue-200 blur-3xl rounded-full opacity-30 -top-40 -left-40" />
            <div className="absolute w-[400px] h-[400px] bg-indigo-200 blur-3xl rounded-full opacity-30 -bottom-40 -right-40" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center z-10">

                {/* LEFT TEXT */}
                <div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-4xl">{current.icon}</div>

                            <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
                                {current.title}
                            </h1>

                            <p className="mt-4 text-gray-600 text-lg">
                                {current.desc}
                            </p>

                            <div className="mt-8 flex gap-4">
                                <Link href="/lawyers" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                                        Browse Lawyers
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* dots */}
                    <div className="flex gap-2 mt-8">
                        {slides.map((_, i) => (
                            <Button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full transition ${i === index ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <Image
                            src={current.img}
                            alt="legal banner"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                        />

                        {/* floating badges */}
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm shadow">
                            LegalEase
                        </div>

                        <div className="absolute bottom-4 left-4 bg-white border shadow px-3 py-2 rounded-lg text-sm">
                            ⚖️ Verified Lawyers
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}