"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

// Service data (same as provided)
const services = [
  {
    icon: "Eye", // Placeholder; we'll use text or an alternative since icons aren't directly usable here
    title: "Premium Lashes",
    description:
      "Classic, hybrid, and volume lashes tailored to enhance your natural beauty.",
    features: [
      "Classic Lashes",
      "Hybrid Extensions",
      "Volume Sets",
      "Lash Refills",
    ],
    price: "From $75",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90",
    href: "/services/lashes",
    rating: 4.9,
    duration: "1-2 hours",
  },
  {
    icon: "Hand",
    title: "Luxury Nails",
    description:
      "Stunning nail art, durable acrylics, and elegant gel manicures.",
    features: [
      "Acrylic Extensions",
      "Gel Polish",
      "Press-on Sets",
      "Custom Designs",
    ],
    price: "From $45",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=90",
    href: "/services/nails",
    rating: 4.8,
    duration: "45min - 2 hours",
  },
  {
    icon: "Scissors",
    title: "Expert Braids",
    description:
      "Protective styles including box braids, knotless braids, and passion twists.",
    features: [
      "Box Braids",
      "Knotless Braids",
      "Jungle Braids",
      "Passion Twists",
    ],
    price: "From $120",
    image:
      "https://images.unsplash.com/photo-1560869713-bf165a6275b3?w=800&q=90",
    href: "/services/braids",
    rating: 5.0,
    duration: "3-6 hours",
  },
  {
    icon: "Footprints",
    title: "Spa Pedicures",
    description:
      "Relaxing pedicures with premium products and attention to detail.",
    features: [
      "Classic Pedicure",
      "Spa Treatment",
      "Gel Polish",
      "Foot Massage",
    ],
    price: "From $35",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=90",
    href: "/services/pedicures",
    rating: 4.7,
    duration: "45min - 1 hour",
  },
  {
    icon: "Zap",
    title: "Safe Piercings",
    description:
      "Professional piercings with sterile equipment and premium jewelry.",
    features: [
      "Ear Piercings",
      "Nose Piercings",
      "Body Piercings",
      "Jewelry Selection",
    ],
    price: "From $25",
    image:
      "https://images.unsplash.com/photo-1531891570158-e71b35a485bc?w=800&q=90",
    href: "/services/piercings",
    rating: 4.9,
    duration: "15-30 minutes",
  },
];

// Custom content component for each service card
const ServiceContent = ({ service }: { 
  service: { 
    title: string; 
    description: string; 
    price: string; 
    duration: string; 
    category?: string;
    features: string[];
    rating: number;
    href: string;
  } 
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      {/* Description */}
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {service.title}
        </span>{" "}
        {service.description}
      </p>

      {/* Features List */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-4 tracking-wide">
          SERVICES INCLUDE
        </h4>
        <div className="space-y-3">
          {service.features.map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.4,
              }}
            >
              <div className="w-1.5 h-1.5 bg-neutral-700 dark:bg-neutral-200 rounded-full mr-3 flex-shrink-0" />
              <span className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Price, Duration, and Rating */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4">
          <span className="text-neutral-700 dark:text-neutral-200 font-medium text-lg">
            {service.price}
          </span>
          <span className="text-neutral-600 dark:text-neutral-400 text-sm">
            Duration: {service.duration}
          </span>
        </div>
        <div className="flex items-center space-x-1 bg-neutral-800 dark:bg-neutral-700 rounded-full px-3 py-1.5 text-white mt-4 md:mt-0">
          <Star className="w-3 h-3 fill-current text-yellow-400" />
          <span className="text-xs font-medium">{service.rating}</span>
        </div>
      </div>

      {/* CTA Button */}
      <motion.a
        href={service.href}
        className="inline-flex items-center px-6 py-3 bg-neutral-800 dark:bg-neutral-700 text-white font-medium rounded-full mt-6 transition-all duration-300 hover:bg-neutral-700 dark:hover:bg-neutral-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="mr-2">Learn More</span>
        <ArrowUpRight className="w-4 h-4" />
      </motion.a>
    </div>
  );
};

// Main Carousel Component
export default function ServicesCarousel() {
  // Map services to carousel card format
  const cards = services.map((service, index) => ({
    category: service.title,
    title: service.description,
    src: service.image,
    content: <ServiceContent service={service} />,
  }));

  return (
    <div className="w-full h-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-20"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-black/60 text-sm font-medium tracking-widest uppercase mb-6"
        >
          Signature Services
        </motion.p>

        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Crafted for
          <br />
          <span className="font-medium">Perfection</span>
        </motion.h2>

        <motion.p
          className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover our range of premium beauty services, each delivered with
          precision, artistry, and the highest standards of hygiene and safety.
        </motion.p>
      </motion.div>
      <Carousel
        items={cards.map((card, index) => (
          <Card key={card.src} card={card} index={index} />
        ))}
      />
    </div>
  );
}
