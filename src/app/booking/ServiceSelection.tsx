// src/components/ServiceSelection.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { services, Service, BookingData } from "@/store/bookingStore";

interface ServiceSelectionProps {
  onNext: () => void;
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
}

/** helper: format duration (minutes -> "1h 30m" or "45m") */
const formatDuration = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
};

/** optional category icon map (lucide-react icons can be swapped) */
const CategoryIcon: React.FC<{ category: Service["category"] }> = ({
  category,
}) => {
  // small lightweight icon mapping — adjust to taste
  switch (category) {
    case "lashes":
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M2 12s4-8 10-8 10 8 10 8" strokeWidth="1.5" />
        </svg>
      );
    case "nails":
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 2v20" strokeWidth="1.5" />
        </svg>
      );
    case "braids":
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 18h16" strokeWidth="1.5" />
        </svg>
      );
    case "pedicures":
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      );
    case "piercings":
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 2l3 7H9l3-7z" strokeWidth="1.5" />
        </svg>
      );
    default:
      return <div className="w-5 h-5" />;
  }
};

export default function ServiceSelection({
  onNext,
  bookingData,
  setBookingData,
}: ServiceSelectionProps) {
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    bookingData.service
  );

  const handleSelect = (service: Service) => {
    setSelectedService(service);
    setBookingData({ ...bookingData, service });
  };

  return (
    <div>
      <h2 className="text-3xl font-light text-black mb-2 tracking-tight">
        Choose Your <span className="font-medium">Service</span>
      </h2>
      <p className="text-black/60 font-light mb-8">
        Select the beauty service you would like to book today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const active = selectedService?.id === service.id;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleSelect(service)}
              whileHover={{ y: -4 }}
              className={`relative p-5 rounded-2xl border transition-all cursor-pointer
                ${
                  active
                    ? "border-purple-200 bg-black/5 shadow-sm"
                    : "border-black/10 hover:border-black/20"
                }
              `}
              role="button"
              aria-pressed={active}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(service);
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/60 border border-black/5 shrink-0">
                    <CategoryIcon category={service.category} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {service.name}
                    </h3>
                    <p className="text-sm text-black/50 mt-1 max-w-[36ch]">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      active
                        ? "border-purple-400 bg-purple-500"
                        : "border-purple-100 bg-transparent"
                    }`}
                    aria-hidden
                  >
                    {active && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>

                  <div className="text-sm text-black/60 mt-2 text-right">
                    <div>${service.price}</div>
                    <div className="text-xs">
                      {formatDuration(service.duration)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedService && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 px-6 py-4 bg-purple-600 text-white font-medium rounded-2xl"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
}
