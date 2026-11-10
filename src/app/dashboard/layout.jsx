"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiCompass,
  FiList,
  FiCreditCard,
  FiClock,
  FiPlusCircle,
  FiFolder,
  FiDollarSign,
  FiUsers,
  FiCheckSquare,
  FiFlag,
  FiBell,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

// Role অনুযায়ী sidebar menu
const MENUS = {
  supporter: [
    { href: "/dashboard/supporter-home", label: "Home", icon: FiHome },
    { href: "/dashboard/explore-campaigns", label: "Explore Campaigns", icon: FiCompass },
    { href: "/dashboard/my-contributions", label: "My Contributions", icon: FiList },
    { href: "/dashboard/purchase-credit", label: "Purchase Credit", icon: FiCreditCard },
    { href: "/dashboard/payment-history", label: "Payment History", icon: FiClock },
  ],
  creator: [
    { href: "/dashboard/creator-home", label: "Home", icon: FiHome },
    { href: "/dashboard/add-campaign", label: "Add New Campaign", icon: FiPlusCircle },
    { href: "/dashboard/my-campaigns", label: "My Campaigns", icon: FiFolder },
    { href: "/dashboard/withdrawals", label: "Withdrawals", icon: FiDollarSign },
    { href: "/dashboard/payment-history", label: "Payment History", icon: FiClock },
  ],
  admin: [
    { href: "/dashboard/admin-home", label: "Home", icon: FiHome },
    { href: "/dashboard/manage-users", label: "Manage Users", icon: FiUsers },
    { href: "/dashboard/manage-campaigns", label: "Manage Campaigns", icon: FiCheckSquare },
    { href: "/dashboard/withdrawal-requests", label: "Withdrawal Requests", icon: FiDollarSign },
    { href: "/dashboard/reports", label: "Reports", icon: FiFlag },
  ],
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "supporter";
  const menu = MENUS[role] || MENUS.supporter;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Private route: loading শেষ হওয়ার পরেই শুধু login এ পাঠাবে
  // (এতে reload করলে login পেজে চলে যাবে না)
  useEffect(() => {
    if (!isPending && !user) router.replace("/login");
  }, [isPending, user, router]);

  // Role guard: নিজের role এর বাইরের পেজে গেলে নিজের home এ ফেরত পাঠাবে
  useEffect(() => {
    if (!user || pathname === "/dashboard") return;
    const allowed = menu.some((m) => pathname.startsWith(m.href));
    if (!allowed) router.replace(menu[0].href);
  }, [user, pathname, menu, router]);

  // পেজ বদলালে mobile sidebar বন্ধ হবে
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    localStorage.removeItem("access-token");
    router.push("/");
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-lg font-bold text-white">
              F
            </span>
            <span className="text-xl font-bold text-gray-900">FundSpark</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menu.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu size={22} />
          </button>

          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            {/* Credits | Image */}
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
              <FaCoins />
              {user.credits ?? 0}
            </div>

            {/* Notification (পরে popup যোগ হবে) */}
            <button
              className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <FiBell size={20} />
            </button>

            {/* Role | Name */}
            <div className="flex items-center gap-3">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name || "User"}
                className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
              />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold capitalize text-emerald-700">
                  {role}
                </p>
                <p className="max-w-[140px] truncate text-sm text-gray-700">
                  {user.name}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-4 text-center text-sm text-gray-600">
          &copy; 2026 FundSpark. All rights reserved.
        </footer>
      </div>
    </div>
  );
}