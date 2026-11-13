"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiClock, FiUser } from "react-icons/fi";
import { dummyCampaigns, categories, daysLeft } from "@/lib/dummyCampaigns";

export default function ExploreCampaignsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // শুধু যেগুলোর deadline শেষ হয়নি
  const filtered = dummyCampaigns.filter((c) => {
    const active = daysLeft(c.deadline) > 0;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || c.category === category;
    return active && matchSearch && matchCategory;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Explore Campaigns</h1>
      <p className="mt-1 text-sm text-gray-600">
        Find a campaign you believe in and contribute your credits.
      </p>

      {/* Search + filter */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns by title"
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No campaigns match your search.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => {
            const percent = Math.min(100, Math.round((c.raised / c.goal) * 100));
            return (
              <div
                key={c.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {c.category}
                  </span>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-gray-900">
                    {c.title}
                  </h3>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <FiUser /> {c.creatorName}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiClock /> {c.deadline} ({daysLeft(c.deadline)} days left)
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="font-semibold text-emerald-700">
                      {c.raised.toLocaleString()} raised
                    </span>
                    <span className="text-gray-500">
                      Goal {c.goal.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/explore-campaigns/${c.id}`}
                    className="mt-5 rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}