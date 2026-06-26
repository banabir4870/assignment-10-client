"use client";

import { useEffect, useState } from "react";
import {
    Search,
    RefreshCw,
    ReceiptText,
} from "lucide-react";
import {
    Button,
    Spinner,
} from "@heroui/react";
import { toast } from "react-hot-toast";

export default function AllTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [totalTransactions, setTotalTransactions] =
        useState(0);

    const fetchTransactions = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions?page=${page}&limit=10&search=${search}`
            );

            const data = await res.json();

            if (data.success) {
                setTransactions(data.transactions);
                setTotalPages(data.totalPages);
                setTotalTransactions(
                    data.totalTransactions
                );
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchTransactions();
        }, 300);

        return () => clearTimeout(timeout);
    }, [page, search]);

    const paymentColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-700";

            case "unpaid":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const requestColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "accepted":
                return "bg-green-100 text-green-700";

            case "completed":
                return "bg-blue-100 text-blue-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

                <div>

                    <h1 className="text-3xl font-bold">
                        All Transactions
                    </h1>

                    <p className="text-default-500 mt-1">
                        {totalTransactions} successful payment
                        records
                    </p>

                </div>

                <div className="flex items-center gap-2">

                    <input
                        className="w-72 border rounded-lg px-3 py-2"
                        placeholder="Search client, lawyer or email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    <Button
                        color="primary"
                        variant="flat"
                        onPress={fetchTransactions}
                        startContent={<RefreshCw size={2} />}
                    >
                        Refresh
                    </Button>

                </div>

            </div>

            <div className="relative rounded-2xl border bg-content1 overflow-hidden shadow-sm">

                {loading && transactions.length > 0 && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20">
                        <Spinner size="lg" />
                    </div>
                )}

                <div className="overflow-x-auto">

                    <table className="min-w-[1100px] w-full">

                        <thead className="bg-default-100 border-b">

                            <tr>

                                <th className="text-left p-4">
                                    Transaction
                                </th>

                                <th className="text-left p-4">
                                    Client
                                </th>

                                <th className="text-left p-4">
                                    Lawyer
                                </th>

                                <th className="text-left p-4">
                                    Amount
                                </th>

                                <th className="text-left p-4">
                                    Payment
                                </th>

                                <th className="text-left p-4">
                                    Request
                                </th>

                                <th className="text-left p-4">
                                    Request Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading &&
                                transactions.length === 0 ? (
                                <tr>

                                    <td
                                        colSpan={7}
                                        className="py-20 text-center"
                                    >
                                        <Spinner size="lg" />
                                    </td>

                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>

                                    <td
                                        colSpan={7}
                                        className="py-20 text-center"
                                    >

                                        <ReceiptText
                                            size={40}
                                            className="mx-auto mb-3 text-default-400"
                                        />

                                        <p className="text-default-500">
                                            No paid transactions found.
                                        </p>

                                    </td>

                                </tr>
                            ) : (
                                transactions.map((tx) => (
                                    <tr
                                        key={tx._id}
                                        className="border-b hover:bg-default-50 transition"
                                    >

                                        <td className="p-4">

                                            <div className="font-mono text-xs">
                                                {tx._id.slice(-8)}
                                            </div>

                                            {tx.checkoutSessionId && (
                                                <div className="text-[10px] text-default-400 mt-1">
                                                    Stripe
                                                </div>
                                            )}

                                        </td>

                                        <td className="p-4">

                                            <div className="font-semibold">
                                                {tx.userName}
                                            </div>

                                            <div className="text-xs text-default-500">
                                                {tx.userEmail}
                                            </div>

                                        </td>

                                        <td className="p-4">
                                            {tx.lawyerName}
                                        </td>

                                        <td className="p-4 font-bold text-green-600">
                                            $
                                            {Number(
                                                tx.lawyerFee
                                            ).toFixed(2)}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColor(
                                                    tx.paymentStatus
                                                )}`}
                                            >
                                                {
                                                    tx.paymentStatus
                                                }
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${requestColor(
                                                    tx.status
                                                )}`}
                                            >
                                                {tx.status}
                                            </span>

                                        </td>

                                        <td className="p-4 text-sm">

                                            <div>
                                                {new Date(
                                                    tx.createdAt
                                                ).toLocaleDateString()}
                                            </div>

                                            {tx.paymentDate && (
                                                <div className="text-xs text-default-500 mt-1">
                                                    Paid :{" "}
                                                    {new Date(
                                                        tx.paymentDate
                                                    ).toLocaleDateString()}
                                                </div>
                                            )}

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>

                {totalPages > 1 && (
                    <div className="border-t p-5 flex justify-center items-center gap-5">

                        <Button
                            variant="flat"
                            isDisabled={page === 1}
                            onPress={() =>
                                setPage(page - 1)
                            }
                        >
                            Previous
                        </Button>

                        <span className="font-medium">
                            Page {page} of {totalPages}
                        </span>

                        <Button
                            variant="flat"
                            isDisabled={
                                page === totalPages
                            }
                            onPress={() =>
                                setPage(page + 1)
                            }
                        >
                            Next
                        </Button>

                    </div>
                )}

            </div>

        </div>
    );
}