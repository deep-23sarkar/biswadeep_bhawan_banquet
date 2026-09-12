"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Clock, Utensils, Music, Camera, Flower2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const addons = [
  { id: "catering", name: "Premium Catering", icon: Utensils, pricePerGuest: 500 },
  { id: "dj", name: "DJ & Sound System", icon: Music, flatPrice: 10000 },
  { id: "photography", name: "Photography", icon: Camera, flatPrice: 20000 },
  { id: "decor", name: "Luxury Decor", icon: Flower2, flatPrice: 35000 },
]

const durations = [
  { hours: 4, label: "4 Hours", multiplier: 1 },
  { hours: 6, label: "6 Hours", multiplier: 1.3 },
  { hours: 8, label: "8 Hours", multiplier: 1.5 },
  { hours: 12, label: "Full Day", multiplier: 2 },
]

const BASE_PRICE = 1500
const PRICE_PER_GUEST = 15

function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const step = (value - displayValue) / 10
    if (Math.abs(value - displayValue) < 1) {
      setDisplayValue(value)
      return
    }

    const timer = setTimeout(() => {
      setDisplayValue((prev) => prev + step)
    }, 20)

    return () => clearTimeout(timer)
  }, [value, displayValue])

  return <span>{Math.round(displayValue).toLocaleString()}</span>
}

export function Calculator() {
  const [guestCount, setGuestCount] = useState([100])
  const [selectedDuration, setSelectedDuration] = useState(durations[1])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    )
  }

  // Calculate total
  const basePrice = BASE_PRICE * selectedDuration.multiplier
  const guestPrice = guestCount[0] * PRICE_PER_GUEST
  const addonsPrice = selectedAddons.reduce((total, addonId) => {
    const addon = addons.find((a) => a.id === addonId)
    if (!addon) return total
    if ("flatPrice" in addon) return total + addon.flatPrice
    if ("pricePerGuest" in addon) return total + addon.pricePerGuest * guestCount[0]
    return total
  }, 0)

  const totalPrice = basePrice + guestPrice + addonsPrice

  const scrollToBooking = () => {
    const element = document.querySelector("#booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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
            Cost Estimator
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Plan Your <span className="text-gold-gradient">Budget</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Use our interactive calculator to estimate your event cost
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calculator Controls */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 glass-card rounded-3xl p-8 shadow-xl"
            >
              {/* Guest Count */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-serif font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Number of Guests
                  </Label>
                  <span className="text-2xl font-bold text-gold-gradient">
                    {guestCount[0]}
                  </span>
                </div>
                <Slider
                  value={guestCount}
                  onValueChange={setGuestCount}
                  min={50}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>50 guests</span>
                  <span>1000 guests</span>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-10">
                <Label className="text-lg font-serif font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  Event Duration
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {durations.map((duration) => (
                    <motion.button
                      key={duration.hours}
                      onClick={() => setSelectedDuration(duration)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl text-center transition-all duration-200 ${
                        selectedDuration.hours === duration.hours
                          ? "bg-foreground text-cream shadow-lg"
                          : "bg-muted hover:bg-primary/10"
                      }`}
                    >
                      <span className="text-lg font-bold">{duration.hours}h</span>
                      <span className={`text-xs block mt-1 ${
                        selectedDuration.hours === duration.hours
                          ? "text-cream/70"
                          : "text-muted-foreground"
                      }`}>
                        {duration.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <Label className="text-lg font-serif font-semibold text-foreground mb-4 block">
                  Additional Services
                </Label>
                <div className="space-y-4">
                  {addons.map((addon) => (
                    <motion.div
                      key={addon.id}
                      whileHover={{ x: 4 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                        selectedAddons.includes(addon.id)
                          ? "bg-primary/10"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedAddons.includes(addon.id)
                            ? "bg-primary"
                            : "bg-card"
                        }`}>
                          <addon.icon className={`w-5 h-5 ${
                            selectedAddons.includes(addon.id)
                              ? "text-primary-foreground"
                              : "text-primary"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{addon.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {"flatPrice" in addon
                              ? `${addon.flatPrice.toLocaleString()}`
                              : `${addon.pricePerGuest}/guest`}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={selectedAddons.includes(addon.id)}
                        onCheckedChange={() => toggleAddon(addon.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Price Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-28 bg-foreground text-cream rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-serif font-bold mb-6 pb-6 border-b border-cream/20">
                  Price Breakdown
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-cream/70">Base Venue ({selectedDuration.label})</span>
                    <span>{Math.round(basePrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/70">Guest Fee ({guestCount[0]} guests)</span>
                    <span>{guestPrice.toLocaleString()}</span>
                  </div>
                  
                  <AnimatePresence>
                    {selectedAddons.map((addonId) => {
                      const addon = addons.find((a) => a.id === addonId)
                      if (!addon) return null
                      const price = "flatPrice" in addon
                        ? addon.flatPrice
                        : addon.pricePerGuest * guestCount[0]
                      return (
                        <motion.div
                          key={addonId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between"
                        >
                          <span className="text-cream/70">{addon.name}</span>
                          <span>{price.toLocaleString()}</span>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                <div className="pt-6 border-t border-cream/20">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-lg">Estimated Total</span>
                    <span className="text-4xl font-bold text-primary">
                      <AnimatedPrice value={totalPrice} />
                    </span>
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                    onClick={scrollToBooking}
                  >
                    Get a Quote
                  </Button>

                  <p className="text-xs text-cream/50 text-center mt-4">
                    *Final pricing may vary based on specific requirements
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
