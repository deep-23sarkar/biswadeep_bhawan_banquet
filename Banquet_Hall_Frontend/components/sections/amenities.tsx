"use client"

import { motion } from "framer-motion"
import {
  Utensils,
  Music,
  Camera,
  Car,
  Wifi,
  Wind,
  Sparkles,
  Users,
  Shield,
  Clock,
  Gem,
  Flower2,
} from "lucide-react"

const amenities = [
  {
    icon: Utensils,
    title: "Gourmet Catering",
    description: "Premier caterers and good chefs delievering unforgettable Bengali feasts",
  },
  {
    icon: Music,
    title: "Premium Sound",
    description: "State-of-the-art audio and lighting systems",
  },
  {
    icon: Camera,
    title: "Photo Booth",
    description: "Professional photography and video services",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Complimentary valet service for all guests",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Seamless connectivity throughout the venue",
  },
  {
    icon: Wind,
    title: "Climate Control",
    description: "Perfect temperature for year-round comfort",
  },
  {
    icon: Sparkles,
    title: "Decoration",
    description: "Stunning decor tailored to your theme",
  },
  {
    icon: Users,
    title: "Event Staff",
    description: "Professional and attentive service team",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Round-the-clock security for your peace of mind",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Extended hours available upon request",
  },
  {
    icon: Gem,
    title: "Bridal Suite",
    description: "Luxurious preparation rooms for the wedding party",
  },
  {
    icon: Flower2,
    title: "Floral Design",
    description: "Custom floral arrangements by expert florists",
  },
]

export function Amenities() {
  return (
    <section id="amenities" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 text-sm font-medium tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-6"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Why you choose <span className="text-gold-gradient">US</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need for a flawless event, all under one roof
          </motion.p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 lg:p-8 h-full text-center hover:shadow-xl transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors"
                >
                  <amenity.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                  {amenity.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
