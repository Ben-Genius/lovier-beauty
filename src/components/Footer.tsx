"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import Image from "next/image";
import logo from "../../public/svg/logo.svg"
/* ---------- Data ---------- */

const footerLinks = {
  services: [
    { label: "Lash Extensions", href: "/services/lashes" },
    { label: "Nail Art", href: "/services/nails" },
    { label: "Braiding", href: "/services/braids" },
    { label: "Pedicures", href: "/services/pedicures" },
    { label: "Piercings", href: "/services/piercings" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Book Appointment", href: "/booking" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/lovier-beauty-hub",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/lovier_beauty_hub",
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/lovier_beauty",
    label: "Twitter",
  },
];

/* ---------- Helper ---------- */

const isValidEmail = (email: string) =>
  // simple email regex (good enough for UI validation)
  /^\S+@\S+\.\S+$/.test(email);

/* ---------- Footer Component ---------- */

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    null | "idle" | "sending" | "ok" | "error"
  >(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }

    // lightweight simulated submit (replace with real API)
    setStatus("sending");
    setTimeout(() => {
      setStatus("ok");
      setEmail("");
    }, 900);
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-md">
                <Image
                  src={logo}
                  alt="lovier beauty logo "
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
                />{" "}
              </div>
              <div className="leading-tight">
                <span className="block font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-300">
                  Lovier Beauty
                </span>
                <span className="text-xs text-neutral-400 -mt-1 block">
                  Hub
                </span>
              </div>
            </Link>

            <p className="text-neutral-300 mb-6 leading-relaxed">
              Your destination for expert lashes, nails, braids, pedicures and
              piercings — hygienic, professional, and always stylish.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>123 Beauty Street, Kumasi, Ghana</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone className="w-5 h-5 text-purple-400" />
                <a
                  href="tel:+233241234567"
                  className="hover:text-white transition-colors"
                >
                  +233 24 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <a
                  href="mailto:hello@lovierbeautyhub.com"
                  className="hover:text-white transition-colors"
                >
                  hello@lovierbeautyhub.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>Mon–Sat: 9AM–7PM • Sun: Closed</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-800 py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              Stay updated with beauty tips
            </h3>
            <p className="text-neutral-300 mb-6">
              Subscribe to get the latest trends, tips, and exclusive offers.
            </p>

            <form
              onSubmit={submit}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-invalid={status === "error"}
                aria-describedby={
                  status === "error" ? "email-error" : undefined
                }
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 whitespace-nowrap bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-3 min-h-[1.25rem]">
              {status === "error" && (
                <p id="email-error" className="text-sm text-yellow-300">
                  Please enter a valid email address.
                </p>
              )}
              {status === "sending" && (
                <p className="text-sm text-neutral-400">Sending…</p>
              )}
              {status === "ok" && (
                <p className="text-sm text-purple-300">
                  Thanks — you’re subscribed!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Lovier Beauty Hub. All rights
              reserved.
            </div>

            <div className="flex items-center gap-4">
              {/* Social */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-300 hover:bg-purple-600 hover:text-white transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>

              <div className="text-neutral-400 text-sm">
                Made with <span aria-hidden>❤️</span> for beauty enthusiasts
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
