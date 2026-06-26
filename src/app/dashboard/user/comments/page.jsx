"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Star, Edit, Trash2, X } from "lucide-react";
import Link from "next/link";

export default function UserCommentsPage() {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingComment, setEditingComment] = useState(null);
    const [editRating, setEditRating] = useState(5);
    const [editContent, setEditContent] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);

    const fetchComments = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/user/${session.user.id}`);
            const data = await res.json();
            if (data.success) {
                setComments(data.comments);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [session?.user?.id]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                setComments((prev) => prev.filter((c) => c._id !== id));
            } else {
                alert(data.message || "Failed to delete");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred");
        }
    };

    const handleSaveEdit = async () => {
        if (!editContent.trim()) return alert("Review cannot be empty");
        setSaveLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${editingComment._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rating: editRating,
                    comment: editContent,
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Review updated");
                setEditingComment(null);
                fetchComments();
            } else {
                alert(data.message || "Failed to update");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred");
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) {
        return <div className="py-20 text-center font-bold">Loading Reviews...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">
                <h1 className="text-4xl font-bold">My Reviews</h1>
                <p className="mt-2 text-gray-300">Manage reviews you've left for lawyers.</p>
            </div>

            {comments.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-3xl shadow">
                    <h2 className="text-3xl font-bold text-black">No Reviews Yet</h2>
                    <p className="mt-3 text-gray-500">You haven't reviewed any lawyers yet.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {comments.map((comment) => (
                        <div key={comment._id} className="rounded-3xl bg-white p-6 shadow border relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-black">
                                        Lawyer: <Link href={`/lawyers/${comment.lawyerId}`} className="text-primary hover:underline">{comment.lawyerName}</Link>
                                    </h3>
                                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(Number(comment.rating) || 5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">{comment.comment}</p>
                            
                            <div className="flex justify-end gap-3 mt-auto pt-4 border-t">
                                <Button
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    onClick={() => {
                                        setEditingComment(comment);
                                        setEditRating(comment.rating);
                                        setEditContent(comment.comment);
                                    }}
                                    className="flex items-center gap-1"
                                >
                                    <Edit size={16} /> Edit
                                </Button>
                                <Button
                                    size="sm"
                                    color="danger"
                                    variant="flat"
                                    onClick={() => handleDelete(comment._id)}
                                    className="flex items-center gap-1"
                                >
                                    <Trash2 size={16} /> Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingComment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl relative">
                        <button 
                            className="absolute right-4 top-4 text-gray-500 hover:text-black"
                            onClick={() => setEditingComment(null)}
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6 text-black">Edit Review</h2>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={32}
                                        className={`cursor-pointer ${star <= editRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                        onClick={() => setEditRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Review Content</label>
                            <textarea
                                className="w-full border rounded-xl p-4 outline-none focus:border-primary text-black"
                                rows={5}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex justify-end gap-3">
                            <Button variant="flat" onClick={() => setEditingComment(null)}>Cancel</Button>
                            <Button color="primary" onClick={handleSaveEdit} disabled={saveLoading}>
                                {saveLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}