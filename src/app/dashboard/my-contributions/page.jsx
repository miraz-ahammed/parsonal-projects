"use client";

import { useState } from "react";
import { dummyContributions } from "@/lib/dummyContributions";

const PAGE_SIZE = 5;

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function MyContributionsPage() {
  const [page, setPage] = useState(1);

  const total = dummyContributions.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const rows = dummyContributions.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">My Contributions</h1>
      <p className="mt-1 text-sm text-gray-600">
        Every contribution you have made, with its current status.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">Campaign</th>
              <th className="px-5 py-3">Creator</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="max-w-xs px-5 py-4 font-medium text-gray-900">
                  {c.campaignTitle}
                </td>
                <td className="px-5 py-4 text-gray-700">{c.creatorName}</td>
                <td className="px-5 py-4 font-semibold text-gray-900">
                  {c.amount} credits
                </td>
                <td className="px-5 py-4 text-gray-600">{c.date}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-gray-600">
          Showing {start + 1}-{Math.min(start + PAGE_SIZE, total)} of {total}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-lg text-sm font-medium ${
                n === page
                  ? "bg-emerald-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}