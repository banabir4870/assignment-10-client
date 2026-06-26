"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function UserUpdateProfilePage() {
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        image: "",
    });

    useEffect(() => {
        if (!session?.user) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile/${session.user.id}`
                );

                const data = await res.json();

                if (data.success) {
                    setFormData({
                        fullName: data.user.fullName || session.user.name || "",
                        email: data.user.email || session.user.email || "",
                        phone: data.user.phone || "",
                        address: data.user.address || "",
                        image: data.user.image || session.user.image || "",
                    });
                } else {
                    setFormData({
                        fullName: session.user.name || "",
                        email: session.user.email || "",
                        phone: "",
                        address: "",
                        image: session.user.image || "",
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [session]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];

        if (!image) return;

        try {
            setUploading(true);

            const imageData = new FormData();
            imageData.append("image", image);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
                {
                    method: "POST",
                    body: imageData,
                }
            );

            const data = await res.json();

            if (data.success) {
                setFormData((prev) => ({
                    ...prev,
                    image: data.data.url,
                }));
            } else {
                alert("Image upload failed");
            }
        } catch (error) {
            console.log(error);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: session.user.id,
                        ...formData,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                alert("Profile updated successfully.");

                // refresh session/avatar
                window.location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-96 rounded-3xl bg-gray-200 animate-pulse"></div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="rounded-3xl bg-[#1E293B] p-8 text-white">
                <h1 className="text-4xl font-bold">
                    Update Profile
                </h1>

                <p className="mt-2 text-gray-300">
                    Update your personal information.
                </p>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white shadow p-8"
            >
                {/* Profile Image */}

                <div className="flex flex-col items-center gap-5 mb-10">

                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary">

                        <Image
                            src={
                                formData.image ||
                                "https://i.ibb.co/4pDNDk1/avatar.png"
                            }
                            alt="Profile"
                            fill
                            className="object-cover"
                        />

                    </div>

                    <label
                        htmlFor="profileImage"
                        className="cursor-pointer rounded-xl bg-primary px-6 py-3 font-semibold text-black hover:opacity-90 transition"
                    >
                        {uploading
                            ? "Uploading..."
                            : "Upload New Photo"}
                    </label>

                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                    />

                </div>

                {/* Inputs */}

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block mb-2 text-black font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 text-black outline-none focus:border-primary"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-black font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={formData.email}
                            readOnly
                            className="w-full rounded-xl border bg-gray-100 p-3 text-black"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-black font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+8801XXXXXXXXX"
                            className="w-full rounded-xl border p-3 text-black outline-none focus:border-primary"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-black font-medium">
                            Address
                        </label>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Dhaka, Bangladesh"
                            className="w-full rounded-xl border p-3 text-black outline-none focus:border-primary"
                        />

                    </div>

                </div>

                <Button
                    type="submit"
                    color="primary"
                    isLoading={saving || uploading}
                    className="mt-8"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}