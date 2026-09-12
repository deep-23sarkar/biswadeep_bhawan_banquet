"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

const Hero3DScene = dynamic(
  () => import("@/components/hero-3d-scene").then((mod) => mod.Hero3DScene),
  { ssr: false }
)

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 100, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5,
        }
      )

      // Animate subheading
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1,
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Hero3DScene />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-cream/90 via-cream/70 to-blush/50 z-1" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium tracking-widest uppercase text-primary border border-primary/30 rounded-full bg-card/50 backdrop-blur-sm">
            Premium Event Venue
          </span>
        </motion.div>

        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold leading-tight mb-6"
        >
          <span className="block text-foreground">Make Your Special Day</span>
          <span className="block text-gold-gradient mt-2">Unforgettable</span>
        </h1>

        <p
          ref={subheadingRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          উৎসবের সেরা ঠিকানা — <span className="font-extrabold">বিশ্বদীপ ভবন</span> ব্যাংকুয়েট হল।
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg group"
            onClick={() => scrollToSection("#booking")}
          >
            Book Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
            onClick={() => scrollToSection("#availability")}
          >
            <Calendar className="mr-2 w-5 h-5" />
            Check Availability
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
    </section>
  )
}
