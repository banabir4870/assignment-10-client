import { Button } from "@heroui/react";
import { ShieldCheck, BadgeCheck, CreditCard, Sparkles } from "lucide-react";

export default function UpgradePage() {
    return (
        <div className="min-h-screen bg-slate-50 py-14">

            <div className="mx-auto w-11/12 max-w-7xl">

                {/* Hero */}

                <div className="overflow-hidden rounded-3xl bg-[#1E293B] shadow-xl">

                    <div className="grid lg:grid-cols-2 items-center">

                        <div className="p-10 lg:p-16">

                            <span className="inline-flex items-center gap-2 rounded-full bg-[#C9A65B]/20 px-4 py-2 text-sm text-[#C9A65B]">

                                <Sparkles size={16} />

                                Lawyer Free Plan

                            </span>

                            <h1 className="mt-6 text-5xl font-bold leading-tight text-white">

                                Upgrade Your
                                <span className="block text-[#C9A65B]">
                                    Legal Profile
                                </span>

                            </h1>

                            <p className="mt-6 max-w-lg text-lg text-gray-300">

                                Become a verified lawyer and publish unlimited legal
                                services to connect with thousands of clients across
                                the country.

                            </p>

                            <button className="mt-8 rounded-xl bg-[#C9A65B] px-8 py-4 font-semibold text-white transition hover:bg-[#ab8635]">

                                Upgrade Now

                            </button>

                        </div>

                        <div className="flex justify-center p-10">

                            <div className="rounded-3xl bg-white p-8 shadow-xl w-full max-w-md">

                                <p className="text-sm text-gray-500">

                                    Current Plan

                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-[#1E293B]">

                                    FREE

                                </h2>

                                <div className="my-6 h-[1px] bg-gray-200" />

                                <ul className="space-y-4">

                                    <li className="flex items-center gap-3 text-red-500">
                                        ✕ Dashboard Access
                                    </li>

                                    <li className="flex items-center gap-3 text-red-500">
                                        ✕ Profile Update
                                    </li>

                                    <li className="flex items-center gap-3 text-red-500">
                                        ✕ Publish Legal Services
                                    </li>

                                    <li className="flex items-center gap-3 text-red-500">
                                        ✕ Receive Hiring Requests
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Premium Card */}

                <div className="mt-14">

                    <div className="mx-auto max-w-xl rounded-3xl border border-[#C9A65B]/20 bg-white p-10 shadow-lg">

                        <div className="flex justify-center">

                            <div className="rounded-full bg-[#C9A65B]/10 p-4">

                                <BadgeCheck
                                    size={42}
                                    className="text-[#C9A65B]"
                                />

                            </div>

                        </div>

                        <h2 className="mt-5 text-center text-4xl font-bold text-[#1E293B]">

                            Premium Lawyer

                        </h2>

                        <p className="mt-2 text-center text-gray-500">

                            One-Time Verification Fee

                        </p>

                        <div className="mt-6 text-center">

                            <span className="text-6xl font-bold text-[#C9A65B]">

                                $ 15

                            </span>

                        </div>

                        <div className="my-8 h-[1px] bg-gray-200" />

                        <div className="space-y-5">

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-500" />

                                <span>Unlimited Legal Service Publishing</span>

                            </div>

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-500" />

                                <span>Verified Lawyer Badge</span>

                            </div>

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-500" />

                                <span>Accept Hiring Requests</span>

                            </div>

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-500" />

                                <span>Lifetime Premium Access</span>

                            </div>

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-500" />

                                <span>Priority Support</span>

                            </div>

                        </div>
                        <form action="/api/subscription" method="POST">
                            <input type="hidden" name="priceId" value="price_1TlXIPBaYecfmBeEa6Me9Bzh" />
                            <Button type="submit" className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A65B] py-4 font-semibold text-white transition hover:bg-[#ab8635]">

                            <CreditCard size={20} />

                            Upgrade with Stripe

                        </Button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-500">

                            Secure one-time payment • No monthly subscription

                        </p>

                    </div>

                </div>

                {/* Features */}

                <div className="mt-20">

                    <h2 className="text-center text-4xl font-bold text-[#1E293B]">

                        Why Upgrade?

                    </h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {[
                            "Unlimited Legal Services",
                            "Verified Lawyer Badge",
                            "Higher Search Visibility",
                            "Featured Lawyer Listing",
                            "Accept Hiring Requests",
                            "Lifetime Access",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#C9A65B]/10">

                                    <ShieldCheck
                                        className="text-[#C9A65B]"
                                    />

                                </div>

                                <h3 className="text-xl font-semibold text-[#1E293B]">

                                    {item}

                                </h3>

                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}

                <div className="mt-20 rounded-3xl bg-[#1E293B] px-10 py-16 text-center">

                    <h2 className="text-4xl font-bold text-white">

                        Ready to Grow Your Legal Career?

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-gray-300">

                        Join LegalEase Premium and start receiving verified client
                        hiring requests with unlimited service publishing.

                    </p>

                    <button className="mt-8 rounded-xl bg-[#C9A65B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#ab8635]">

                        Upgrade to Premium

                    </button>

                </div>

            </div>

        </div>
    );
}