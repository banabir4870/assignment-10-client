"use client";

import { useEffect, useState } from "react";
import {
    Search,
    RefreshCw,
    Trash2,
    Shield,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
    Input,
    Spinner,
    Avatar,
    Chip,
} from "@heroui/react";

import { toast } from "react-hot-toast";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [total, setTotal] = useState(0);

    const [totalPages, setTotalPages] = useState(1);

    const [updatingId, setUpdatingId] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users?page=${page}&limit=10&search=${encodeURIComponent(search)}`
            );

            const data = await res.json();

            if (data.success) {
                setUsers(data.users);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(timer);
    }, [page, search]);

    const updateRole = async (id, role) => {
        try {
            setUpdatingId(id);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Role Updated");

                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === id
                            ? {
                                ...user,
                                role,
                            }
                            : user
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Update Failed");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteUser = async (user) => {
        const ok = window.confirm(
            `Delete ${user.name || user.email}?`
        );

        if (!ok) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/${user._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("User Deleted");

                fetchUsers();
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Delete Failed");
        }
    };
    return (
        <div className="p-6 space-y-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        Manage Users
                    </h1>

                    <p className="text-default-500 mt-1">
                        Total Users : {total}
                    </p>
                </div>

                <div className="flex items-center gap-2">

                    <Search size={18} className="text-gray-500" />

                    <Input
                        placeholder="Search by name, email or role..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-80"
                    />

                </div>

            </div>

            {/* Table */}

            <div className="border rounded-xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-default-100">

                            <tr>

                                <th className="text-left p-4">
                                    User
                                </th>

                                <th className="text-left p-4">
                                    Email
                                </th>

                                <th className="text-left p-4">
                                    Role
                                </th>

                                <th className="text-left p-4">
                                    Joined
                                </th>

                                <th className="text-right p-4">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-20 text-center"
                                    >
                                        <Spinner />
                                    </td>

                                </tr>

                            ) : users.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-20 text-center"
                                    >
                                        No Users Found
                                    </td>

                                </tr>

                            ) : (

                                users.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-default-50"
                                    >

                                        {/* User */}

                                        <td className="p-4">

                                            <div className="flex items-center gap-3">

                                                <Avatar
                                                    src={user.image}
                                                    name={user.name}
                                                />

                                                <div>

                                                    <p className="font-semibold">
                                                        {user.name || "No Name"}
                                                    </p>

                                                    {user.plan === "pro" && (
                                                        <Chip
                                                            size="sm"
                                                            color="warning"
                                                            variant="flat"
                                                        >
                                                            PRO
                                                        </Chip>
                                                    )}

                                                </div>

                                            </div>

                                        </td>

                                        {/* Email */}

                                        <td className="p-4">
                                            {user.email}
                                        </td>

                                        {/* Role */}

                                        <td className="p-4">

                                            {user.role === "admin" ? (

                                                <Chip color="danger">
                                                    <div className="flex items-center gap-1">
                                                        <Shield size={12} />
                                                        Admin
                                                    </div>
                                                </Chip>

                                            ) : (

                                                <select
                                                    value={user.role}
                                                    disabled={updatingId === user._id}
                                                    onChange={(e) =>
                                                        updateRole(
                                                            user._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border rounded-lg px-3 py-2 bg-transparent"
                                                >
                                                    <option value="user">
                                                        User
                                                    </option>

                                                    <option value="lawyer">
                                                        Lawyer
                                                    </option>

                                                </select>

                                            )}

                                        </td>

                                        {/* Joined */}

                                        <td className="p-4">

                                            {user.createdAt
                                                ? new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()
                                                : "--"}

                                        </td>

                                        {/* Action */}

                                        <td className="p-4 text-right">

                                            {user.role !== "admin" && (

                                                <Button
                                                    isIconOnly
                                                    color="danger"
                                                    variant="light"
                                                    onClick={() =>
                                                        deleteUser(user)
                                                    }
                                                >
                                                    <Trash2 size={18} />
                                                </Button>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>
                {/* Pagination */}

                {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t">

                        <p className="text-sm text-default-500">
                            Page {page} of {totalPages}
                        </p>

                        <div className="flex gap-2">

                            <Button
                                size="sm"
                                variant="flat"
                                isDisabled={page === 1}
                                startContent={<ChevronLeft size={16} />}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </Button>

                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            )
                                .slice(
                                    Math.max(0, page - 3),
                                    Math.max(5, page + 2)
                                )
                                .map((number) => (
                                    <Button
                                        key={number}
                                        size="sm"
                                        color={
                                            number === page
                                                ? "primary"
                                                : "default"
                                        }
                                        variant={
                                            number === page
                                                ? "solid"
                                                : "flat"
                                        }
                                        onClick={() => setPage(number)}
                                    >
                                        {number}
                                    </Button>
                                ))}

                            <Button
                                size="sm"
                                variant="flat"
                                isDisabled={page === totalPages}
                                endContent={<ChevronRight size={16} />}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </Button>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}