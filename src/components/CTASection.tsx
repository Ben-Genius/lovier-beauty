"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  MessageCircle,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export default function AppleCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-black relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm font-medium tracking-widest uppercase mb-8"
          >
            Ready to Begin?
          </motion.p>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready to Transform
            <br />
            <span className="font-medium">Your Look?</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/70 font-light max-w-4xl mx-auto leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Book your appointment today and experience the luxury of
            professional beauty services that will leave you feeling confident
            and radiant.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.a
              href="/booking"
              className="group flex items-center justify-center px-12 py-5 bg-white text-black font-semibold rounded-full text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95"
              whileHover={{
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-6 h-6 mr-4" />
              Book Appointment
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/contact"
              className="group flex items-center justify-center px-12 py-5 border-2 border-white/30 text-white font-semibold rounded-full text-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-6 h-6 mr-4" />
              Get Consultation
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="group"
          >
            <motion.div
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 30 },
              }}
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 25 },
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <Phone className="w-8 h-8 text-black" />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                Call Us
              </h3>
              <p className="text-white/70 font-light">+233 24 123 4567</p>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-8 right-8 h-px bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="group"
          >
            <motion.div
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 30 },
              }}
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 25 },
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <MapPin className="w-8 h-8 text-black" />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                Visit Us
              </h3>
              <p className="text-white/70 font-light">
                123 Beauty Street, Kumasi
              </p>

              <motion.div
                className="absolute bottom-0 left-8 right-8 h-px bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.div>
          </motion.div>

          {/* Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="group"
          >
            <motion.div
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 30 },
              }}
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 25 },
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <Clock className="w-8 h-8 text-black" />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                Hours
              </h3>
              <p className="text-white/70 font-light">Mon-Sat: 9AM-7PM</p>

              <motion.div
                className="absolute bottom-0 left-8 right-8 h-px bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <div className="w-24 h-px bg-white/30 mx-auto mb-8" />
          <p className="text-white/40 font-light text-sm">
            Experience beauty redefined • Established 2021
          </p>
        </motion.div>
      </div>

      {/* Subtle animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-32 h-32 bg-white/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-white/5 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Ultra-subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.008] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
