"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (anchor?.hash && anchor.hash.startsWith("#")) {
        const element = document.querySelector(anchor.hash)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element as HTMLElement)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
