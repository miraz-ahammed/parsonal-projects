
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Turn Your Big Idea Into Reality",
    text: "Launch a campaign in minutes and rally supporters who believe in your vision.",
    cta: "Explore Campaigns",
    href: "/explore",
    bg: "from-emerald-600 to-teal-800",
  },
  {
    title: "Back the Projects You Believe In",
    text: "Contribute credits to causes, products and creative work that matter to you.",
    cta: "Start Supporting",
    href: "/register",
    bg: "from-teal-600 to-cyan-800",
  },
  {
    title: "Raise Funds, Withdraw With Ease",
    text: "Every 20 credits your campaign raises turns into 1 dollar you can withdraw.",
    cta: "Become a Creator",
    href: "/register",
    bg: "from-emerald-700 to-green-900",
  },
];

export default function Hero() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className={`flex min-h-[70vh] items-center bg-gradient-to-br ${s.bg} px-4 py-20 text-white`}
            >
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
                >
                  {s.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-5 max-w-xl text-base text-emerald-50 sm:text-lg"
                >
                  {s.text}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <Link
                    href={s.href}
                    className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition-transform hover:scale-105"
                  >
                    {s.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}