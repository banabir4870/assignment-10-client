"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function ManageLegalProfilePage() {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [form, setForm] = useState({
        fullName: "",
        specialization: "Corporate Law",
        fee: "",
        bio: "",
        availability: "Available",
        image: "",
    });

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

    // -------------------------
    // FETCH PROFILE (SAFE VERSION)
    // -------------------------
    const fetchProfile = async (id) => {
        if (!id) return;

        try {
            setLoading(true);

            const res = await fetch(`${SERVER_URL}/lawyer/profile/user/${id}`);
            const data = await res.json();

            if (data.exists) {
                setHasProfile(true);
                setForm({
                    fullName: data.profile.fullName || "",
                    specialization: data.profile.specialization || "Corporate Law",
                    fee: data.profile.fee || "",
                    bio: data.profile.bio || "",
                    availability: data.profile.availability || "Available",
                    image: data.profile.image || "",
                });
            } else {
                setHasProfile(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // -------------------------
    // EFFECT (NO WARNING FIXED)
    // -------------------------
    useEffect(() => {
        const load = async () => {
            await fetchProfile(userId);
        };
        load();
    }, [userId])

    // -------------------------
    // INPUT HANDLER
    // -------------------------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // -------------------------
    // IMGBB UPLOAD
    // -------------------------
    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data?.data?.url;
    };

    // -------------------------
    // SAVE PROFILE
    // -------------------------
    const handleSave = async () => {
        try {
            setSaving(true);

            let imageUrl = form.image;

            if (imageFile) {
                imageUrl = await uploadToImgBB(imageFile);
            }

            await fetch(`${SERVER_URL}/lawyer/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    ...form,
                    image: imageUrl,
                }),
            });

            await fetchProfile(userId);

            alert("Profile saved successfully!");
        } catch (err) {
            console.log(err);
            alert("Error saving profile");
        } finally {
            setSaving(false);
        }
    };

    // -------------------------
    // UI
    // -------------------------
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen text-gray-900 rounded-2xl">

            {/* HEADER */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <h1 className="text-3xl font-bold">Manage Legal Profile</h1>
                <p className="text-gray-300">
                    Create and manage your lawyer profile
                </p>
            </div>

            {/* STATUS */}
            {!loading && (
                <div
                    className={`p-4 rounded-xl font-medium ${hasProfile
                            ? "bg-green-100 text-green-900"
                            : "bg-yellow-100 text-yellow-900"
                        }`}
                >
                    {hasProfile
                        ? "✔ Profile active - you can update anytime"
                        : "⚠ Please complete your profile"}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">

                {/* FORM */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow space-y-4 border text-gray-900">

                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder={session?.user?.name}
                        className="border p-3 w-full rounded text-gray-900 placeholder-gray-500"
                    />

                    <select
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        className="border p-3 w-full rounded text-gray-900"
                    >
                        <option>Corporate Law</option>
                        <option>Family Law</option>
                        <option>Criminal Law</option>
                        <option>Property Law</option>
                        <option>Immigration Law</option>
                        <option>Tax Law</option>
                        <option>Employment Law</option>
                        <option>Civil Litigation Law</option>
                        <option>Environmental Law</option>
                        <option>Cyber Law</option>
                        <option>Personal Injury Law</option>
                        <option>Bankruptcy Law</option>
                        <option>Constitutional Law</option>
                        <option>Business & Commercial Law</option>
                    </select>

                    <input
                        name="fee"
                        value={form.fee}
                        onChange={handleChange}
                        placeholder="Consultation Fee"
                        className="border p-3 w-full rounded text-gray-900 placeholder-gray-500"
                    />

                    <select
                        name="availability"
                        value={form.availability}
                        onChange={handleChange}
                        className="border p-3 w-full rounded text-gray-900"
                    >
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="border p-3 w-full rounded bg-white text-gray-900"
                    />

                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Professional Bio"
                        className="border p-3 w-full rounded text-gray-900 placeholder-gray-500"
                        rows={5}
                    />

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </button>
                </div>

                {/* PREVIEW */}
                <div className="bg-white p-6 rounded-xl shadow text-center border text-gray-900">

                    <img
                        src={
                            imageFile
                                ? URL.createObjectURL(imageFile)
                                : form.image || "https://i.pravatar.cc/200"
                        }
                        className="w-32 h-32 mx-auto rounded-full object-cover border"
                    />

                    <h2 className="mt-4 text-xl font-bold">
                        {form.fullName || "Lawyer Name"}
                    </h2>

                    <p className="text-gray-600">
                        Status: {form.availability}
                    </p>

                    <p className="text-amber-700 font-medium">
                        {form.specialization}
                    </p>

                    <p className="text-gray-700 mt-2">
                        ৳ {form.fee || 0}
                    </p>
                </div>

            </div>
        </div>
    );
}