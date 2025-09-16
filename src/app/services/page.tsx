"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import AppleServiceCard from "@/components/ServiceCard";
import { BackgroundBeams } from "@/components/ui/background-beams"; // adjust path if needed
import h1 from "../../../public/images/h1.jpeg";
import hh2 from "../../../public/images/h2.jpeg";
import hh3 from "../../../public/images/h3.jpeg";
import hh4 from "../../../public/images/h4.jpeg";
import hh5 from "../../../public/images/h5.jpeg";
import hh6 from "../../../public/images/h6.jpeg";
import hh7 from "../../../public/images/h7.jpeg";
import hh8 from "../../../public/images/h8.jpeg";
import ee1 from "../../../public/images/e1.jpeg";
import ee2 from "../../../public/images/e2.jpeg";
import ee3 from "../../../public/images/e3.jpeg";
import ee4 from "../../../public/images/e5.jpeg";
import nn from "../../../public/images/n1.jpeg";
import nn2 from "../../../public/images/n2.jpeg";
import nn3 from "../../../public/images/n3.jpeg";
import nn4 from "../../../public/images/n4.jpeg";
import nn5 from "../../../public/images/n5.jpeg";
import nn6 from "../../../public/images/n6.jpeg";
import nn7 from "../../../public/images/n7.jpeg";
import nn8 from "../../../public/images/n8.jpeg";
import pp1 from "../../../public/images/p1.jpg";
import pp2 from "../../../public/images/p2.jpeg";
import pp3 from "../../../public/images/p3.jpeg";
import pp4 from "../../../public/images/p4.jpeg";
import pp5 from "../../../public/images/p5.jpeg";


