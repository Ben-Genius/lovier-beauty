"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Calendar, Clock, Star, ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export default function AppleServiceCard({ service, index, isVisible }: {
  service: { 
    id: string; 
    title: string; 
    description: string; 
    price: string; 
    duration: string; 
    image: StaticImageData; 
    category: string; 
    rating: number; 
    featured: boolean; 
  };
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group h-full"
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -8,
          transition: { type: "spring", stiffness: 400, damping: 30 },
        }}
        className="relative h-full bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        {/* Featured Badge */}
        {service.featured && (
          <motion.div
            className="absolute top-6 left-6 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          </motion.div>
        )}

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            fill={true}
            // animate={{ scale: isHovered ? 1.05 : 1 }}
            // transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Rating Badge */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-xl rounded-full px-3 py-1.5">
              <Star className="w-3 h-3 fill-current text-black" />
              <span className="text-xs font-medium text-black">
                {service.rating}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <motion.h3
                className="text-2xl font-semibold text-black tracking-tight"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {service.title}
              </motion.h3>
              <span className="text-xl font-medium text-black ml-4">
                {service.price}
              </span>
            </div>

            <p className="text-black/60 leading-relaxed mb-4">
              {service.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-black/40">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="w-1 h-1 bg-black/20 rounded-full" />
              <span className="font-medium">{service.category}</span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href={`/booking?service=${service.id}`}
            className="group/btn flex items-center justify-center w-full py-4 bg-purple-500 text-white font-medium rounded-2xl transition-all duration-300 hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundColor: isHovered ? "#000" : "#1a1a1a",
            }}
          >
            <Calendar className="w-5 h-5 mr-3" />
            <span className="mr-3">Book Now</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
          </motion.a>
        </div>

        {/* Hover Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
          <div className="absolute top-0 right-0 w-1 h-full bg-white/10" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
