"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const stats = [
  { label: "Campaigns Funded", value: 1200, suffix: "+" },
  { label: "Active Supporters", value: 8500, suffix: "+" },
  { label: "Credits Contributed", value: 450000, suffix: "" },
  { label: "Creators Paid Out", value: 640, suffix: "+" },
];

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="bg-emerald-700 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Our Impact in Numbers</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-emerald-100">
          Every contribution helps a creator move one step closer to their goal.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-emerald-100">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}