const services = [
  // --- Lashes ---
  {
    id: "classic-lashes",
    title: "Classic Lash Extensions",
    description:
      "Natural-looking lashes with one extension per natural lash. Perfect for everyday elegance.",
    image: ee1,
    price: "From $120",
    duration: "1.5-2 hours",
    category: "Lashes",
    rating: 4.9,
    featured: false,
  },
  {
    id: "hybrid-lashes",
    title: "Hybrid Lash Extensions",
    description:
      "The perfect blend of classic and volume techniques for fuller, textured lashes.",
    image: ee2,
    price: "From $135",
    duration: "2-2.5 hours",
    category: "Lashes",
    rating: 4.8,
    featured: false,
  },
  {
    id: "volume-lashes",
    title: "Volume Lash Extensions",
    description:
      "Dramatic, full lashes using lightweight fans for maximum impact and glamour.",
    image: ee4, // Using e5 for volume
    price: "From $150",
    duration: "2-3 hours",
    category: "Lashes",
    rating: 5.0,
    featured: true,
  },
  {
    id: "lash-refills",
    title: "Lash Extension Refills",
    description:
      "Maintain your beautiful lashes with regular touch-ups every 2-3 weeks.",
    image: ee3,
    price: "From $80",
    duration: "1-1.5 hours",
    category: "Lashes",
    rating: 4.7,
    featured: false,
  },

  // --- Nails ---
  {
    id: "press-on-nails",
    title: "Custom Press-On Nails",
    description:
      "Instantly gorgeous nails with our handcrafted, reusable press-on sets.",
    image: nn,
    price: "From $45",
    duration: "30-45 mins",
    category: "Nails",
    rating: 4.6,
    featured: false,
  },
  {
    id: "acrylic-nails",
    title: "Acrylic Nail Extensions",
    description:
      "Durable, long-lasting nails with unlimited design possibilities.",
    image: nn2,
    price: "From $65",
    duration: "1.5-2 hours",
    category: "Nails",
    rating: 4.8,
    featured: true,
  },
  {
    id: "gel-manicure",
    title: "Gel Manicure",
    description:
      "Chip-resistant polish that lasts for weeks with a high-shine finish.",
    image: nn3,
    price: "From $40",
    duration: "1 hour",
    category: "Nails",
    rating: 4.7,
    featured: false,
  },
  {
    id: "dip-powder-nails",
    title: "Dip Powder Nails",
    description:
      "Strengthens natural nails with a colorful powder for a lightweight, durable finish.",
    image: nn4,
    price: "From $55",
    duration: "1.5 hours",
    category: "Nails",
    rating: 4.9,
    featured: false,
  },
  {
    id: "nail-art-design",
    title: "Nail Art & Design",
    description:
      "Express yourself with intricate hand-painted designs, gems, and foil.",
    image: nn5,
    price: "From $15+",
    duration: "Varies",
    category: "Nails",
    rating: 5.0,
    featured: false,
  },

  // --- Braids & Twists ---
  {
    id: "box-braids",
    title: "Box Braids",
    description:
      "Classic protective styling with neat, square-shaped sections for versatile looks.",
    image: h1,
    price: "From $180",
    duration: "4-6 hours",
    category: "Braids",
    rating: 4.9,
    featured: true,
  },
  {
    id: "knotless-braids",
    title: "Knotless Braids",
    description:
      "Gentle on edges with a natural-looking start, perfect for sensitive scalps.",
    image: hh2,
    price: "From $200",
    duration: "5-7 hours",
    category: "Braids",
    rating: 5.0,
    featured: false,
  },
  {
    id: "boho-braids",
    title: "Boho Braids",
    description:
      "Effortlessly chic braids adorned with beads, rings, and curly pieces for a free-spirited look.",
    image: hh3,
    price: "From $220",
    duration: "5-6 hours",
    category: "Braids",
    rating: 4.8,
    featured: true,
  },
  {
    id: "jumbo-braids",
    title: "Jumbo Braids",
    description:
      "Bold, statement-making braids for a low-maintenance and high-impact style.",
    image: hh4,
    price: "From $160",
    duration: "3-4 hours",
    category: "Braids",
    rating: 4.7,
    featured: false,
  },
  {
    id: "butterfly-locs",
    title: "Butterfly Locs",
    description:
      "Soft, wavy, and bohemian faux locs with a textured, feathery finish.",
    image: hh5,
    price: "From $220",
    duration: "4-5 hours",
    category: "Braids",
    rating: 4.9,
    featured: false,
  },
  {
    id: "passion-twist",
    title: "Passion Twists",
    description:
      "Two-strand twists with a soft, curly, and voluminous appearance for a romantic vibe.",
    image: hh6,
    price: "From $190",
    duration: "4-5 hours",
    category: "Twists",
    rating: 4.8,
    featured: false,
  },
  {
    id: "soft-locs",
    title: "Soft Locs",
    description:
      "A hybrid of sisterlocks and traditional locs, offering a softer, more malleable look.",
    image: hh7,
    price: "From $240",
    duration: "5-7 hours",
    category: "Locs",
    rating: 4.9,
    featured: false,
  },
  {
    id: "invisible-locs",
    title: "Invisible Locs",
    description:
      "Thin, delicate locs created with a crochet method for a lightweight and discreet style.",
    image: hh8,
    price: "From $260",
    duration: "6-8 hours",
    category: "Locs",
    rating: 5.0,
    featured: true,
  },

  // --- Piercings ---
  {
    id: "lobe-piercing",
    title: "Lobe Piercing",
    description:
      "The classic first piercing. Simple, quick, and perfect for any style of jewelry.",
    image: pp1,
    price: "From $40",
    duration: "15 mins",
    category: "Piercings",
    rating: 4.9,
    featured: false,
  },
  {
    id: "helix-piercing",
    title: "Helix Piercing",
    description:
      "A piercing on the upper outer cartilage of the ear. Ideal for hoops and studs.",
    image: pp2,
    price: "From $50",
    duration: "20 mins",
    category: "Piercings",
    rating: 4.7,
    featured: false,
  },
  {
    id: "tragus-piercing",
    title: "Tragus Piercing",
    description:
      "A bold piercing through the small flap of cartilage in front of the ear canal.",
    image: pp3,
    price: "From $60",
    duration: "20 mins",
    category: "Piercings",
    rating: 4.8,
    featured: false,
  },
  {
    id: "nose-piercing",
    title: "Nostril Piercing",
    description:
      "A popular and stylish piercing that complements any look with a stud or hoop.",
    image: pp4,
    price: "From $50",
    duration: "15 mins",
    category: "Piercings",
    rating: 4.8,
    featured: false,
  },
  {
    id: "septum-piercing",
    title: "Septum Piercing",
    description:
      "A distinctive piercing through the nasal septum. Easily hidden if needed.",
    image: pp5,
    price: "From $65",
    duration: "20 mins",
    category: "Piercings",
    rating: 4.6,
    featured: true,
  },

  // --- Hair (Cuts & Treatments) ---
  {
    id: "blowout",
    title: "Wash & Blowout",
    description:
      "A professional wash, treatment, and sleek blow dry for a smooth, salon-fresh finish.",
    image: nn6, // Using a nail image as a placeholder for hair service
    price: "From $60",
    duration: "1 hour",
    category: "Hair",
    rating: 4.9,
    featured: false,
  },
  {
    id: "haircut",
    title: "Custom Haircut",
    description:
      "A precision haircut tailored to your face shape, hair texture, and desired style.",
    image: nn7, // Using a nail image as a placeholder for hair service
    price: "From $75",
    duration: "1 hour",
    category: "Hair",
    rating: 4.8,
    featured: false,
  },
  {
    id: "balayage",
    title: "Balayage",
    description:
      "Hand-painted highlights for a soft, natural, and sun-kissed dimensional color.",
    image: nn8, // Using a nail image as a placeholder for hair service
    price: "From $180",
    duration: "3-4 hours",
    category: "Hair",
    rating: 5.0,
    featured: true,
  },
];

