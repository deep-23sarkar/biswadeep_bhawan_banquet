"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote, Video } from "lucide-react"
import fetchAllReviews from "@/services/FetchReview"
import { PostReview } from "@/types/PostReview"


// const testimonials = [
//   {
//     seq: 1,
//     name: "Sarah & Michael Thompson",
//     event: "Wedding Reception",
//     rating: 5,
//     content: "Our wedding at Grand Elegance was absolutely magical. The attention to detail, the stunning decor, and the impeccable service made our special day truly unforgettable. Every guest was in awe of the beautiful venue.",
//     date: "March 2024",
//   },
//   {
//     seq: 2,
//     name: "Jennifer Martinez",
//     event: "50th Birthday Celebration",
//     rating: 5,
//     content: "I celebrated my 50th birthday here and it exceeded all expectations. The team went above and beyond to create a personalized experience. The food was exquisite and the ambiance was perfect.",
//     date: "February 2024",
//   },
//   {
//     seq: 3,
//     name: "David & Emily Chen",
//     event: "Wedding Ceremony",
//     rating: 5,
//     content: "From the moment we visited Grand Elegance, we knew it was the perfect venue for our wedding. The coordinators were professional, responsive, and made the entire planning process stress-free.",
//     date: "January 2024",
//   },
//   {
//     seq: 4,
//     name: "Robert Williams",
//     event: "Corporate Gala",
//     rating: 5,
//     content: "We hosted our company&apos;s annual gala here and received nothing but compliments from our guests. The AV equipment was top-notch, and the staff was incredibly professional throughout the event.",
//     date: "December 2023",
//   },
// ]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [ testimonials,setTestimonials ] = useState<PostReview[]>([]);

  useEffect(() => {
  const collectReviews = async () => {
    const response = await fetchAllReviews();
    setTestimonials(response); 
  };
  collectReviews();
}, []); 



  const navigate = (dir: "prev" | "next") => {
    setDirection(dir === "next" ? 1 : -1)
    setCurrentIndex((prev) =>
      dir === "next"
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  // Auto-advance
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     navigate("next")
  //   }, 40000)
  //   return () => clearInterval(timer)
  // }, [currentIndex])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background">
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
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            What Our <span className="text-gold-gradient">Clients Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Real stories from couples and families who celebrated with us
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
              <Quote className="w-6 h-6 text-primary-foreground" />
            </div>

            <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-xl overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="mb-8 flex items-center justify-center">
                    {/* &ldquo;{}&rdquo; */}
                    {/* &ldquo;{testimonials[currentIndex].content}&rdquo; */}
                    <video src={testimonials[currentIndex]?.video} controls loop className="w-[80%] h-[80%] rounded-2xl"></video>
                  </div>

                  {/* Author */}
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {testimonials[currentIndex]?.name}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      &ldquo;{testimonials[currentIndex]?.comment}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate("prev")}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1)
                        setCurrentIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-8 bg-primary"
                          : "bg-muted hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => navigate("next")}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
