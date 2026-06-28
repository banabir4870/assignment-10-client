"use client";

import Link from "next/link";
import { Scale, ArrowLeft, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="max-w-2xl text-center">

        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#C9A65B]/20 border border-[#C9A65B]/40 mb-8">
          <Scale className="h-12 w-12 text-[#C9A65B]" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-[#C9A65B] tracking-wider">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-5 text-slate-300 leading-7 max-w-xl mx-auto">
          Sorry, the page you're looking for doesn't exist, has been moved,
          or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A65B] px-7 py-3 font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-[#b88f37]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            href="/lawyers"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C9A65B] px-7 py-3 font-semibold text-[#C9A65B] transition-all duration-300 hover:bg-[#C9A65B] hover:text-slate-900"
          >
            <Search size={18} />
            Browse Lawyers
          </Link>

        </div>

        {/* Bottom Text */}
        <p className="mt-12 text-sm text-slate-500">
          LegalEase • Find & Hire Trusted Legal Professionals
        </p>

      </div>
    </section>
  );
};

export default NotFoundPage;