"use client";

import { authClient } from "@/lib/auth-client";

// TODO: backend ready হলে API থেকে আনবে
const supporterPayments = [
  { id: "TXN-1007", credits: 300, amount: 25, date: "2026-11-10", status: "paid" },
  { id: "TXN-1006", credits: 100, amount: 10, date: "2026-11-02", status: "paid" },
  { id: "TXN-1005", credits: 800, amount: 60, date: "2026-10-21", status: "paid" },
  { id: "TXN-1004", credits: 100, amount: 10, date: "2026-10-09", status: "paid" },
];

const creatorWithdrawals = [
  { id: "WD-204", credits: 400, amount: 20, system: "Bkash", account: "01712-345678", date: "2026-11-08", status: "approved" },
  { id: "WD-198", credits: 200, amount: 10, system: "Nagad", account: "01911-223344", date: "2026-10-18", status: "approved" },
  { id: "WD-190", credits: 600, amount: 30, system: "Stripe", account: "acct_****4821", date: "2026-10-01", status: "approved" },
];

function Table({ headers, children }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-5 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
      {status}
    </span>
  );
}

export default function PaymentHistoryPage() {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role || "supporter";
  const isCreator = role === "creator";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
      <p className="mt-1 text-sm text-gray-600">
        {isCreator
          ? "All withdrawal payments made to you."
          : "All credit purchases you have made."}
      </p>

      {isCreator ? (
        <Table headers={["ID", "Date", "Credits", "Amount", "Payment system", "Account", "Status"]}>
          {creatorWithdrawals.map((w) => (
            <tr key={w.id} className="hover:bg-gray-50">
              <td className="px-5 py-4 font-medium text-gray-900">{w.id}</td>
              <td className="px-5 py-4 text-gray-600">{w.date}</td>
              <td className="px-5 py-4 text-gray-900">{w.credits}</td>
              <td className="px-5 py-4 font-semibold text-gray-900">${w.amount}</td>
              <td className="px-5 py-4 text-gray-700">{w.system}</td>
              <td className="px-5 py-4 text-gray-700">{w.account}</td>
              <td className="px-5 py-4"><StatusBadge status={w.status} /></td>
            </tr>
          ))}
        </Table>
      ) : (
        <Table headers={["Transaction ID", "Date", "Credits", "Amount paid", "Status"]}>
          {supporterPayments.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-5 py-4 font-medium text-gray-900">{p.id}</td>
              <td className="px-5 py-4 text-gray-600">{p.date}</td>
              <td className="px-5 py-4 text-gray-900">{p.credits} credits</td>
              <td className="px-5 py-4 font-semibold text-gray-900">${p.amount}</td>
              <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}