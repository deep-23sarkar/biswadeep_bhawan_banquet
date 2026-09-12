"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  // { href: "#packages", label: "Packages" },
  { href: "#amenities", label: "Amenities" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const phoneNumber = "919564580766";

  const message = encodeURIComponent(
    "Hello, I would like to know more about booking Biswadeep Bhavan.",
  );

  return (
    <>
      {/* <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      > */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
        }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? "w-[90%] max-w-6xl bg-card/95 backdrop-blur-md shadow-xl rounded-2xl py-3 px-6"
            : "w-full bg-transparent py-6 px-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              {!isScrolled ? (
                <span className="text-2xl md:text-3xl font-serif font-bold text-gold-gradient">
                  Biswa Deep
                </span>
              ) : (
                <span className="text-2xl md:text-3xl font-serif font-bold text-gold-gradient">
                  Biswa Deep
                </span>
              )}
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isScrolled ? "text-foreground" : "text-foreground/90"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-10">
              <a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="z-50"
              >
                <Image
                  src="/whatsapp-256px.png"
                  alt="Contact us on WhatsApp"
                  width={25}
                  height={25}
                />
              </a>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => scrollToSection("#booking")}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-card shadow-2xl"
            >
              <div className="flex flex-col p-8 pt-24">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="py-4 text-lg font-medium text-foreground border-b border-border hover:text-primary transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="flex flex-col gap-4 mt-8">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => scrollToSection("#contact")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => scrollToSection("#booking")}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Book Now Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 lg:hidden"
      >
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg animate-glow rounded-full px-6"
          onClick={() => scrollToSection("#booking")}
        >
          Book Now
        </Button>
      </motion.div>
    </>
  );
}
