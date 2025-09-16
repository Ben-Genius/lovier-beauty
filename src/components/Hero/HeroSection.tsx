"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronRight, Star, Calendar, ArrowDown } from "lucide-react";
import lash from "../../../public/images/enhanced_image.png";
import hero from "../../../public/images/img-5.png";
import Image from "next/image";
const heroServices = [
  {
    title: "Premium Lashes",
    subtitle: "Classic • Hybrid • Volume",
    image: hero,
    description:
      "Enhance your natural beauty with expertly applied lash extensions",
  },
  {
    title: "Expert Braids",
    subtitle: "Box • Knotless • Passion Twists",
    image: lash,
    description:
      "Protective styling that celebrates your natural texture and beauty",
  },
  {
    title: "Luxury Nails",
    subtitle: "Acrylics • Gel • Press-ons",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=90",
    description: "Transform your nails into works of art with premium finishes",
  },
];

export default function AppleHeroSection() {
  const [currentService, setCurrentService] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const imageObjectPositions = {
    0: "object-top-right", // Premium Lashes
    1: "object-center", // Luxury Nails
    2: "object-bottom-left", // Expert Braids
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  useEffect(() => {
    if (!isVideoMode) {
      const timer = setInterval(() => {
        setCurrentService((prev) => (prev + 1) % heroServices.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isVideoMode]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Background Layer with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full h-[110vh]"
          >
            <Image
              src={heroServices[currentService].image}
              alt={heroServices[currentService].title}
              className={`w-full h-full object-cover ${
                heroServices[currentService].title === "Premium Lashes"
                  ? "object-top-right"
                  : heroServices[currentService].title === "Luxury Nails"
                    ? "object-center"
                    : "object-bottom-left"
              }`}
              fill={true}
            />

            {/* Dynamic overlay based on scroll */}
            <motion.div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Content Layer */}
      <motion.div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: contentY }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mb-16"
          >
            {/* Eyebrow Text - Apple Style */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 text-sm font-medium tracking-widest uppercase mb-6"
            >
              Premium Beauty Studio
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Unleash Your
              <br />
              <motion.span
                className="font-medium relative inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Inner Glow
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-px bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Experience premium beauty services in a luxurious, modern studio.
              <br className="hidden md:block" />
              From stunning lashes to intricate nail art, we bring your vision
              to life.
            </motion.p>
          </motion.div>

          {/* Service Carousel Info */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white font-medium">
                    {heroServices[currentService].title}
                  </span>
                  <span className="text-white/60 text-sm">
                    {heroServices[currentService].subtitle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href="/booking"
              className="group flex items-center px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95"
              whileHover={{
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book Appointment
              <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/services"
              className="flex items-center px-8 py-4 border border-white/30 text-white font-medium rounded-full backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Services
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-medium">500+ Happy Clients</span>
            </div>

            <div className="hidden md:block w-px h-6 bg-white/30" />

            <span className="font-medium">
              Licensed & Certified Professionals
            </span>

            <div className="hidden md:block w-px h-6 bg-white/30" />

            <span className="font-medium">Premium Hygiene Standards</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Service Navigation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
          {heroServices.map((service, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentService(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentService
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: index === currentService ? 1.25 : 1.1 }}
              whileTap={{ scale: 1 }}
            >
              {index === currentService && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center text-white/60 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm font-medium mb-2 group-hover:text-white transition-colors">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Ambient Elements */}
      <div className="absolute top-20 right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  );
}
