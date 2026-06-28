"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  ReceiptText,
  Search,
} from "lucide-react";
import {
  Button,
  Spinner,
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalTransactions, setTotalTransactions] =
    useState(0);

  const fetchTransactions = async () => {
    const {data: tokenData} = await authClient.token()
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions?page=${page}&limit=10&search=${search}`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        }
      }
      );

      const data = await res.json();

      if (data.success) {
        setTransactions(data.transactions);
        setTotalTransactions(data.totalTransactions);
        setTotalPages(data.totalPages);
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

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold">
            Subscription Transactions
          </h1>

          <p className="text-default-500 mt-2">
            {totalTransactions} successful transactions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-3 text-default-400"
            />

            <input
              className="w-full sm:w-72 border rounded-xl pl-10 pr-3 py-2"
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
            startContent={<RefreshCw size={18} />}
            onPress={fetchTransactions}
            className="w-full sm:w-auto"
          >
            Refresh
          </Button>

        </div>

      </div>

      <div className="relative rounded-2xl border bg-content1 shadow-sm overflow-hidden">

        {loading && transactions.length > 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <Spinner size="lg" />
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl">

          <table className="w-full min-w-[700px] lg:min-w-[900px]">

            <thead className="bg-default-100 border-b text-sm">
              <tr>
                <th className="text-left p-4">
                  Transaction ID
                </th>

                <th className="text-left p-4">
                  User/Lawyer Email
                </th>

                <th className="text-left p-4">
                  Type
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

                <th className="text-left p-4">
                  Payment Date
                </th>
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

                    <ReceiptText
                      size={46}
                      className="mx-auto mb-4 text-default-400"
                    />

                    <h3 className="text-lg font-semibold">
                      No Transactions Found
                    </h3>

                    <p className="text-default-500 mt-2">
                      Try another search keyword.
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

                      <div className="font-mono text-xs break-all max-w-[180px]">
                        {tx.transactionId}
                      </div>

                    </td>

                    <td className="p-4">

                      <div className="break-all">
                        {tx.email || "N/A"}
                      </div>

                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.type === "Verification"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                          }`}
                      >
                        {tx.type}
                      </span>

                    </td>

                    <td className="p-4">

                      <span className="font-bold text-green-600">
                        ${tx.amount ?? 0}
                      </span>

                    </td>

                    <td className="p-4 whitespace-nowrap">

                      {tx.paymentDate
                        ? new Date(
                          tx.paymentDate
                        ).toLocaleDateString()
                        : "N/A"}

                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
        {totalPages > 1 && (
          <div className="border-t p-4 sm:p-5">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              <Button
                variant="flat"
                isDisabled={page === 1}
                onPress={() => setPage((prev) => prev - 1)}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>

              <span className="text-sm sm:text-base font-medium text-center">
                Page <span className="font-bold">{page}</span> of{" "}
                <span className="font-bold">{totalPages}</span>
              </span>

              <Button
                variant="flat"
                isDisabled={page === totalPages}
                onPress={() => setPage((prev) => prev + 1)}
                className="w-full sm:w-auto"
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