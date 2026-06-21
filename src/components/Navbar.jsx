"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Bars, Xmark, Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Demo
  const isLoggedIn = false;
  const role = "client";

  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Browse Lawyers",
      href: "/lawyers",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-[#1E293B] backdrop-blur-lg">
      <div className="mx-auto flex w-10/12 items-center justify-between py-2">

        {/* Logo */}

        <Link href="/" className="flex items-center">

          <Image
            src="/logo.png"
            alt="LegalEase"
            width={210}
            height={100}
            priority
            className="h-16 w-auto object-contain"
          />

        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-8 lg:flex">

          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-medium transition

              ${
                pathname === item.href
                  ? "text-[#C9A65B] font-semibold"
                  : "text-white hover:text-[#C9A65B]"
              }`}
            >
              {item.title}

              {pathname === item.href && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded bg-[#C9A65B]" />
              )}
            </Link>
          ))}

          {/* Dashboard */}

          <div className="relative">

            <button
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="flex items-center gap-1 font-medium text-white transition hover:text-[#C9A65B]"
            >
              Dashboard

              <ChevronDown className="h-4 w-4" />
            </button>

            {dashboardOpen && (
              <div className="absolute right-0 mt-4 w-56 rounded-xl border bg-white p-2 shadow-xl">

                {role === "client" && (
                  <>
                    <Link
                      href="/dashboard/profile"
                      className="block rounded-lg px-4 py-2 hover:bg-zinc-100"
                    >
                      My Profile
                    </Link>

                    <Link
                      href="/dashboard/bookings"
                      className="block rounded-lg px-4 py-2 hover:bg-zinc-100"
                    >
                      Appointments
                    </Link>

                    <Link
                      href="/dashboard/bookmarks"
                      className="block rounded-lg px-4 py-2 hover:bg-zinc-100"
                    >
                      Bookmarks
                    </Link>
                  </>
                )}

              </div>
            )}

          </div>

        </nav>

        {/* Right Side */}

        <div className="hidden items-center gap-4 lg:flex">

          <div className="relative">

            <Magnifier className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              placeholder="Search lawyers..."
              className="h-11 w-72 rounded-full border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-[#C9A65B]"
            />

          </div>

          {isLoggedIn ? (
            <button className="rounded-full bg-[#C9A65B] px-6 py-2 text-white transition hover:bg-[#ab8635]">
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[#C9A65B] px-6 py-2 text-white transition hover:bg-[#ab8635]"
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? (
            <Xmark className="h-7 w-7" />
          ) : (
            <Bars className="h-7 w-7" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div className="border-t bg-white lg:hidden">

          <div className="space-y-4 p-5">

            <input
              placeholder="Search lawyers..."
              className="h-11 w-full rounded-full border border-zinc-200 px-4 outline-none focus:border-[#C9A65B]"
            />

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-2 py-2

                ${
                  pathname === item.href
                    ? "bg-[#C9A65B]/10 text-[#C9A65B]"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="/dashboard"
              className="block rounded-lg px-2 py-2"
            >
              Dashboard
            </Link>

            {isLoggedIn ? (
              <button className="w-full rounded-full bg-[#C9A65B] py-3 text-white">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block rounded-full bg-[#C9A65B] py-3 text-center text-white"
              >
                Login
              </Link>
            )}

          </div>

        </div>

      )}

    </header>
  );
}