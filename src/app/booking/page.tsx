"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, Check, Calendar, User, Sparkles } from "lucide-react";
import ServiceSelection from "./ServiceSelection";
import { DateTimeSelection } from "./DateTimeSelection";
import { CustomerDetails } from "./CustomerDetail";
import { BookingConfirmation } from "./bookingConfirmation";
import { BookingData } from "@/store/bookingStore";

// Mock booking store (simplified for demo)
const useBookingStore = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  return {
    currentStep,
    setCurrentStep,
    bookingData,
    setBookingData,
    resetBooking: () => {
      setCurrentStep(1);
      setBookingData({});
    },
  };
};

const steps = [
  {
    id: 1,
    title: "Select Service",
    description: "Choose your beauty service",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Date & Time",
    description: "Pick your preferred slot",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Your Details",
    description: "Tell us about yourself",
    icon: User,
  },
  {
    id: 4,
    title: "Confirmation",
    description: "Review and confirm",
    icon: Check,
  },
];

export default function AppleBookingPage() {
  const {
    currentStep,
    setCurrentStep,
    bookingData,
    setBookingData,
    resetBooking,
  } = useBookingStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            onNext={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentStep(2);
                setIsTransitioning(false);
              }, 220);
            }}
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        );
      case 2:
        return <DateTimeSelection onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <CustomerDetails onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <BookingConfirmation onReset={resetBooking} />;
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/60 text-sm font-medium tracking-widest uppercase mb-6"
          >
            Book Appointment
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Book Your
            <br />
            <span className="font-medium">Appointment</span>
          </motion.h1>

          <motion.p
            className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Schedule your beauty transformation in just a few simple steps.
          </motion.p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="max-w-7xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {/* Step Circle */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                        currentStep > step.id
                          ? "bg-green-100 border-2 border-green-200"
                          : currentStep === step.id
                          ? "bg-purple-500 border-2 border-white"
                          : "bg-gray-100 border-2 border-gray-200"
                      }`}
                      whileHover={{
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-8 h-8 text-green-600" />
                      ) : (
                        <IconComponent
                          className={`w-8 h-8 ${
                            currentStep === step.id
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                    </motion.div>

                    {/* Step Info */}
                    <div className="text-center">
                      <h3
                        className={`font-semibold mb-1 tracking-tight transition-colors ${
                          currentStep >= step.id
                            ? "text-black"
                            : "text-black/40"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm font-light ${
                          currentStep >= step.id
                            ? "text-black/60"
                            : "text-black/30"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className={`flex-1 h-px mx-8 transition-all duration-500 ${
                        currentStep > step.id ? "bg-green-200" : "bg-gray-200"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: isTransitioning ? 30 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isTransitioning ? -30 : 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="bg-white rounded-3xl border border-black/5 shadow-sm p-12"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Only show for steps 2-3 */}
        {currentStep > 1 && currentStep < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center max-w-4xl mx-auto mt-8"
          >
            <motion.button
              onClick={prevStep}
              className="flex items-center px-8 py-4 border-2 border-black/20 text-black font-medium rounded-full transition-all duration-300 hover:border-black/40 hover:bg-black/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </motion.button>

            <div className="text-black/40 font-light text-sm">
              Step {currentStep} of {steps.length}
            </div>
          </motion.div>
        )}

        {/* Bottom accent */}
        {currentStep === 4 && (
          <motion.div
            className="text-center mt-16 pt-8 border-t border-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-black/40 font-light text-sm">
              We will send a confirmation email shortly • Questions? Contact us
              anytime
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
