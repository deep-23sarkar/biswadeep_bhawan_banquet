"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Users, UtensilsCrossed, Theater, Mic2 } from "lucide-react"

const layouts = [
  {
    id: "banquet",
    name: "Banquet Style",
    icon: UtensilsCrossed,
    capacity: 500,
    description: "Round tables with full dining service",
  },
  {
    id: "theater",
    name: "Theater Style",
    icon: Theater,
    capacity: 800,
    description: "Rows of chairs facing the stage",
  },
  {
    id: "cocktail",
    name: "Cocktail Style",
    icon: Users,
    capacity: 1000,
    description: "Standing reception with high tables",
  },
  {
    id: "conference",
    name: "Conference Style",
    icon: Mic2,
    capacity: 300,
    description: "Classroom-style seating with tables",
  },
]

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export function Capacity() {
  const [selectedLayout, setSelectedLayout] = useState(layouts[0])

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
            Venue Capacity
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Space for <span className="text-gold-gradient">Everyone</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Our versatile space adapts to your needs, from intimate dinners to grand celebrations
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Layout Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {layouts.map((layout, index) => (
              <motion.button
                key={layout.id}
                onClick={() => setSelectedLayout(layout)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                  selectedLayout.id === layout.id
                    ? "bg-foreground text-cream shadow-xl"
                    : "glass-card hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    selectedLayout.id === layout.id
                      ? "bg-primary"
                      : "bg-primary/20"
                  }`}>
                    <layout.icon className={`w-7 h-7 ${
                      selectedLayout.id === layout.id
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-serif font-semibold ${
                      selectedLayout.id === layout.id
                        ? "text-cream"
                        : "text-foreground"
                    }`}>
                      {layout.name}
                    </h3>
                    <p className={`text-sm ${
                      selectedLayout.id === layout.id
                        ? "text-cream/70"
                        : "text-muted-foreground"
                    }`}>
                      {layout.description}
                    </p>
                  </div>
                  <div className={`text-right ${
                    selectedLayout.id === layout.id
                      ? "text-primary"
                      : "text-foreground"
                  }`}>
                    <span className="text-2xl font-bold">{layout.capacity}</span>
                    <span className="text-sm block">guests</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Visual Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-cream-dark to-blush-dark overflow-hidden shadow-2xl">
              {/* Animated capacity display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  key={selectedLayout.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <selectedLayout.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                    {selectedLayout.name}
                  </h3>
                  <div className="text-6xl font-bold text-gold-gradient mb-2">
                    <AnimatedCounter value={selectedLayout.capacity} duration={1} />
                  </div>
                  <p className="text-muted-foreground">Maximum Guests</p>
                </motion.div>

                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i < (selectedLayout.capacity / 15) ? 1 : 0.2 }}
                        transition={{ delay: i * 0.01, duration: 0.3 }}
                        className="border border-foreground/20 flex items-center justify-center"
                      >
                        <Users className="w-3 h-3 text-foreground" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/30 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
