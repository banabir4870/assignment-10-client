"use client";

import { XCircle } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <XCircle size={80} className="text-red-500" />
            <h2 className="mt-6 text-4xl font-bold text-red-600">Payment Cancelled</h2>
            <p className="mt-4 text-lg text-default-500 max-w-lg">
                You have cancelled the payment process. Your hiring request remains accepted but unpaid.
            </p>
            <Button
                color="primary"
                className="mt-8 px-8 py-4 font-semibold text-white"
                onClick={() => router.push("/dashboard/user/hiring-history")}
            >
                Return to History
            </Button>
        </div>
    );
}
