import FadeIn from "./FadeIn";

// TODO: পরে Express API থেকে আনবে (raised অনুযায়ী top 6)
const campaigns = [
  { id: 1, title: "Solar-Powered Water Pump for Rural Villages", raised: 4800, goal: 6000, seed: "solar" },
  { id: 2, title: "Open-Source Learning App for Village Schools", raised: 4200, goal: 5000, seed: "learning" },
  { id: 3, title: "Community Library on Wheels", raised: 3650, goal: 4500, seed: "library" },
  { id: 4, title: "Handmade Clay Art Studio for Young Artists", raised: 3100, goal: 4000, seed: "clay" },
  { id: 5, title: "Free Health Camp for Riverside Communities", raised: 2750, goal: 3500, seed: "health" },
  { id: 6, title: "Rooftop Gardens for Dhaka Neighbourhoods", raised: 2400, goal: 3000, seed: "garden" },
];

export default function TopCampaigns() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Top Funded Campaigns
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
          These campaigns have raised the most credits from our community.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c, i) => {
          const percent = Math.min(100, Math.round((c.raised / c.goal) * 100));
          return (
            <FadeIn key={c.id} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <img
                  src={`https://picsum.photos/seed/${c.seed}/600/360`}
                  alt={c.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                    {c.title}
                  </h3>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-emerald-700">
                      {c.raised.toLocaleString()} credits raised
                    </span>
                    <span className="text-gray-500">{percent}%</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}