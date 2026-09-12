import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Gallery } from "@/components/sections/gallery"
import { Packages } from "@/components/sections/packages"
import { Amenities } from "@/components/sections/amenities"
import { Capacity } from "@/components/sections/capacity"
// import { Availability } from "@/components/sections/availability"
import { Calculator } from "@/components/sections/calculator"
import { ThemePreview } from "@/components/sections/theme-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { Location } from "@/components/sections/location"
import { BookingForm } from "@/components/sections/booking-form"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import {FAQ} from "@/components/sections/faq"

import { Toaster } from "react-hot-toast"

// Dynamic import for smooth scroll (client-side only)
const SmoothScrollProvider = dynamic(
  () =>
    import("@/components/smooth-scroll-provider").then(
      (mod) => mod.SmoothScrollProvider
    ),
  { ssr: false }
)

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Gallery />
        {/* <Packages /> */}
        <Amenities />
        <Capacity />
        {/* <Availability /> */}
        <Calculator />
        <ThemePreview />
        <Testimonials />
        <Location />
        <BookingForm />
        <FAQ/>
        <Contact />
        <Footer />
        <Toaster position="top-right"/>
      </main>
    </SmoothScrollProvider>
  )
}
