"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const footerLinks = {
  venue: [
    { label: "About Us", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Amenities", href: "#amenities" },
  ],
  services: [
    { label: "Weddings", href: "#gallery" },
    { label: "Birthdays", href: "#gallery" },
    { label: "Corporate Events", href: "#gallery" },
    { label: "Receptions", href: "#gallery" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "Book Now", href: "#booking" },
    { label: "FAQs", href: "#faq" },
  ],
}

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === "#") return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-foreground text-cream py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#home")
              }}
              className="text-2xl font-serif font-bold text-primary mb-4 block"
            >
              Biswadeep Bhawan
            </a>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Creating unforgettable moments for over 5 years. Your dream event starts here.
            </p>
            <p className="text-cream/50 text-sm">
              Bagnan OT Road<br />
              Bagnan, Howrah
            </p>
          </motion.div>

          {/* Venue Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-serif font-semibold mb-4">Venue</h4>
            <ul className="space-y-3">
              {footerLinks.venue.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-cream/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-serif font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-cream/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-serif font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-cream/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-cream/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/50 text-sm">
              {new Date().getFullYear()} Biswadeep Bhawan. All rights reserved.
            </p>
            <p className="text-cream/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for memorable moments
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
