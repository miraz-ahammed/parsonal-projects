"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { creditPackages } from "@/lib/creditPackages";

export default function CheckoutPage() {
  const { packageId } = useParams();
  const router = useRouter();
  const [paying, setPaying] = useState(false);

  const pack = creditPackages.find((p) => String(p.credits) === packageId);

  if (!pack) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold text-gray-800">Package not found.</p>
        <Link
          href="/dashboard/purchase-credit"
          className="mt-3 inline-block text-emerald-700 hover:underline"
        >
          Back to packages
        </Link>
      </div>
    );
  }

  const handlePay = async () => {
    setPaying(true);
    // TODO: এখানে Stripe payment হবে। এখন শুধু dummy payment।
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(`Payment successful! ${pack.credits} credits added.`);
    setPaying(false);
    router.push("/dashboard/payment-history");
  };

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href="/dashboard/purchase-credit"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
      >
        <FiArrowLeft /> Back to packages
      </Link>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Confirm your purchase</h1>

        <div className="mt-5 flex items-center gap-4 rounded-xl bg-amber-50 p-4">
          <FaCoins size={28} className="text-amber-600" />
          <div>
            <p className="text-lg font-bold text-gray-900">
              {pack.credits.toLocaleString()} credits
            </p>
            <p className="text-sm text-gray-600">Added to your account instantly</p>
          </div>
        </div>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Package</dt>
            <dd className="font-medium text-gray-900">{pack.credits} credits</dd>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <dt className="font-semibold text-gray-900">Total</dt>
            <dd className="text-lg font-bold text-emerald-700">${pack.price}</dd>
          </div>
        </dl>

        <button
          onClick={handlePay}
          disabled={paying}
          className="mt-6 w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {paying ? "Processing..." : `Pay $${pack.price}`}
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          This is a demo payment. Stripe will be connected later.
        </p>
      </div>
    </div>
  );
}