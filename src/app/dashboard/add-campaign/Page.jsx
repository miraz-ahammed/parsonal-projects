"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

// TODO: backend ready হলে API থেকে আনবে (creator_email দিয়ে)
const initialCampaigns = [
  { id: "m1", title: "Solar-Powered Water Pump for Rural Villages", story: "Many villages near the river still depend on diesel pumps that break down every monsoon. We plan to install five solar-powered pumps.", rewardInfo: "Your name on the village water board.", category: "Environment", goal: 6000, raised: 4800, deadline: "2027-02-20", status: "approved" },
  { id: "m2", title: "Rooftop Gardens for Dhaka Neighbourhoods", story: "We turn unused rooftops into vegetable gardens that feed local families and cool the buildings below.", rewardInfo: "A starter pack of seasonal seeds.", category: "Environment", goal: 3000, raised: 2400, deadline: "2027-01-14", status: "approved" },
  { id: "m3", title: "Street Mural Festival in Old Dhaka", story: "Twenty local painters will brighten the lanes of Old Dhaka with murals that tell neighbourhood stories.", rewardInfo: "A limited-edition postcard set.", category: "Art", goal: 2800, raised: 0, deadline: "2027-03-22", status: "pending" },
  { id: "m4", title: "Low-Cost Smart Meter for Small Shops", story: "Our smart meter shows daily electricity use on a phone and costs a fraction of imported devices.", rewardInfo: "A discounted meter at launch.", category: "Technology", goal: 7000, raised: 0, deadline: "2027-04-01", status: "rejected" },
];

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [editing, setEditing] = useState(null);

  // deadline অনুযায়ী descending (নতুন deadline আগে)
  const sorted = [...campaigns].sort((a, b) =>
    b.deadline.localeCompare(a.deadline)
  );

  const handleDelete = async (campaign) => {
    const result = await Swal.fire({
      title: "Delete this campaign?",
      text: "All approved supporters will be refunded their credits.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    // TODO: backend ready হলে DELETE /campaigns/:id (সাথে refund)
    setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
    toast.success("Campaign deleted.");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const story = form.story.value.trim();
    const rewardInfo = form.rewardInfo.value.trim();

    if (!title || !story || !rewardInfo) {
      return toast.error("Please fill in every field.");
    }

    // TODO: backend ready হলে PATCH /campaigns/:id
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === editing.id ? { ...c, title, story, rewardInfo } : c
      )
    );
    toast.success("Campaign updated.");
    setEditing(null);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">My Campaigns</h1>
      <p className="mt-1 text-sm text-gray-600">
        All campaigns you have launched, newest deadline first.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">Campaign</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Goal</th>
              <th className="px-5 py-3">Raised</th>
              <th className="px-5 py-3">Deadline</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                  You have not added any campaign yet.
                </td>
              </tr>
            ) : (
              sorted.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="max-w-xs px-5 py-4 font-medium text-gray-900">
                    {c.title}
                  </td>
                  <td className="px-5 py-4 text-gray-700">{c.category}</td>
                  <td className="px-5 py-4 text-gray-900">
                    {c.goal.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 font-semibold text-emerald-700">
                    {c.raised.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{c.deadline}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditing(c)}
                        className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                      >
                        <FiEdit2 /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Update Campaign</h2>
              <button
                onClick={() => setEditing(null)}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  defaultValue={editing.title}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Campaign story
                </label>
                <textarea
                  name="story"
                  rows={5}
                  defaultValue={editing.story}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Reward info
                </label>
                <input
                  name="rewardInfo"
                  defaultValue={editing.rewardInfo}
                  className={inputClass}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="flex-1 rounded-lg border