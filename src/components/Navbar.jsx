"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiGithub } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
const GITHUB_CLIENT_REPO = "https://github.com/your-username/demoproject-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // পেজ বদলালে mobile menu বন্ধ হবে
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    localStorage.removeItem("access-token");
    router.push("/");
  };

  const links = user
    ? [{ href: "/dashboard", label: "Dashboard" }]
    : [
        { href: "/explore", label: "Explore Campaigns" },
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ];

  const linkClass = (href) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-emerald-50 text-emerald-700"
        : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
    }`;

  const DeveloperButton = ({ className = "" }) => (
    <a
      href={GITHUB_CLIENT_REPO}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 ${className}`}
    >
      <FiGithub className="text-base" />
      Join as Developer
    </a>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-lg font-bold text-white">
            F
          </span>
          <span className="text-xl font-bold text-gray-900">FundSpark</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          {user && (
            <>
              <div
                className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700"
                title="Available Credits"
              >
                <FaCoins />
                {user.credits ?? 0}
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-500"
                  aria-label="Open profile menu"
                >
                  <img
                    src={user.image || "https://i.ibb.co/placeholder/avatar.png"}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          <DeveloperButton />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </div>

          {user && !isPending && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.image || "https://i.ibb.co/placeholder/avatar.png"}
                  alt={user.name || "User"}
                  className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                  <FaCoins />
                  {user.credits ?? 0}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-3 w-full rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}

          <DeveloperButton className="mt-3 w-full justify-center" />
        </div>
      )}
    </header>
  );
}