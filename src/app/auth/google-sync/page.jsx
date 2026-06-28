"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function GoogleSyncPage() {
    const router = useRouter();

    useEffect(() => {
        const sync = async () => {
            const session = await authClient.getSession();

            const user = session?.data?.user;

            if (!user) {
                router.replace("/auth/login");
                return;
            }

            await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/google-sync`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "user",
                    })
                }
            );

            router.replace("/");
        };

        sync();
    }, [router]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            Syncing account...
        </div>
    );
}