const categories = [
  "All",
  "Lashes",
  "Nails",
  "Braids",
  "Pedicures",
  "Piercings",
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q.length === 0 ||
      service.title.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const featuredServices = filteredServices.filter((s) => s.featured);
  const regularServices = filteredServices.filter((s) => !s.featured);

  return (
    <section ref={ref} className="relative min-h-screen bg-neutral-50 py-24">
      {/* Background beams layer (visually rich but non-interactive) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* Content container sits above beams */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
            className="text-neutral-600 text-sm font-medium tracking-widest uppercase mb-6"
          >
            Our Services
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Beauty
            <br />
            <span className="font-medium">Redefined</span>
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-600 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our specialized menu of premium beauty services, each
            crafted with precision and delivered with excellence.
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 bg-white/90 rounded-full p-2 border border-neutral-200 shadow-sm">
              {categories.map((category, index) => {
                const active = category === activeCategory;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${
                      active
                        ? "bg-purple-600 text-white shadow-md"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.04 }}
                    aria-pressed={active}
                  >
                    {category}
                  </motion.button>
                );
              })}
            </div>

            {/* Search */}
            <motion.div
              className="relative w-full lg:w-96"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-neutral-200 shadow-sm">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-neutral-800 placeholder-neutral-400 focus:outline-none font-light"
                  aria-label="Search services"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured */}
        {featuredServices.length > 0 && (
          <motion.section
            aria-labelledby="featured-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                id="featured-heading"
                className="text-2xl font-semibold text-neutral-900"
              >
                Featured Services
              </h2>
              <div className="text-neutral-600 text-sm">
                Curated picks for a premium experience
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, i) => (
                <AppleServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  isVisible={isInView}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* All / Regular Services */}
        <motion.section
          aria-labelledby="services-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mb-24"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="services-heading"
              className="text-2xl font-semibold text-neutral-900"
            >
              {activeCategory === "All"
                ? "All Services"
                : `${activeCategory} Services`}
            </h2>
            <div className="text-neutral-600 text-sm">
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {(featuredServices.length > 0
                ? regularServices
                : filteredServices
              ).map((service, i) => (
                <AppleServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  isVisible={isInView}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-neutral-500 text-lg font-light">
                No services found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-purple-600 font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 pt-12 border-t border-neutral-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <p className="text-neutral-600 font-light mb-6">
            Cannot find what you are looking for?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-full font-medium shadow transition-transform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
            <ArrowRight className="w-4 h-4 ml-3" />
          </motion.a>
        </motion.div>
      </div>

      {/* subtle grid pattern on top of beams for texture */}
      <div
        aria-hidden
        className="absolute inset-0 z-5 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
