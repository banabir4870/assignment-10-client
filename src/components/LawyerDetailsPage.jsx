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

    // Comments states
    const [comments, setComments] = useState([]);
    const [userHire, setUserHire] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [commentLoading, setCommentLoading] = useState(false);

    useEffect(() => {
        const fetchLawyerAndComments = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/profile/${id}`
                );

                const data = await res.json();

                if (data.success) {
                    setLawyer(data.profile);
                }

                // Fetch comments
                const commentsRes = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/lawyer/${id}`
                );
                const commentsData = await commentsRes.json();
                if (commentsData.success) {
                    setComments(commentsData.comments);
                }

                // If user is logged in, check if they have a completed hiring
                if (session?.user?.id) {
                    const hiringsRes = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/user/${session.user.id}`
                    );
                    const hiringsData = await hiringsRes.json();
                    if (hiringsData.success) {
                        const hire = hiringsData.hirings.find(
                            (h) => h.lawyerId === id && h.paymentStatus === "paid"
                        );
                        setUserHire(hire || null);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLawyerAndComments();
        }
    }, [id, session?.user?.id]);

    const handleHire = async () => {
        if (!session?.user) {
            alert("Please login first");
            return;
        }

        if (session.user.role === "lawyer") {
            alert("Lawyers cannot hire other lawyers");
            return;
        }

        if (session.user.role === "admin") {
            alert("Admins cannot hire any lawyers")
            return
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
                        <div className="h-137.5 rounded-3xl bg-gray-200"></div>

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
    const isAdmin = session?.user?.role === "admin";

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">

            <div className="grid lg:grid-cols-2 gap-10">

                <div className="relative h-137.5 rounded-3xl overflow-hidden border">
                    <Image
                        src={lawyer.image}
                        alt={lawyer.fullName}
                        fill
                        className="object-cover object-top"
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
                            className={`px-4 py-2 rounded-full text-white ${lawyer.availability === "Available"
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
                        className="w-full mt-10 bg-primary text-black py-6 rounded-2xl font-semibold"
                    >
                        {hireLoading
                            ? "Sending Request..."
                            : isOwnProfile
                                ? "This Is Your Profile"
                                : isLawyer
                                    ? "Lawyers Cannot Hire"
                                    : isAdmin
                                        ? "Admins Cannot Hire"
                                        : "Hire This Lawyer"}
                    </Button>

                </div>

            </div>

            {/* Comments Section */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8">Client Reviews ({comments.length})</h2>

                {userHire && (
                    <div className="bg-content1 p-6 rounded-3xl border mb-10">
                        <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={24}
                                    className={`cursor-pointer ${star <= newRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                    onClick={() => setNewRating(star)}
                                />
                            ))}
                        </div>
                        <textarea
                            className="w-full border rounded-xl p-4 outline-none focus:border-primary mb-4 bg-transparent"
                            rows={4}
                            placeholder="Share your experience working with this lawyer..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                            color="primary"
                            onClick={async () => {
                                if (!newComment.trim()) return alert("Please write a comment.");
                                setCommentLoading(true);
                                try {
                                    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            hireId: userHire._id,
                                            lawyerId: id,
                                            userId: session.user.id,
                                            rating: newRating,
                                            comment: newComment,
                                            userImage: session.user.image,
                                        })
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                        alert("Review submitted successfully");
                                        setNewComment("");
                                        // Refetch comments
                                        const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/lawyer/${id}`);
                                        const commentsData = await commentsRes.json();
                                        if (commentsData.success) setComments(commentsData.comments);
                                    } else {
                                        alert(data.message);
                                    }
                                } catch (err) {
                                    console.log(err);
                                    alert("Failed to submit review");
                                } finally {
                                    setCommentLoading(false);
                                }
                            }}
                            disabled={commentLoading}
                        >
                            {commentLoading ? "Submitting..." : "Submit Review"}
                        </Button>
                    </div>
                )}

                {comments.length === 0 ? (
                    <div className="text-default-500 py-10 border rounded-3xl text-center">
                        No reviews yet for this lawyer.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {comments.map((comment) => (
                            <div key={comment._id} className="border p-6 rounded-3xl bg-content1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                                            {comment.userImage ? (
                                                <Image src={comment.userImage} alt={comment.userName} fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary text-black font-bold">
                                                    {comment.userName.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{comment.userName}</h4>
                                            <p className="text-xs text-default-500">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(Number(comment.rating) || 5)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-default-500">{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </section>
    );
}