"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  ReceiptText,
  Search,
  CreditCard,
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

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalTransactions,
    setTotalTransactions] = useState(0);

  const fetchTransactions = async () => {
    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions?page=${page}&limit=10&search=${search}`
      );

      const data = await res.json();

      if (data.success) {

        setTransactions(data.transactions);

        setTotalTransactions(
          data.totalTransactions
        );

        setTotalPages(data.totalPages);

      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to load transactions"
      );

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

  return (
    <div className="space-y-8">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Subscription Transactions
          </h1>

          <p className="text-default-500 mt-2">
            {totalTransactions} successful transactions
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-default-400"
            />

            <input
              className="w-72 border rounded-xl pl-10 pr-3 py-2"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

          </div>

          <Button
            color="primary"
            variant="flat"
            startContent={
              <RefreshCw size={18} />
            }
            onPress={fetchTransactions}
          >
            Refresh
          </Button>

        </div>

      </div>

      <div className="relative rounded-2xl border bg-content1 shadow-sm overflow-hidden">

        {loading &&
          transactions.length > 0 && (

            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-20">

              <Spinner size="lg" />

            </div>

          )}

        <div className="overflow-x-auto">

          <table className="min-w-[900px] w-full">

            <thead className="bg-default-100 border-b">
              <tr>
                <th className="text-left p-4">Transaction ID</th>
                <th className="text-left p-4">User/Lawyer Email</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {loading && transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Spinner size="lg" />
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <ReceiptText size={40} className="mx-auto mb-3 text-default-400" />
                    <p className="text-default-500">No transactions found.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx._id} className="border-b hover:bg-default-50 transition">
                    <td className="p-4">
                      <div className="font-mono text-xs">
                        {tx.transactionId}
                      </div>
                    </td>
                    <td className="p-4">
                      {tx.email || "N/A"}
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        tx.type === "Verification" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-green-600">
                        ${tx.amount ?? 0}
                      </span>
                    </td>
                    <td className="p-4">
                      {tx.paymentDate ? new Date(tx.paymentDate).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

        {totalPages > 1 && (

          <div className="border-t p-5 flex justify-center gap-5">

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