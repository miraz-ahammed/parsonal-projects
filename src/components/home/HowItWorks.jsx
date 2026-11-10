import { FiEdit3, FiCheckCircle, FiHeart, FiDollarSign } from "react-icons/fi";
import FadeIn from "./FadeIn";

const steps = [
  { icon: FiEdit3, title: "Create a Campaign", text: "Creators share their story, set a funding goal and pick a deadline." },
  { icon: FiCheckCircle, title: "Get Approved", text: "Our admins review every campaign before it goes live to supporters." },
  { icon: FiHeart, title: "Receive Contributions", text: "Supporters contribute credits and the raised amount grows in real time." },
  { icon: FiDollarSign, title: "Withdraw Your Funds", text: "Once you reach 200 credits, request a withdrawal and get paid." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <h2 className="text-center text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
          From first idea to funded project in four simple steps.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <FadeIn key={title} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Icon size={26} />
              </div>
              <p className="mt-4 text-sm font-semibold text-emerald-700">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}