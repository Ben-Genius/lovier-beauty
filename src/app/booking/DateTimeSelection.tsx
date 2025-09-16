"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  useBookingStore,
  getAvailableSlotsForDate,
} from "@/store/bookingStore";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimeSelectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

export function DateTimeSelection({ onNext }: DateTimeSelectionProps) {
  const {
    bookingData,
    updateBookingData,
    availableSlots,
    setAvailableSlots,
    isLoading,
    setLoading,
  } = useBookingStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    bookingData.date || null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    bookingData.time || null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // --- calendar generation (kept from original) ---
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Start from Sunday

    const days: {
      date: Date;
      isCurrentMonth: boolean;
      isPast: boolean;
      isToday: boolean;
      isSelected: boolean;
      isAvailable: boolean;
      day: number;
      weekdayShort: string;
      shortLabel: string;
    }[] = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isSelected =
        selectedDate ? date.getTime() === selectedDate.getTime() : false;
      const isSunday = date.getDay() === 0; // Closed on Sundays

      const weekdayShort = date.toLocaleDateString("en-US", {
        weekday: "short",
      }); // Mon, Tue
      const shortLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }); // Dec 15

      days.push({
        date,
        isCurrentMonth,
        isPast,
        isToday,
        isSelected,
        isAvailable: isCurrentMonth && !isPast && !isSunday,
        day: date.getDate(),
        weekdayShort,
        shortLabel,
      });
    }

    return days;
  };

  // --- handlers ---
  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    updateBookingData({ date, time: undefined });

    setLoading(true);
    try {
      const slots = await getAvailableSlotsForDate(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateBookingData({ time });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  // --- formatters ---
  const formatDateLong = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const calendarDays = generateCalendarDays();

  // Keep concise month title like the original UI
  const monthTitle = `${currentMonth.toLocaleDateString("en-US", {
    month: "long",
  })} ${currentMonth.getFullYear()}`;

  // submit that continues to next step (booking data already updated via handlers)
  const handleSubmit = () => {
    onNext();
  };

  return (
    <div>
      <h2 className="text-3xl font-light text-black mb-2 tracking-tight">
        Select <span className="font-medium">Date & Time</span>
      </h2>

      <p className="text-black/60 font-light mb-8">
        Choose when you would like your{" "}
        {bookingData?.service?.name
          ? bookingData.service.name.toLowerCase()
          : "appointment"}{" "}
        appointment.
      </p>

      {/* Service summary (keeps info from original but styled) */}
      {bookingData.service && (
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-2xl border border-black/5">
          <div className="text-sm font-medium">{bookingData.service.name}</div>
          <div className="text-sm text-black/40">•</div>
          <div className="text-sm font-medium">
            ${bookingData.service.price}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Month header + nav */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">{monthTitle}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date pills (keeps availability rules) */}
        <div>
          <h4 className="text-sm font-medium text-black/80 mb-3">
            Available Dates
          </h4>

          <div className="grid grid-cols-5 gap-3">
            {calendarDays
              // show only current month's dates (mimicking the simpler UI)
              .filter((d) => d.isCurrentMonth)
              .slice(0, 35) // keep grid manageable; calendarDays already spans 6 weeks
              .map((d) => {
                const disabled = !d.isAvailable;
                const isSelected =
                  selectedDate && d.date.getTime() === selectedDate.getTime();

                return (
                  <motion.button
                    key={d.date.toISOString()}
                    onClick={() => !disabled && handleDateSelect(d.date)}
                    whileHover={{ scale: disabled ? 1 : 1.02 }}
                    whileTap={{ scale: disabled ? 1 : 0.98 }}
                    className={`p-3 rounded-2xl border text-center text-sm transition-all flex flex-col items-center justify-center
                      ${
                        disabled
                          ? "border-black/5 text-black/30 bg-black/2 cursor-not-allowed"
                          : isSelected
                          ? "border-white bg-purple-500 text-white"
                          : "border-black/10 hover:border-black/20 bg-white text-black"
                      }
                    `}
                    disabled={disabled}
                    title={
                      d.isAvailable
                        ? formatDateLong(d.date)
                        : d.isPast
                        ? "Past"
                        : "Unavailable"
                    }
                  >
                    <span className="text-xs">{d.weekdayShort}</span>
                    <span className="text-sm font-medium">{d.shortLabel}</span>
                    {d.isToday && !isSelected && (
                      <span className="text-[10px] mt-1 px-1 py-0.5 rounded-full bg-black/5">
                        Today
                      </span>
                    )}
                  </motion.button>
                );
              })}
          </div>

          <div className="mt-3 text-xs text-black/50">
            • Closed on Sundays — Available slots: Mon–Sat, 9AM–7PM
          </div>
        </div>

        {/* Time selection area */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-black flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available Times
            </h4>
          </div>

          {!selectedDate ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-black/30 mx-auto mb-3" />
              <p className="text-black/50">Please select a date first</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-black/50">Loading available times...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-black/50">No available slots for this date</p>
            </div>
          ) : (
            <>
              <div className="mb-3 text-sm text-black/60">
                {selectedDate && formatDateLong(selectedDate)}
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {availableSlots.map((slot) => {
                  const disabled = !slot.available;
                  const active = selectedTime === slot.time;

                  return (
                    <motion.button
                      key={slot.time}
                      onClick={() => !disabled && handleTimeSelect(slot.time)}
                      whileHover={{ scale: disabled ? 1 : 1.02 }}
                      whileTap={{ scale: disabled ? 1 : 0.98 }}
                      className={`p-3 rounded-2xl border text-center text-sm transition-all
                        ${
                          disabled
                            ? "border-black/5 text-black/30 bg-black/2 cursor-not-allowed"
                            : active
                            ? "border-white bg-purple-500 text-white"
                            : "border-black/10 hover:border-black/20 bg-white text-black"
                        }
                      `}
                      disabled={disabled}
                    >
                      {formatTime(slot.time)}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Continue CTA */}
      {selectedDate && selectedTime && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 px-8 py-4 bg-purple-600 text-white font-medium rounded-2xl hover:bg-purple-700 transition-colors"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
}
