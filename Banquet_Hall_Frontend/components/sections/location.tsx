"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Mail } from "lucide-react"

export function Location() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
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
            Find Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Our <span className="text-gold-gradient">Location</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Conveniently located in the heart of the city with easy access and ample parking
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/2.60] rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps?q=Biswadeep+Event+Management,+Bagnan,+West+Bengal+711303&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grand Elegance Location"
                // className=" transition-all duration-500"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-3xl -z-10" />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Address */}
            <motion.div
              whileHover={{ x: 8 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground">
                  Bagnan OT Road<br />
                  Bagnan, Howrah<br />
                  Near Bagnan Hospital
                </p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              whileHover={{ x: 8 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">Office Hours</h3>
                <p className="text-muted-foreground">
                  24 hours open
                </p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.a
              href="tel:+1234567890"
              whileHover={{ x: 8 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4 block hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground">
                  +91 9564580766<br />
                  +91 9735636166
                </p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:info@grandelegance.com"
              whileHover={{ x: 8 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4 block hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">
                  info@biswadeepbhawan.com<br />
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
