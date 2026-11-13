"use client";

import Link from "next/link";
import { FaCoins } from "react-icons/fa";
import { creditPackages } from "@/lib/creditPackages";

export default function PurchaseCreditPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Purchase Credit</h1>
      <p className="mt-1 text-sm text-gray-600">
        Pick a package and top up your credits to support more campaigns.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {creditPackages.map((p) => {
          const best = p.credits === 1500;
          return (
            <Link
              key={p.credits}
              href={`/dashboard/purchase-credit/${p.credits}`}
              className={`relative rounded-2xl border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                best ? "border-emerald-600" : "border-gray-200"
              }`}
            >
              {best && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                  Best value
                </span>
              )}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <FaCoins size={26} />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-gray-900">
                {p.credits.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">credits</p>
              <p className="mt-4 text-2xl font-bold text-emerald-700">${p.price}</p>
              <span className="mt-5 inline-block w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white">
                Buy now
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}