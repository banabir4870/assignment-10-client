"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hireId = searchParams.get("hireId");
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const verifyPayment = async () => {
            if (!hireId || !sessionId) {
                setError("Invalid payment session");
                setLoading(false);
                return;
            }
            const {data: tokenData} = await authClient.token()

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/payment/success`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${tokenData?.token}`
                        },
                        body: JSON.stringify({ hireId }),
                    }
                );

                const data = await res.json();
                if (!data.success) {
                    setError(data.message || "Failed to update payment status");
                }
            } catch (err) {
                console.log(err);
                setError("Something went wrong verifying your payment");
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [hireId, sessionId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <h2 className="mt-4 text-xl font-semibold">Verifying Payment...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-3xl font-bold text-red-600">Payment Error</h2>
                <p className="mt-2 text-default-500">{error}</p>
                <Button
                    color="primary"
                    className="mt-6"
                    onClick={() => router.push("/dashboard/user/hiring-history")}
                >
                    Return to History
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle2 size={80} className="text-green-500" />
            <h2 className="mt-6 text-4xl font-bold text-green-600">Payment Successful!</h2>
            <p className="mt-4 text-lg text-default-500 max-w-lg">
                Your payment has been processed successfully. You can now leave a comment for this lawyer.
            </p>
            <Button
                color="primary"
                className="mt-8 px-8 py-4 font-semibold text-white"
                onClick={() => router.push("/dashboard/user/hiring-history")}
            >
                View Hiring History
            </Button>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
