"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Simulated booked dates (in a real app, this would come from an API)
const getBookedDates = (year: number, month: number): number[] => {
  // Random booked dates for demo
  const seed = year * 100 + month
  const booked: number[] = []
  for (let i = 0; i < 8; i++) {
    booked.push(((seed * (i + 1)) % 28) + 1)
  }
  return [...new Set(booked)]
}

export function Availability() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const bookedDates = getBookedDates(currentDate.year, currentDate.month)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newMonth = direction === "prev" ? prev.month - 1 : prev.month + 1
      if (newMonth < 0) {
        return { year: prev.year - 1, month: 11 }
      }
      if (newMonth > 11) {
        return { year: prev.year + 1, month: 0 }
      }
      return { ...prev, month: newMonth }
    })
  }

  const daysInMonth = getDaysInMonth(currentDate.year, currentDate.month)
  const firstDay = getFirstDayOfMonth(currentDate.year, currentDate.month)

  const isDateBooked = (day: number) => bookedDates.includes(day)
  const isDatePast = (day: number) => {
    const date = new Date(currentDate.year, currentDate.month, day)
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }
  const isToday = (day: number) => {
    return (
      currentDate.year === today.getFullYear() &&
      currentDate.month === today.getMonth() &&
      day === today.getDate()
    )
  }

  const handleDateSelect = (day: number) => {
    if (isDatePast(day) || isDateBooked(day)) return
    setSelectedDate(new Date(currentDate.year, currentDate.month, day))
  }

  const scrollToBooking = () => {
    const element = document.querySelector("#booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="availability" className="py-24 lg:py-32 bg-gradient-to-b from-background to-cream">
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
            Check Dates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Date <span className="text-gold-gradient">Availability</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Check real-time availability and secure your perfect date
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 lg:p-10 shadow-xl"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigateMonth("prev")}
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-serif font-bold text-foreground">
                {months[currentDate.month]} {currentDate.year}
              </h3>
              <button
                onClick={() => navigateMonth("next")}
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentDate.year}-${currentDate.month}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-7 gap-2"
              >
                {/* Empty cells for days before the first of month */}
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                
                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const booked = isDateBooked(day)
                  const past = isDatePast(day)
                  const todayDate = isToday(day)
                  const isSelected = selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentDate.month &&
                    selectedDate?.getFullYear() === currentDate.year

                  return (
                    <motion.button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={past || booked}
                      whileHover={!past && !booked ? { scale: 1.1 } : {}}
                      whileTap={!past && !booked ? { scale: 0.95 } : {}}
                      className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : booked
                          ? "bg-destructive/20 text-destructive cursor-not-allowed"
                          : past
                          ? "text-muted-foreground/40 cursor-not-allowed"
                          : "bg-muted hover:bg-primary/20 text-foreground"
                      } ${todayDate && !isSelected ? "ring-2 ring-primary" : ""}`}
                    >
                      {day}
                      {booked && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                          <X className="w-2.5 h-2.5 text-cream" />
                        </span>
                      )}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-cream" />
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive/20" />
                <span className="text-sm text-muted-foreground">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary" />
                <span className="text-sm text-muted-foreground">Selected</span>
              </div>
            </div>

            {/* Selected Date Action */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-8 p-6 bg-primary/10 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Date</p>
                      <p className="text-xl font-serif font-bold text-foreground">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={scrollToBooking}
                    >
                      Book This Date
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
