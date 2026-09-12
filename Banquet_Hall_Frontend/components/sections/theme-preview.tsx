"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, Flower2, Minimize2, Cake } from "lucide-react"

const themes = [
  {
    id: "royal",
    name: "Royal Elegance",
    icon: Crown,
    description: "Majestic gold accents with rich velvet drapes",
    colors: ["from-amber-100", "via-amber-200", "to-amber-300"],
    accent: "bg-amber-500",
    features: ["সোনালী ঝাড়বাতি", "Velvet seating", "রাজকীয় পর্দা", "Crystal centerpieces"],
  },
  {
    id: "floral",
    name: "Garden Romance",
    icon: Flower2,
    description: "Fresh florals with natural greenery touches",
    colors: ["from-rose-100", "via-pink-100", "to-green-100"],
    accent: "bg-rose-400",
    features: ["Fresh flowers", "Garden arches", "Natural lighting", "Rustic elements"],
  },
  {
    id: "minimal",
    name: "Modern Minimal",
    icon: Minimize2,
    description: "Clean lines with contemporary sophistication",
    colors: ["from-slate-100", "via-gray-100", "to-zinc-100"],
    accent: "bg-slate-600",
    features: ["Geometric shapes", "Subtle lighting", "Monochrome palette", "Clean lines"],
  },
  {
    id: "birthday",
    name: "Celebration",
    icon: Cake,
    description: "Fun and festive with vibrant accents",
    colors: ["from-sky-100", "via-violet-100", "to-fuchsia-100"],
    accent: "bg-fuchsia-500",
    features: ["Balloon arches", "LED displays", "Colorful linens", "Fun props"],
  },
]

export function ThemePreview() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])

  return (
    <section className="py-24 lg:py-32 bg-linear-to-b from-cream to-background">
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
            Decoration Themes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Choose Your <span className="text-gold-gradient">Theme</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our curated decoration themes and visualize your perfect event
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Theme Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {themes.map((theme, index) => (
                <motion.button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                    selectedTheme.id === theme.id
                      ? "bg-foreground text-cream shadow-xl"
                      : "glass-card hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      selectedTheme.id === theme.id
                        ? theme.accent
                        : "bg-primary/20"
                    }`}>
                      <theme.icon className={`w-7 h-7 ${
                        selectedTheme.id === theme.id
                          ? "text-white"
                          : "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-serif font-semibold ${
                        selectedTheme.id === theme.id
                          ? "text-cream"
                          : "text-foreground"
                      }`}>
                        {theme.name}
                      </h3>
                      <p className={`text-sm ${
                        selectedTheme.id === theme.id
                          ? "text-cream/70"
                          : "text-muted-foreground"
                      }`}>
                        {theme.description}
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      selectedTheme.id === theme.id
                        ? "border-primary"
                        : "border-muted"
                    }`}>
                      {selectedTheme.id === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 rounded-full bg-primary"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Theme Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTheme.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Preview Card */}
                  <div className={`aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-linear-to-br ${selectedTheme.colors.join(" ")}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      {/* Theme Icon */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`w-20 h-20 rounded-2xl ${selectedTheme.accent} flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <selectedTheme.icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Theme Name */}
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-serif font-bold text-foreground mb-2"
                      >
                        {selectedTheme.name}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground text-center mb-6"
                      >
                        {selectedTheme.description}
                      </motion.p>

                      {/* Features */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-2"
                      >
                        {selectedTheme.features.map((feature, index) => (
                          <motion.span
                            key={feature}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="px-3 py-1 bg-card/80 backdrop-blur-sm rounded-full text-sm text-foreground"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-20 h-20 border border-foreground/10 rounded-full" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 border border-foreground/10 rounded-full" />
                  </div>

                  {/* Decorative backdrop */}
                  <div className={`absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl ${selectedTheme.accent} opacity-20`} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
