"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Users, Calendar, Star } from "lucide-react"
import Image from "next/image"


gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Calendar, value: 70, suffix: "+", label: "Events Hosted" },
  { icon: Users, value: 5000, suffix: "+", label: "Happy Guests" },
  { icon: Award, value: 5, suffix: "", label: "Years of Excellence" },
  { icon: Star, value: 4.9, suffix: "", label: "Average Rating" },
]

function Counter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
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
      
      setCount(Math.floor(progress * value * 10) / 10)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text reveal
      gsap.fromTo(
        ".about-text-line",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-linear-to-b from-background to-cream"
    >
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
            Our Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            A Legacy of <span className="text-gold-gradient">Elegance</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-linear-to-br from-cream-dark to-blush-dark flex items-center justify-center">
                {/* <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-xl font-serif text-foreground/70">Premium Venue</p>
                </div> */}
                <Image
                  src={"/Hall.jpeg"}
                  alt="Hall picture"
                  fill
                  className="object-center rounded-2xl"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <p className="about-text-line text-lg md:text-xl text-muted-foreground leading-relaxed">
              গত ১৫ বছরেরও বেশি সময় ধরে আপনার প্রিয় উৎসবের সেরা ঠিকানা—বিশ্বদীপ ভবন। আমাদের চমৎকার পরিবেশ ও আধুনিক সুযোগ-সুবিধা যেকোনো আয়োজনকে করে তোলে আরও বিশেষ।
            </p>
            <p className="about-text-line text-lg md:text-xl text-muted-foreground leading-relaxed">
              ছোটখাটো পারিবারিক অনুষ্ঠান হোক বা বড় উৎসব, প্রতিটি মুহূর্তকে সুন্দর করে তোলাই আমাদের কাজ। আমাদের দক্ষ টিম নিখুঁতভাবে সব দায়িত্ব সামলে নেয়, যাতে আপনার আনন্দের স্মৃতি থাকে আজীবন অটুট।
            </p>
            <p className="about-text-line text-lg md:text-xl text-muted-foreground leading-relaxed">
              বিবাহ, জন্মদিন কিংবা যেকোনো কর্পোরেট অনুষ্ঠান—আপনার প্রতিটি বিশেষ মুহূর্তকে সুন্দরভাবে সাজিয়ে তুলতে প্রস্তুত বিশ্বদীপ ভবন।
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8 text-center group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
