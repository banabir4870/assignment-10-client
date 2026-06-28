"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";

import { Bars, Xmark, Magnifier, ChevronDown } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const userData = authClient.useSession()
  const user = userData.data?.user;
  console.log("User Data:", user);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      router.push("/lawyers");
      return;
    }

    router.push(
      `/lawyers?search=${encodeURIComponent(keyword)}`
    );

    setOpen(false);
  };

  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Browse Lawyers",
      href: "/lawyers",
    },
    {
      title: "Dashboard",
      href: `/dashboard/${user?.role}`,
    }
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    redirect("/auth/login");
  }

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

              ${pathname === item.href
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

        </nav>

        {/* Right Side */}

        <div className="hidden items-center gap-4 lg:flex">

          <form onSubmit={handleSearch}>
            <div className="relative">
              <Magnifier className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lawyers..."
                className="h-11 w-72 rounded-full border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-[#C9A65B]"
              />
            </div>
          </form>

          {user ? (
            <button onClick={handleLogout} className="rounded-full bg-[#C9A65B] px-6 py-2 text-white transition hover:bg-red-600">
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
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

            <form onSubmit={handleSearch}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lawyers..."
                className="h-11 w-full rounded-full border border-zinc-200 px-4 outline-none focus:border-[#C9A65B]"
              />
            </form>

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-2 py-2

                ${pathname === item.href
                    ? "bg-[#C9A65B]/10 text-[#C9A65B]"
                    : ""
                  }`}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {user ? (
              <button onClick={handleLogout} className="w-full rounded-full bg-[#C9A65B] py-3 text-white transition hover:bg-red-600">
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
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