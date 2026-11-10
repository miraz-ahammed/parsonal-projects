import Link from "next/link";
import { FiCpu, FiPenTool, FiUsers, FiActivity, FiBookOpen, FiSun } from "react-icons/fi";
import FadeIn from "./FadeIn";

const categories = [
  { name: "Technology", icon: FiCpu },
  { name: "Art", icon: FiPenTool },
  { name: "Community", icon: FiUsers },
  { name: "Health", icon: FiActivity },
  { name: "Education", icon: FiBookOpen },
  { name: "Environment", icon: FiSun },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-gray-900">Explore by Category</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
            Find campaigns that match what you care about most.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon }, i) => (
            <FadeIn key={name} delay={i * 0.07}>
              <Link
                href={`/explore?category=${name}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-emerald-600 hover:bg-emerald-600"
              >
                <Icon size={30} className="text-emerald-700 group-hover:text-white" />
                <span className="text-sm font-semibold text-gray-800 group-hover:text-white">
                  {name}
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}