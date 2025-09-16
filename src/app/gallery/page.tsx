"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  X,
  Grid3X3,
  ArrowRight,
  ArrowLeft,
  Eye,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { galleryImages } from "../lib/dummyData";

const categories = [
  "All",
  "Lashes",
  "Nails",
  "Braids",
  "Pedicures",
  "Piercings",
];

function CreativeGalleryCard({ image, index, onClick, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  const isFeatured = image.featured;
  const cardSize = isFeatured ? "lg:col-span-2 lg:row-span-2" : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, rotate: Math.random() * 10 - 5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 60,
        rotate: 0,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`group cursor-pointer ${cardSize}`}
      onClick={() => onClick(image)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-500 ${
          isFeatured ? "rounded-2xl" : "rounded-3xl"
        } bg-white`}
        whileHover={{
          y: -12,
          rotate: Math.random() * 4 - 2,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {image.featured && (
            <motion.div
              className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Star className="w-3 h-3 fill-current" />
              Featured
            </motion.div>
          )}
        </div>

        {/* Floating Sparkles */}
        <motion.div
          className="absolute top-8 right-6 text-yellow-400"
          animate={{
            y: isHovered ? [-5, 5, -5] : 0,
            rotate: isHovered ? [0, 180, 360] : 0,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        {/* Image Container */}
        <div
          className={`relative overflow-hidden ${
            isFeatured ? "aspect-[4/3]" : "aspect-square"
          }`}
        >
          <Image
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover"
            fill={true}
          />

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            animate={{ opacity: isHovered ? 0.8 : 0.3 }}
            transition={{ duration: 0.4 }}
          />

          {/* View Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className={`p-5 ${isFeatured ? "p-6" : ""}`}>
          <div className="flex items-start justify-between mb-3">
            <motion.h3
              className={`font-semibold text-gray-900 tracking-tight leading-tight ${
                isFeatured ? "text-xl" : "text-base"
              }`}
              animate={{ x: isHovered ? 6 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {image.title}
            </motion.h3>

            <motion.div
              className="font-medium text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              #{image.category.toLowerCase()}
            </motion.div>
          </div>

          <p className={`text-gray-600 font-normal leading-relaxed text-sm`}>
            {image.description}
          </p>

          {/* Read More Button */}
          <motion.div
            className="mt-3 flex items-center gap-2 text-gray-700 font-medium text-sm"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <span>View Details</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Corner */}
        <motion.div
          className="absolute bottom-0 right-0 w-12 h-12 opacity-20"
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full rounded-tl-full bg-gray-200" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function AppleGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedImage.additionalImages.length : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImage) {
      setCurrentImageIndex((prev) =>
        prev === selectedImage.additionalImages.length ? 0 : prev + 1
      );
    }
  };

  const getCurrentImage = () => {
    if (!selectedImage) return "";
    return currentImageIndex === 0
      ? selectedImage.src
      : selectedImage.additionalImages[currentImageIndex - 1];
  };

  return (
    <div ref={ref} className="min-h-screen bg-white">
      {/* Hero Section with Full-Screen Background Boxes */}
      <section className="relative">
        <div className="h-screen w-screen relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center relative z-20 max-w-7xl mx-auto px-6 lg:px-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-sm font-medium tracking-widest uppercase mb-6"
            >
              Our Portfolio
            </motion.p>

            <motion.h1
              className={cn(
                "md:text-6xl text-5xl font-light text-white mb-8 tracking-tight leading-tight"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our Work
              <br />
              <span className="font-medium">Gallery</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-neutral-300 font-light max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our portfolio of stunning transformations and see why
              clients trust us with their beauty journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center gap-2 bg-gray-50 rounded-full p-2 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <Grid3X3 className="w-5 h-5 text-gray-600" />
              </div>
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "text-white bg-purple-700 shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-purple-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="category-indicator-gallery"
                      className="absolute inset-0 bg-purple-700 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
         

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredImages.map((image, index) => (
                  <CreativeGalleryCard
                    key={image.id}
                    image={image}
                    index={index}
                    onClick={setSelectedImage}
                    isVisible={isInView}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-gray-300 text-6xl mb-6">🎨</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-3">
                  No masterpieces found
                </h3>
                <p className="text-gray-500 mb-6 text-base">
                  Try exploring a different category
                </p>
                <motion.button
                  onClick={() => setSelectedCategory("All")}
                  className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Creations
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex flex-col lg:flex-row h-full">
                {/* Image Carousel */}
                <div className="relative w-full lg:w-2/3 h-64 sm:h-80 lg:h-full overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={getCurrentImage()}
                      alt={selectedImage.title}
                      fill={true}
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </motion.div>

                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Thumbnail Previews */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {[selectedImage.src, ...selectedImage.additionalImages].map(
                      (img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                            currentImageIndex === index
                              ? "border-white"
                              : "border-transparent"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={img}
                            alt={`${selectedImage.title} preview ${index}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </motion.button>
                      )
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 lg:p-8 lg:w-1/3 bg-gray-50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                      {selectedImage.title}
                    </h3>
                    <span className="inline-block text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full mb-4">
                      {selectedImage.category}
                    </span>
                    <p className="text-gray-600 font-normal leading-relaxed mb-4">
                      {selectedImage.description}
                    </p>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <strong>Duration:</strong>{" "}
                        {selectedImage.details.duration}
                      </p>
                      <p>
                        <strong>Price Range:</strong>{" "}
                        {selectedImage.details.priceRange}
                      </p>
                    </div>
                  </div>
                  <motion.a
                    href="/booking"
                    className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full text-sm hover:bg-gray-800 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
              Ready for Your
              <br />
              <span className="font-bold">Transformation?</span>
            </h2>
            <p className="text-xl text-white/80 font-normal mb-12 leading-relaxed max-w-2xl mx-auto">
              Join our gallery of satisfied clients and experience the luxury of
              professional beauty services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/booking"
                className="group flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full text-base shadow-md transition-all duration-300 hover:bg-gray-100"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Session
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="https://x.com"
                className="flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full text-base backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Follow Us on X
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Accent */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center py-12 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500 font-normal text-sm">
            All work showcased with client permission • Professional photography
            by our team
          </p>
        </motion.div>
      </div>
    </div>
  );
}
