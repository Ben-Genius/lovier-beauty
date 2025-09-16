"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Users, Star, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Data ---------- */

type Stat = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  suffix?: string;
  label: string;
  description: string;
};

const stats: Stat[] = [
  {
    id: 1,
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers who trust us with their beauty needs",
  },
  {
    id: 2,
    icon: Star,
    number: 4.9,
    suffix: "/5",
    label: "Average Rating",
    description: "Based on genuine reviews from our valued clients",
  },
  {
    id: 3,
    icon: Calendar,
    number: 1200,
    suffix: "+",
    label: "Appointments",
    description: "Successfully completed beauty transformations",
  },
  {
    id: 4,
    icon: Award,
    number: 3,
    suffix: " Years",
    label: "Experience",
    description: "Of dedicated service in the beauty industry",
  },
];

const trustIndicators = [
  "Licensed & Insured",
  "Health Department Certified",
  "Premium Products Only",
  "Expert Trained Staff",
];

/* ---------- CountUp (keeps same behavior) ---------- */

function CountUp({
  end,
  duration,
  suffix = "",
  isVisible,
}: {
  end: number;
  duration: number;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    let startTime: number | null = null;
    let rafId = 0;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(end * easeOut);

      if (progress < 1) rafId = requestAnimationFrame(animate);
      else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    // small delay for nicer sequencing
    const timeout = window.setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [end, duration, isVisible, hasAnimated]);

  if (suffix === "/5") {
    return (
      <span>
        {count.toFixed(1)}
        {suffix}
      </span>
    );
  }

  if (suffix === " Years") {
    return (
      <span>
        {Math.round(count)}
        {suffix}
      </span>
    );
  }

  return (
    <span>
      {Math.round(count)}
      {suffix}
    </span>
  );
}

/* ---------- Card (grid item) ---------- */

function StatCard({
  stat,
  index,
  isVisible,
  onOpen,
}: {
  stat: Stat;
  index: number;
  isVisible: boolean;
  onOpen: (stat: Stat) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <motion.button
        // Use layoutId so overlay can share layout (smooth zoom)
        layoutId={`stat-${stat.id}`}
        onClick={() => onOpen(stat)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        className={cn(
          "relative overflow-hidden bg-white rounded-3xl p-8 text-center shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-300 w-full h-full",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/10"
        )}
        aria-haspopup="dialog"
        aria-label={`${stat.label} details`}
      >
        <motion.div
          className="relative mb-6 mx-auto"
          animate={{
            scale: isHovered ? 1.06 : 1,
            rotate: isHovered ? [0, -4, 4, 0] : 0,
          }}
          transition={{
            scale: { type: "spring", stiffness: 350, damping: 25 },
            rotate: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>

          <motion.div
            className="absolute inset-0 w-16 h-16 bg-black/10 rounded-2xl mx-auto blur-xl"
            animate={{ opacity: isHovered ? 0.28 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>

        <motion.div
          className="text-4xl md:text-5xl font-light text-black mb-3 tracking-tight"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          <CountUp
            end={stat.number}
            duration={2.2}
            suffix={stat.suffix}
            isVisible={isVisible}
          />
        </motion.div>

        <motion.h3
          className="text-lg font-semibold text-black mb-3 tracking-tight"
          animate={{ y: isHovered ? -2 : 0 }}
        >
          {stat.label}
        </motion.h3>

        <motion.p
          className="text-black/60 leading-relaxed font-light text-sm"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        >
          {stat.description}
        </motion.p>

        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px bg-black origin-center"
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{ transformOrigin: "center" }}
        />
      </motion.button>
    </motion.div>
  );
}

/* ---------- Expanded Overlay ---------- */

function ExpandedStatOverlay({
  stat,
  onClose,
  isVisible,
}: {
  stat: Stat | null;
  onClose: () => void;
  isVisible: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (stat) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [stat]);

  // click outside to close
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (!overlayRef.current) return;
      const target = e.target as HTMLElement;
      if (target.dataset?.backdrop === "true") onClose();
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {stat && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          ref={overlayRef}
          data-backdrop="true"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            data-backdrop="true"
          />

          {/* Center container (shared layoutId for smooth zoom) */}
          <motion.div
            layoutId={`stat-${stat.id}`}
            className="relative z-[110] w-full max-w-3xl mx-4 md:mx-0 bg-white rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.98, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 20, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {/* top strip with icon */}
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-light">
                    <CountUp
                      end={stat.number}
                      duration={1.5}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                  </div>
                  <div className="text-sm text-black/60">{stat.label}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  aria-label="Close details"
                  className="p-2 rounded hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 pb-8">
              <p className="text-black/75 text-base md:text-lg leading-relaxed">
                {stat.description}
              </p>

              <hr className="my-6 border-t border-black/5" />

              {/* Extra content: trust indicators and CTA area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3">
                    Why clients trust us
                  </h4>
                  <ul className="space-y-2 text-sm text-black/70">
                    {trustIndicators.map((t) => (
                      <li key={t} className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-black rounded-full" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Quick facts</h4>
                  <ul className="text-sm text-black/70 space-y-2">
                    <li>• Established 2021 • Kumasi, Ghana</li>
                    <li>• Licensed & fully insured</li>
                    <li>• Premium product lines only</li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-sm font-medium shadow">
                      Book an Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Final Section Component ---------- */

export default function RedesignedStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const [selected, setSelected] = useState<Stat | null>(null);

  return (
    <section ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-black rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 36 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="text-black/60 text-sm font-medium tracking-widest uppercase mb-6">
            Trusted Excellence
          </p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-6 tracking-tight leading-tight">
            Trusted by
            <br />
            <span className="font-medium">Beauty Enthusiasts</span>
          </h2>

          <p className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has earned us the trust and loyalty of
            hundreds of satisfied clients across the community.
          </p>
        </motion.div>

        {/* Grid (uses responsive columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((s, i) => (
            <StatCard
              key={s.id}
              stat={s}
              index={i}
              isVisible={isInView}
              onOpen={(stat) => setSelected(stat)}
            />
          ))}
        </div>

        {/* small divider & trust indicators (kept below grid for hierarchy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="w-24 h-px bg-black/20 mx-auto mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustIndicators.map((t, idx) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.9,
                }}
                transition={{ duration: 0.45, delay: 0.2 + idx * 0.08 }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-black/70 font-medium">{t}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-black/40 font-light mt-10">
            Established 2021 • Kumasi, Ghana
          </p>
        </motion.div>
      </div>

      {/* Expanded overlay */}
      <ExpandedStatOverlay
        stat={selected}
        onClose={() => setSelected(null)}
        isVisible={isInView}
      />

      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(black 1px, transparent 1px),
            linear-gradient(90deg, black 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
