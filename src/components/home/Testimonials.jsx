"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FadeIn from "./FadeIn";

const reviews = [
  { name: "Nusrat Jahan", role: "Creator", img: 47, quote: "My water-filter campaign hit its goal in three weeks. The dashboard made tracking every contribution simple." },
  { name: "Rafiq Ahmed", role: "Supporter", img: 12, quote: "I love seeing exactly where my credits go. Updates from creators make me feel part of the project." },
  { name: "Tasnim Akter", role: "Creator", img: 32, quote: "Withdrawing my earnings was quick and clear. The 20-credits-to-a-dollar rule is easy to understand." },
  { name: "Imran Hossain", role: "Supporter", img: 15, quote: "Buying credits takes a minute, and I can back several campaigns at once without any hassle." },
  { name: "Sadia Rahman", role: "Creator", img: 44, quote: "The platform helped my art studio find its first hundred supporters. I am truly grateful." },
];

export default function Testimonials() {
  return (
    <section className="bg-emerald-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            What Our Community Says
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
            Real stories from creators and supporters who use the platform every day.
          </p>
        </FadeIn>

        <Swiper
          className="!pb-12 mt-10"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          loop
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.name} className="!h-auto">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
                <p className="flex-1 text-gray-700">&ldquo;{r.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?img=${r.img}`}
                    alt={r.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <p className="text-sm text-emerald-700">{r.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}