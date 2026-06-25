"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    BriefcaseBusiness,
    CircleDollarSign,
    Search,
    Users,
} from "lucide-react";
import { Button } from "@heroui/react";

const BrowseLawyersPage = () => {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [availability, setAvailability] = useState("All");
    const [specialization, setSpecialization] = useState("All");
    const [feeRange, setFeeRange] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);

    const lawyersPerPage = 8;

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/profile`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                const publishedLawyers = data.filter(
                    (lawyer) => lawyer.isPublished
                );

                setLawyers(publishedLawyers);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);

    const specializations = [
        "All",
        ...new Set(lawyers.map((lawyer) => lawyer.specialization)),
    ];

    const filteredLawyers = useMemo(() => {
        return lawyers.filter((lawyer) => {
            const matchesSearch =
                lawyer.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                lawyer.specialization
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesAvailability =
                availability === "All" ||
                lawyer.availability === availability;

            const matchesSpecialization =
                specialization === "All" ||
                lawyer.specialization === specialization;

            let matchesFee = true;

            if (feeRange === "0-50") {
                matchesFee = lawyer.fee <= 50;
            }

            if (feeRange === "51-100") {
                matchesFee = lawyer.fee > 50 && lawyer.fee <= 100;
            }

            if (feeRange === "100+") {
                matchesFee = lawyer.fee > 100;
            }

            return (
                matchesSearch &&
                matchesAvailability &&
                matchesSpecialization &&
                matchesFee
            );
        });
    }, [lawyers, search, availability, specialization, feeRange]);

    const totalPages = Math.ceil(
        filteredLawyers.length / lawyersPerPage
    );

    const displayedLawyers = filteredLawyers.slice(
        (currentPage - 1) * lawyersPerPage,
        currentPage * lawyersPerPage
    );

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-10">

                <div className="text-center mb-10">
                    <div className="h-10 w-72 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    <div className="h-5 w-96 bg-gray-200 rounded mx-auto mt-4 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border overflow-hidden animate-pulse"
                        >
                            <div className="h-64 bg-gray-200"></div>

                            <div className="p-5 space-y-4">
                                <div className="h-6 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-16 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">

            <div className="text-center mb-10">

                <h1 className="text-4xl md:text-5xl font-bold">
                    Browse Lawyers
                </h1>

                <p className="text-default-500 mt-4 max-w-2xl mx-auto">
                    Find experienced legal professionals across multiple
                    practice areas and hire the right legal expert for your
                    needs.
                </p>

            </div>

            <div className="bg-content1 border rounded-3xl p-5 mb-10">

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-default-500"
                        />

                        <input
                            type="text"
                            placeholder="Search lawyer..."
                            value={search}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setSearch(e.target.value);
                            }}
                            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-primary"
                        />

                    </div>

                    <select
                        className="border rounded-xl px-4 py-3 outline-none"
                        value={specialization}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setSpecialization(e.target.value);
                        }}
                    >
                        {specializations.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>

                    <select
                        className="border rounded-xl px-4 py-3 outline-none"
                        value={availability}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setAvailability(e.target.value);
                        }}
                    >
                        <option>All</option>
                        <option>Available</option>
                        <option>Busy</option>
                    </select>

                    <select
                        className="border rounded-xl px-4 py-3 outline-none"
                        value={feeRange}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setFeeRange(e.target.value);
                        }}
                    >
                        <option value="All">All Fees</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="51-100">$51 - $100</option>
                        <option value="100+">$100+</option>
                    </select>

                </div>

            </div>

            {displayedLawyers.length === 0 ? (
                <div className="border rounded-3xl py-20 text-center">

                    <h2 className="text-3xl font-bold">
                        No Lawyers Found
                    </h2>

                    <p className="text-default-500 mt-3">
                        Try changing the search or filters.
                    </p>

                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {displayedLawyers.map((lawyer) => (

                            <Link
                                href={`/lawyers/${lawyer._id}`}
                                key={lawyer._id}
                            >

                                <div className="group bg-content1 border rounded-3xl overflow-hidden h-full transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                                    <div className="relative h-64">

                                        <Image
                                            src={lawyer.image}
                                            alt={lawyer.fullName}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <span
                                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                                                lawyer.availability ===
                                                "Available"
                                                    ? "bg-green-600"
                                                    : "bg-red-500"
                                            }`}
                                        >
                                            {lawyer.availability}
                                        </span>

                                    </div>

                                    <div className="p-5">

                                        <h2 className="text-xl font-bold line-clamp-1">
                                            {lawyer.fullName}
                                        </h2>

                                        <div className="flex items-center gap-2 mt-3 text-primary font-medium">

                                            <BriefcaseBusiness size={18} />

                                            <span className="text-sm">
                                                {lawyer.specialization}
                                            </span>

                                        </div>

                                        <p className="mt-4 text-sm text-default-500 line-clamp-3">
                                            {lawyer.bio}
                                        </p>

                                        <div className="flex justify-between items-center mt-6">

                                            <div>

                                                <p className="text-xs text-default-500">
                                                    Consultation Fee
                                                </p>

                                                <div className="flex items-center gap-1 font-bold text-green-600">

                                                    <CircleDollarSign size={18} />

                                                    {lawyer.fee}

                                                </div>

                                            </div>

                                            <div className="text-right">

                                                <p className="text-xs text-default-500">
                                                    Total Hires
                                                </p>

                                                <div className="flex items-center justify-end gap-1 font-semibold">

                                                    <Users size={16} />

                                                    {lawyer.totalHires}

                                                </div>

                                            </div>

                                        </div>

                                        <Button className="w-full mt-6 bg-primary text-black py-3 rounded-xl font-semibold transition hover:opacity-90">
                                            View Details
                                        </Button>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                    {totalPages > 1 && (

                        <div className="flex justify-center gap-2 mt-12">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className="px-4 py-2 border rounded-lg disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (

                                <button
                                    key={index}
                                    onClick={() =>
                                        setCurrentPage(index + 1)
                                    }
                                    className={`px-4 py-2 rounded-lg border transition ${
                                        currentPage === index + 1
                                            ? "bg-primary text-white"
                                            : ""
                                    }`}
                                >
                                    {index + 1}
                                </button>

                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-4 py-2 border rounded-lg disabled:opacity-50"
                            >
                                Next
                            </button>

                        </div>

                    )}
                </>
            )}

        </section>
    );
};

export default BrowseLawyersPage;