import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'


const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Biswadeep Bhavan',
  description: 'Make your special day unforgettable at Grand Elegance Banquet Hall. Perfect venue for weddings, birthdays, receptions, and traditional events. Book your dream celebration today.',
  keywords: ['banquet hall', 'wedding venue', 'event space', 'party hall', 'reception venue', 'birthday party', 'corporate events'],
  authors: [{ name: 'Biswadeep Bhawan' }],
  openGraph: {
    title: 'Biswadeep Bhavan',
    description: 'Make your special day unforgettable at Grand Elegance Banquet Hall. Perfect venue for weddings, birthdays, receptions, and traditional events.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Biswadeep Bhavan banquet hall',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biswadeep Bhawan | Premium Banquet Hall',
    description: 'Make your special day unforgettable at Grand Elegance Banquet Hall.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/hall-icon.jpeg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/hall-icon.jpeg',
        media: '(prefers-color-scheme: dark)',
      },
      // {
      //   url: '/icon.svg',
      //   type: 'image/svg+xml',
      // },
    ],
    apple: '/hall-icon.jpeg',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1814' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
