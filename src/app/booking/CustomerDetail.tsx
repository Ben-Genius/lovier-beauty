"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useBookingStore } from "@/store/bookingStore";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

interface CustomerDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export function CustomerDetails({ onNext, onPrev }: CustomerDetailsProps) {
  const { bookingData, updateBookingData } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: bookingData.customerInfo?.name || "",
      email: bookingData.customerInfo?.email || "",
      phone: bookingData.customerInfo?.phone || "",
      notes: bookingData.customerInfo?.notes || "",
    },
  });

  const watched = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call / processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    updateBookingData({
      customerInfo: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
      },
    });

    setIsSubmitting(false);
    onNext();
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

  return (
    <div>
      <h2 className="text-3xl font-light text-black mb-2 tracking-tight">
        Your <span className="font-medium">Details</span>
      </h2>
      <p className="text-black/60 font-light mb-8">
        Let us know how to reach you for your appointment.
      </p>

      {/* Compact booking summary (keeps original data & formatting) */}
      {bookingData.service && bookingData.date && bookingData.time && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl border border-black/5 bg-white"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">
              <div className="text-xs text-black/50">Service</div>
              <div className="font-medium">{bookingData.service.name}</div>
            </div>

            <div className="text-sm text-center">
              <div className="text-xs text-black/50">Date</div>
              <div className="font-medium text-sm">
                {formatDate(bookingData.date)}
              </div>
            </div>

            <div className="text-sm text-right">
              <div className="text-xs text-black/50">Time</div>
              <div className="font-medium">{formatTime(bookingData.time)}</div>
            </div>

            <div className="text-sm">
              <div className="text-xs text-black/50">Price</div>
              <div className="font-medium">${bookingData.service.price}</div>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name + Email (two-column on md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
              <motion.input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-4 pl-12 rounded-2xl border transition-colors outline-none text-sm ${
                  errors.name
                    ? "border-red-300 ring-red-200"
                    : "border-black/10 focus:border-black"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
              <motion.input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                whileFocus={{ scale: 1.01 }}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-4 pl-12 rounded-2xl border transition-colors outline-none text-sm ${
                  errors.email
                    ? "border-red-300 ring-red-200"
                    : "border-black/10 focus:border-black"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
            <motion.input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[\+]?[0-9\s\-\(\)]+$/,
                  message: "Invalid phone number format",
                },
              })}
              whileFocus={{ scale: 1.01 }}
              type="tel"
              placeholder="Enter your phone number"
              className={`w-full px-4 py-4 pl-12 rounded-2xl border transition-colors outline-none text-sm ${
                errors.phone
                  ? "border-red-300 ring-red-200"
                  : "border-black/10 focus:border-black"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Special Requests (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/30" />
            <motion.textarea
              {...register("notes")}
              whileFocus={{ scale: 1.01 }}
              rows={4}
              placeholder="Any allergies, preferences, or special requests..."
              className="w-full px-4 py-4 pl-12 rounded-2xl border border-black/10 outline-none text-sm resize-none"
            />
          </div>
        </div>

        {/* Booking policy card */}
        <div className="rounded-2xl border border-black/5 p-4 bg-white text-sm text-black/60">
          <div className="font-medium text-black mb-2">Booking Policy</div>
          <ul className="space-y-1">
            <li>
              • Please arrive 10 minutes before your scheduled appointment
            </li>
            <li>• Cancellations must be made at least 24 hours in advance</li>
            <li>• A deposit may be required for certain services</li>
            <li>• We maintain strict hygiene and safety protocols</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="text-neutral-600 hover:text-black/80 font-medium transition-colors"
          >
            ← Back to Date & Time
          </button>

          <div className="ml-auto">
            <motion.button
              type="submit"
              disabled={isSubmitting || !isValid}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: isSubmitting || !isValid ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || !isValid ? 1 : 0.98 }}
              className={`px-6 py-3 rounded-2xl font-medium text-white transition-all ${
                isSubmitting || !isValid
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-black hover:bg-black/90"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2 text-sm">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : (
                "Review Booking →"
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
