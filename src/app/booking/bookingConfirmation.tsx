"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBookingStore } from "@/store/bookingStore";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface BookingConfirmationProps {
  onReset: () => void;
}

export function BookingConfirmation({ onReset }: BookingConfirmationProps) {
  const { bookingData } = useBookingStore();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const confirmBooking = async () => {
    setIsConfirming(true);

    // Simulate API call to confirm booking
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, save to DB and return ID
    const bookingId = `LBH-${Date.now().toString().slice(-6)}`;

    const confirmedBooking = {
      id: bookingId,
      ...bookingData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    // Demo persistence
    localStorage.setItem(
      `booking_${bookingId}`,
      JSON.stringify(confirmedBooking)
    );

    setIsConfirming(false);
    setIsConfirmed(true);
  };

  const formatDate = (date: Date) =>
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-light text-black mb-3 tracking-tight"
        >
          Booking <span className="font-medium">Confirmed!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-black/60 mb-6"
        >
          We've sent a confirmation to your email. See the details below or book
          another appointment.
        </motion.p>

        <div className="flex gap-3 justify-center mb-6">
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-black text-white rounded-2xl font-medium"
          >
            Book Another Appointment
          </motion.button>

          <Link
            href="/gallery"
            className="px-6 py-3 border rounded-2xl font-medium text-black/80 hover:bg-black/5"
          >
            View Our Work
          </Link>
        </div>

        <div className="text-xs text-black/50">
          You will receive appointment reminders via email and SMS.
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-light text-black mb-2 tracking-tight">
          Review <span className="font-medium">Your Booking</span>
        </h2>
        <p className="text-black/60 text-sm">
          Please confirm the details below before finalizing.
        </p>
      </div>

      {/* Compact summary card */}
      <div className="rounded-2xl p-6 mb-6 bg-white border border-black/5 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-black/50">Appointment</div>
            <div className="font-medium">{bookingData.service?.name}</div>
            <div className="text-sm text-black/50">
              {bookingData.service &&
                `${formatDuration(bookingData.service.duration)} • $${
                  bookingData.service.price
                }`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs text-black/50">Date</div>
            <div className="font-medium">
              {bookingData.date && formatDate(bookingData.date)}
            </div>

            <div className="text-xs text-black/50 mt-3">Time</div>
            <div className="font-medium">
              {bookingData.time && formatTime(bookingData.time)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-black/50">Customer</div>
            <div className="font-medium">{bookingData.customerInfo?.name}</div>

            <div className="text-xs text-black/50 mt-3">Contact</div>
            <div className="text-sm text-black/70 flex flex-col gap-1">
              {bookingData.customerInfo?.email && (
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {bookingData.customerInfo.email}
                </span>
              )}
              {bookingData.customerInfo?.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {bookingData.customerInfo.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {bookingData.customerInfo?.notes && (
          <div className="mt-4 text-sm text-black/70">
            <div className="text-xs text-black/50">Notes</div>
            <div className="mt-1">{bookingData.customerInfo.notes}</div>
          </div>
        )}
      </div>

      {/* Studio info */}
      <div className="rounded-2xl p-5 mb-6 bg-neutral-50 border border-black/5">
        <div className="flex items-start gap-4 mb-3">
          <div className="pt-1">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="font-medium">Lovier Beauty Hub</div>
            <div className="text-sm text-black/60">
              123 Beauty Street, Kumasi, Ghana
            </div>
            <div className="text-sm text-black/60 mt-2">+233 24 123 4567</div>
          </div>
        </div>

        <div className="text-sm text-black/60">
          <div>• Please arrive 10 minutes early</div>
          <div>• Complimentary consultation included</div>
          <div>• Premium products & strict hygiene</div>
        </div>
      </div>

      {/* Pricing */}
      <div className="rounded-2xl p-5 mb-6 bg-neutral-50 border border-black/5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-black/60">
            {bookingData.service?.name}
          </div>
          <div className="font-medium">${bookingData.service?.price}</div>
        </div>
        <div className="border-t border-black/5 pt-3">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-black/80">${bookingData.service?.price}</span>
          </div>
          <div className="text-xs text-black/50 mt-1">
            Payment due at appointment
          </div>
        </div>
      </div>

      {/* Confirm CTA */}
      <div className="text-center">
        <motion.button
          onClick={confirmBooking}
          disabled={isConfirming}
          whileHover={{ scale: isConfirming ? 1 : 1.02 }}
          whileTap={{ scale: isConfirming ? 1 : 0.98 }}
          className={`px-10 py-3 rounded-2xl font-semibold text-white transition-all ${
            isConfirming
              ? "bg-neutral-400 cursor-not-allowed"
              : "bg-black hover:bg-black/90 shadow-sm"
          }`}
        >
          {isConfirming ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Confirming Appointment...
            </div>
          ) : (
            "Confirm Booking"
          )}
        </motion.button>

        <div className="text-xs text-black/50 mt-3">
          By confirming you agree to our terms & cancellation policy
        </div>
      </div>
    </div>
  );
}
