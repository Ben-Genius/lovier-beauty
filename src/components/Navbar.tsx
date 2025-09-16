"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Grid3X3 } from "lucide-react";
import Image from "next/image";
import logo from "../../public/svg/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

const LOCAL_STORAGE_KEY = "nav:visited";

const Navbar = () => {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visitedLinks, setVisitedLinks] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement | null>(null);

  // Derive active index from current pathname
  const activeIndex = navLinks.findIndex((n) => {
    if (n.href === "/") return pathname === "/";
    return pathname.startsWith(n.href);
  });

  // Load visited links from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) setVisitedLinks(JSON.parse(raw));
    } catch (_) {
      // Ignore
    }
  }, []);

  // Persist visitedLinks with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(visitedLinks)
        );
      } catch (_) {}
    }, 500); // Debounce by 500ms
    return () => clearTimeout(timeout);
  }, [visitedLinks]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mark link visited
  const markVisited = (href: string) => {
    setVisitedLinks((prev) => {
      if (prev[href]) return prev;
      return { ...prev, [href]: true };
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center transition-transform duration-200 hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 hover:rotate-6">
                <Image
                  src={logo}
                  alt="Lovier Beauty logo"
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-lg text-white tracking-tight">
                  Lovier Beauty
                </span>
                <span className="text-xs text-white/60 -mt-0.5 tracking-wide">
                  HUB
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-16">
            <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
              {navLinks.map((link, index) => {
                const isActive = index === activeIndex;
                const isVisited = Boolean(visitedLinks[link.href]);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => markVisited(link.href)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-black bg-white shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-purple-600/50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      {isVisited && !isActive && (
                        <span
                          className="w-2 h-2 rounded-full bg-white/50 inline-block ml-1"
                          aria-hidden
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="/booking"
              className="px-6 py-2.5 bg-white text-black font-medium rounded-full text-sm transition-all duration-200 hover:bg-white/90 hover:scale-105 active:scale-95"
            >
              <div className="flex items-center space-x-2">
                <span>Book Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((s) => !s)}
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:scale-105 active:scale-95"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Grid3X3 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-6 right-6 mt-4 bg-black/90 rounded-3xl border border-white/10 shadow-2xl z-40 lg:hidden overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-1">
                  {navLinks.map((link, index) => {
                    const isActive = index === activeIndex;
                    const isVisited = Boolean(visitedLinks[link.href]);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          markVisited(link.href);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between py-4 px-4 rounded-2xl text-white font-medium transition-all duration-200 hover:bg-white/5 active:bg-white/10 ${
                          isActive ? "bg-white text-black" : ""
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="text-lg flex items-center gap-2">
                          {link.label}
                          {isVisited && !isActive && (
                            <span
                              className="w-2 h-2 rounded-full bg-white/50 inline-block"
                              aria-hidden
                            />
                          )}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
                <div className="my-6 h-px bg-white/10" />
                <a
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 bg-white text-black font-semibold rounded-2xl transition-all duration-200 hover:bg-white/90"
                >
                  <span className="mr-2">Book Appointment</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
