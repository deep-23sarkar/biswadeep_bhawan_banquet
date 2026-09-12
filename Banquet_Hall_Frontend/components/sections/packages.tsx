"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Basic",
    price: "2,499",
    description: "Perfect for intimate gatherings",
    features: [
      "১০০ জন পর্যন্ত অতিথি",
      "৪ ঘণ্টার জন্য বাড়ি ব্যবহারের সুযোগ",
      "সাধারণ ডেকোরেশন প্যাকেজ",
      "সাউন্ড সিস্টেম অন্তর্ভুক্ত",
      "৩০টি গাড়ি পার্কিংয়ের সুবিধা",
      "ইভেন্ট কোঅর্ডিনেটর / অনুষ্ঠান ব্যবস্থাপক",
    ],
    popular: false,
  },
  {
    name: "Gold",
    price: "4,999",
    description: "Our most popular choice",
    features: [
      "২৫০ জন পর্যন্ত অতিথি",
  "৮ ঘণ্টার জন্য বাড়ি ব্যবহারের সুযোগ",
  "প্রিমিয়াম ডেকোরেশন প্যাকেজ",
  "ডিজে এবং সাউন্ড সিস্টেম",
  "৮০টি গাড়ি পার্কিংয়ের সুবিধা",
  "ডেডিকেটেড ইভেন্ট কোঅর্ডিনেটর",
  "ক্যাটারিং সার্ভিস অন্তর্ভুক্ত",
  "ফটোগ্রাফি সেশন"
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "8,999",
    description: "Ultimate luxury experience",
    features: [
      "৫০০ জন পর্যন্ত অতিথি",
  "সারাদিনের জন্য বাড়ি ব্যবহারের সুযোগ",
  "লক্সারি ডেকোরেশন প্যাকেজ",
  "লাইভ ব্যান্ড এবং ডিজে",
  "ভ্যালেট পার্কিং সুবিধা",
  "ভিআইপি ইভেন্ট কোঅর্ডিনেটর",
  "প্রিমিয়াম ক্যাটারিং এবং বার সার্ভিস",
  "ফটো ও ভিডিও কভারেজ",
  "ব্রাইডাল সুইট ব্যবহারের সুযোগ",
  "বিনামূল্যে রিহার্সাল সুযোগ"
    ],
    popular: false,
  },
];

export function Packages() {
  const scrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="packages"
      className="py-24 lg:py-32 bg-linear-to-b from-cream to-background"
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
            Pricing Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Choose Your <span className="text-gold-gradient">Package</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            যেকোনো বাজেটে আপনার বিশেষ দিনটিকে সুন্দর করে সাজিয়ে তোলার সেরা
            প্যাকেজ
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 transition-shadow duration-300 ${
                pkg.popular
                  ? "bg-foreground text-cream shadow-2xl scale-105 lg:scale-110 z-10"
                  : "glass-card shadow-xl hover:shadow-2xl"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package name */}
              <h3
                className={`text-2xl font-serif font-bold mb-2 ${
                  pkg.popular ? "text-cream" : "text-foreground"
                }`}
              >
                {pkg.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  pkg.popular ? "text-cream/70" : "text-muted-foreground"
                }`}
              >
                {pkg.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span
                  className={`text-sm ${pkg.popular ? "text-cream/70" : "text-muted-foreground"}`}
                >
                  Starting from
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-bold ${
                      pkg.popular ? "text-primary" : "text-gold-gradient"
                    }`}
                  >
                    ${pkg.price}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        pkg.popular ? "bg-primary" : "bg-primary/20"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          pkg.popular
                            ? "text-primary-foreground"
                            : "text-primary"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        pkg.popular ? "text-cream/90" : "text-foreground/80"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-cream hover:bg-foreground/90"
                }`}
                onClick={scrollToBooking}
              >
                Select Package
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom package note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Need a custom package?{" "}
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-primary hover:underline font-medium"
            >
              Contact us
            </button>{" "}
            to discuss your requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
