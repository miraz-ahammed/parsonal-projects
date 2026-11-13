"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiArrowLeft, FiClock, FiUser, FiGift } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { dummyCampaigns, daysLeft } from "@/lib/dummyCampaigns";

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const campaign = dummyCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold text-gray-800">Campaign not found.</p>
        <Link
          href="/dashboard/explore-campaigns"
          className="mt-3 inline-block text-emerald-700 hover:underline"
        >
          Back to campaigns
        </Link>
      </div>
    );
  }

  const percent = Math.min(
    100,
    Math.round((campaign.raised / campaign.goal) * 100)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);

    if (!value || value <= 0) return setError("Enter a valid amount.");
    if (value < campaign.minContribution)
      return setError(`Minimum contribution is ${campaign.minContribution} credits.`);
    if (value > (user?.credits ?? 0))
      return setError("You do not have enough credits.");

    setError("");
    // TODO: backend ready হলে এখানে POST /contributions হবে (status: pending)
    toast.success(
      `Contribution of ${value} credits sent. Waiting for creator approval.`
    );
    setAmount("");
  };

  return (
    <div>
      <Link
        href="/dashboard/explore-campaigns"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
      >
        <FiArrowLeft /> Back to campaigns
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        {/* Left: details */}
        <div className="lg:col-span-2">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="h-64 w-full rounded-2xl object-cover sm:h-80"
          />
          <span className="mt-5 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {campaign.category}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            {campaign.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <FiUser /> {campaign.creatorName}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> Deadline {campaign.deadline} ({daysLeft(campaign.deadline)} days left)
            </span>
          </div>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">Campaign story</h2>
          <p className="mt-2 leading-relaxed text-gray-700">{campaign.story}</p>

          <div className="mt-6 flex gap-3 rounded-xl bg-amber-50 p-4">
            <FiGift className="mt-1 shrink-0 text-amber-700" size={20} />
            <div>
              <p className="font-semibold text-amber-800">Reward for supporters</p>
              <p className="text-sm text-amber-900">{campaign.reward}</p>
            </div>
          </div>
        </div>

        {/* Right: funding + form */}
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-3xl font-extrabold text-emerald-700">
            {campaign.raised.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            credits raised of {campaign.goal.toLocaleString()} goal
          </p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-gray-500">{percent}% funded</p>

          <form onSubmit={handleSubmit} className="mt-5">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Contribution amount (credits)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Minimum ${campaign.minContribution}`}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

            <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              Your balance: <FaCoins className="text-amber-600" /> {user?.credits ?? 0}
            </p>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Contribute
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}