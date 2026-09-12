'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'আপনাদের ব্যাংকুয়েট হলে কতজন ধরে?',
    answer: '৫০ জন থেকে শুরু করে ৫০০ জনেরও বেশি (500+) অতিথির বিশাল প্রোগ্রামের জন্য আমাদের হল একদম পারফেক্ট! বসার স্পেশাল ব্যবস্থা আর ফ্লেক্সিবল সিটিং এরিয়া থাকায় যেকোনো বড় পার্টি বা বিয়েবাড়ি অনায়াসে আর আরামে সামলে নেওয়া যায়।'
  },
  {
    question: 'খাবারের (Catering) ব্যবস্থা কি আপনারা করেন?',
    answer: 'একদম! আমাদের স্পেশাল শেফদের হাতে তৈরি সেরা স্বাদের খাঁটি বাঙালি খাবার, বিরিয়ানি কিংবা চাইনিজ মেনু পেয়ে যাবেন। আর আপনি চাইলে বাইরের কেটারার দিয়ে রান্না করানোরও ব্যবস্থা করতে পারেন।'
  },
  {
    question: 'বুকিং ক্যানসেল করলে টাকা ফেরত পাওয়া যাবে?',
    answer: 'অনুষ্ঠানের ৩০ দিন আগে জানালে ৯০% টাকা ফেরত পেয়ে যাবেন। আর কোনো ইমার্জেন্সি হলে ডেট চেঞ্জ করার ব্যাপারে আমরা সবরকম হেল্প করব।'
  },
  {
    question: 'ডেকোরেশন কি নিজেদের মতো করা যাবে?',
    answer: 'হ্যাঁ, অবশ্যই! আমাদের নিজস্ব ডেকোরেটর টিম দিয়ে সুন্দর থিমে সাজাতে পারেন, অথবা আপনার পছন্দের কোনো বাইরের ডেকোরেটর এনে সাজিয়ে নেওয়ার পুরো স্বাধীনতা আছে।'
  },
  {
    question: 'গাড়ি পার্কিংয়ের জায়গা আছে তো?',
    answer: 'হ্যাঁ, একদম সিকিউরড নিজস্ব পার্কিং আছে। ৫০টার বেশি গাড়ি আর প্রচুর বাইক আরামে রাখা যাবে, সাথে ভ্যালেট পার্কিংয়ের ব্যবস্থাও থাকছে।'
  },
  {
    question: 'একই দিনে দুটো অনুষ্ঠান করা যাবে?',
    answer: 'হ্যাঁ, আমাদের হল বেশ বড় আর এতে একাধিক স্পেস আছে, তাই একই দিনে গায়ে হলুদ ও রিসেপশন বা দুটো আলাদা প্রোগ্রাম খুব সহজেই ম্যানেজ করা যায়।'
  },
  {
    question: 'প্যাকেজের সাথে আর কী কী থাকছে?',
    answer: 'সেন্ট্রাল এসি, সাউন্ড সিস্টেম, জেনারেটর ব্যাকআপ, প্রপার লাইটিং, ব্রাইডাল রুম (কনের রুম) আর সার্বিক সাহায্যের জন্য কেয়ারটেকার স্টাফ—সবই প্যাকেজে ইনক্লুডেড!'
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      className="border-b border-stone-200 last:border-b-0"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-amber-50/50 transition-colors duration-200 text-left"
      >
        <span className="text-lg font-semibold text-stone-800">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-amber-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-b from-amber-50/30 to-transparent text-stone-700 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-rose-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-stone-600 text-balance">
            Find answers to common questions about our venue, services, and booking process
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-stone-600 mb-4">
            Still have questions? We&apos;d love to help!
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-600/30 transition-all duration-300 hover:-translate-y-1"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
