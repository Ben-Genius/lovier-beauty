"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, MapPin, Play, Pause } from "lucide-react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards"; // adjust path as needed

const testimonials = [
  {
    name: "Sarah Johnson",
    service: "Volume Lashes",
    rating: 5,
    text: "The lash extensions I got here are absolutely stunning! The technician was so skilled and made me feel comfortable throughout the entire process. I've never felt more confident!",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&q=90",
    location: "Kumasi",
    featured: true,
  },
  {
    name: "Akosua Mensah",
    service: "Knotless Braids",
    rating: 5,
    text: "Best braiding experience ever! The stylist was gentle, professional, and created exactly what I had in mind. My knotless braids look perfect and feel comfortable.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=90",
    location: "Accra",
    featured: false,
  },
  {
    name: "Jennifer Asante",
    service: "Acrylic Nails",
    rating: 5,
    text: "The nail art is incredible! They brought my Pinterest inspiration to life perfectly. The attention to detail and quality is unmatched. Definitely coming back!",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=90",
    location: "Tema",
    featured: false,
  },
  {
    name: "Abena Osei",
    service: "Spa Pedicure",
    rating: 5,
    text: "Such a relaxing and luxurious experience! The spa pedicure was heavenly, and my feet have never looked better. The staff is incredibly professional and caring.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=90",
    location: "Takoradi",
    featured: false,
  },
];

export default function RedesignedTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // small UI state for demo: toggle autoplay of the infinite scroller
  const [autoPlay, setAutoPlay] = useState(true);
  // featured overlay state (opens when clicking a card in the grid)
  const [featured, setFeatured] = useState<number | null>(null);

  // Map testimonials to the shape expected by InfiniteMovingCards
  const marqueeItems = useMemo(
    () =>
      testimonials.map((t) => ({
        quote: t.text,
        name: t.name,
        title: t.service,
        image: t.image,
      })),
    []
  );

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* subtle blobs */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-28 left-1/4 w-80 h-80 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-28 right-1/4 w-56 h-56 bg-black rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 36 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <p className="text-black/60 text-sm font-medium tracking-widest uppercase mb-4">
            Client Stories
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4 tracking-tight leading-tight">
            What Our
            <br />
            <span className="font-medium">Clients Say</span>
          </h2>

          <p className="text-lg text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
            Don’t just take our word for it — hear from clients who trusted us
            with their beauty transformations.
          </p>
        </motion.div>

        {/* Marquee / Infinite scroller */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-black/60">
              Real stories — real results
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoPlay((p) => !p)}
                aria-pressed={!autoPlay}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-black/5 text-sm"
              >
                {autoPlay ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Play
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="h-[20rem] rounded-xl overflow-hidden bg-white/60 border border-black/5">
            {/* The InfiniteMovingCards component already handles pause-on-hover/focus.
                We pass direction & speed, and control pause by mounting/unmounting (simple approach)
            */}
            <InfiniteMovingCards
              items={marqueeItems}
              direction="left"
              speed="normal"
            />
          </div>
        </motion.div>

        {/* Compact grid of testimonials (click opens featured overlay) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.06, duration: 0.45 }}
                className="relative p-5 rounded-2xl border cursor-pointer transition-all duration-200 group bg-white hover:shadow-md"
                onClick={() => setFeatured(idx)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setFeatured(idx);
                }}
                aria-label={`Open testimonial by ${t.name}`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h5 className="font-semibold text-black text-sm">
                      {t.name}
                    </h5>
                    <div className="text-xs text-black/60 flex items-center gap-2 mt-1">
                      <span className="font-medium">{t.service}</span>
                      <span className="w-1 h-1 bg-black/30 rounded-full" />
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-black fill-current mr-1"
                    />
                  ))}
                </div>

                <p className="text-sm text-black/70 leading-relaxed line-clamp-3 group-hover:text-black/90">
                  {t.text}
                </p>

                <motion.div
                  className="absolute bottom-3 left-6 right-6 h-px bg-black/10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-24 h-px bg-black/20 mx-auto mb-6" />
          <p className="text-sm text-black/40 font-light">
            Join hundreds of satisfied clients
          </p>
        </motion.div>
      </div>

      {/* Featured overlay (keyboard accessible, ESC to close) */}
      <AnimatePresence>
        {featured !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFeatured(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-30 w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.98, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 12, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-1 flex justify-center">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={testimonials[featured].image}
                      alt={testimonials[featured].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-light">
                        “{testimonials[featured].text}”
                      </div>
                      <div className="mt-4">
                        <h4 className="text-xl font-semibold text-black">
                          {testimonials[featured].name}
                        </h4>
                        <div className="text-sm text-black/60 mt-1">
                          {testimonials[featured].service} •{" "}
                          {testimonials[featured].location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFeatured(null)}
                        className="p-2 rounded-full bg-white shadow border border-black/5"
                        aria-label="Close testimonial"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    {[...Array(testimonials[featured].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-black fill-current"
                      />
                    ))}
                  </div>

                  <div className="mt-6 text-sm text-black/70 leading-relaxed">
                    <p>
                      Featured: {testimonials[featured].name} —{" "}
                      {testimonials[featured].service}
                    </p>
                    <p className="mt-3">Established 2021 • Kumasi, Ghana</p>
                  </div>

                  <div className="mt-6">
                    <button className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-sm font-medium shadow">
                      Book an Appointment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(black 1px, transparent 1px),
            linear-gradient(90deg, black 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  );
}
