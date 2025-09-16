"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  Award,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Quote,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do and it shows in every service we provide.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every detail, every time.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building lasting relationships with our clients and community.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Staying ahead with the latest techniques and trends.",
  },
];

const team = [
  {
    name: "Akosua Mensah",
    role: "Lead Lash Artist & Founder",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&q=90",
    specialties: ["Volume Lashes", "Classic Extensions", "Lash Lifts"],
    description:
      "With over 5 years of experience, Akosua founded Lovier Beauty Hub with a vision to provide world-class lash services.",
    featured: true,
  },
  {
    name: "Jennifer Asante",
    role: "Senior Nail Artist",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=90",
    specialties: ["Nail Art", "Acrylics", "Gel Manicures"],
    description:
      "Jennifer transforms nails into works of art, specializing in intricate designs and durable finishes.",
    featured: false,
  },
  {
    name: "Abena Osei",
    role: "Master Braider",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&q=90",
    specialties: ["Knotless Braids", "Box Braids", "Protective Styles"],
    description:
      "Abena brings creativity and technical expertise to every braiding service, ensuring healthy and beautiful results.",
    featured: false,
  },
];

const features = [
  "Licensed and certified professionals",
  "Premium, high-quality products only",
  "Strict hygiene and safety protocols",
  "Personalized consultations for every client",
  "Modern, comfortable studio environment",
  "Competitive pricing with exceptional value",
  "Flexible scheduling and convenient booking",
  "Comprehensive aftercare support and guidance",
];

export default function AppleAboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="min-h-screen bg-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/60 text-sm font-medium tracking-widest uppercase mb-6"
          >
            About Us
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight leading-tight max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where Artistry Meets
            <br />
            <span className="font-medium">Excellence</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-black/60 font-light max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We are passionate about helping you unleash your inner glow through
            premium beauty services and personalized care.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <motion.h2
                className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our <span className="font-medium">Story</span>
              </motion.h2>

              <div className="space-y-6 text-lg text-black/70 font-light leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Founded in 2022, Lovier Beauty Hub began as a dream to create
                  a space where beauty meets luxury, and every client feels
                  empowered and radiant.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Our journey is rooted in the belief that beauty is personal,
                  and every individual deserves to feel confident in their own
                  skin. We combine traditional techniques with modern
                  innovations.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Today, we proudly serve hundreds of satisfied clients, each
                  with their own unique beauty story.
                </motion.p>
              </div>
            </div>

            {/* Image */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1560869713-bf165a6275b3?w=800&q=90"
                  alt="Lovier Beauty Hub Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Our Core <span className="font-medium">Values</span>
            </h2>
            <p className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do and ensure every client
              receives the exceptional experience they deserve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group"
                >
                  <motion.div
                    className="text-center p-8 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-lg transition-shadow duration-500 h-full"
                    whileHover={{
                      y: -8,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      },
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 400, damping: 25 },
                        rotate: { duration: 0.6, ease: "easeInOut" },
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-black/60 font-light leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24" id="team">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Meet Our Expert <span className="font-medium">Team</span>
            </h2>
            <p className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
              Our talented professionals bring years of experience and artistic
              vision to every service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group"
              >
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-shadow duration-500 h-full"
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 30 },
                  }}
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black"
                      animate={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {member.featured && (
                      <div className="absolute top-6 left-6 bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        Founder
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-black mb-1 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-black/60 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-black/60 font-light leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Specialties */}
                    <div>
                      <h4 className="text-sm font-semibold text-black/80 mb-3 tracking-wide">
                        SPECIALTIES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <span
                            key={specialty}
                            className="px-3 py-1.5 bg-black/5 text-black/70 text-xs rounded-full font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Why Choose <span className="font-medium">Lovier Beauty Hub?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <span className="text-white/90 font-light">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Ready to Experience
              <br />
              <span className="font-medium">the Difference?</span>
            </h2>
            <p className="text-xl text-black/60 font-light mb-12 leading-relaxed">
              Join hundreds of satisfied clients who trust us with their beauty
              needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="/booking"
                className="group flex items-center justify-center px-12 py-5 bg-black text-white font-semibold rounded-full text-lg transition-all duration-300 hover:bg-black/80 hover:scale-105 active:scale-95"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Appointment
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/contact"
                className="flex items-center justify-center px-12 py-5 border-2 border-black/20 text-black font-semibold rounded-full text-lg backdrop-blur-xl transition-all duration-300 hover:bg-black/5 hover:border-black/30 hover:scale-105 active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom accent */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center pt-16 border-t border-black/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-black/40 font-light text-sm">
            Experience beauty redefined • Established 2021 • Kumasi, Ghana
          </p>
        </motion.div>
      </div>

      {/* Ultra-subtle grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.008] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(black 1px, transparent 1px),
            linear-gradient(90deg, black 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
