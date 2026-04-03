import type { Metadata } from 'next'
import { LenisProvider } from '@/providers/LenisProvider'
import { Navigation } from '@/components/global/Navigation'
import { Footer } from '@/components/global/Footer'
import { ScrollProgress } from '@/components/global/ScrollProgress'
import { PageTransition } from '@/components/global/PageTransition'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Superb Maintenance Group | Premium Property Maintenance Sydney',
    template: '%s | Superb Maintenance Group',
  },
  description:
    "Sydney's most trusted 5 star property maintenance company. Residential and strata maintenance, renovations, rendering, microcement, and more. Quote in 6 hours.",
  keywords: [
    'property maintenance Sydney',
    'strata maintenance',
    'residential renovations',
    'rendering Sydney',
    'CEMHER microcement',
    'building maintenance',
    'facade restoration',
    'tiling Sydney',
    'painting Sydney',
    'pressure washing',
    'sandstone restoration',
  ],
  authors: [{ name: 'Superb Maintenance Group' }],
  creator: 'Superb Maintenance Group',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://superbmaintenancegroup.com.au',
    siteName: 'Superb Maintenance Group',
    title: 'Superb Maintenance Group | Premium Property Maintenance Sydney',
    description:
      "Sydney's most trusted 5 star property maintenance company. Quote in 6 hours. Emergency response in 24 hours.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superb Maintenance Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superb Maintenance Group | Premium Property Maintenance Sydney',
    description:
      "Sydney's most trusted 5 star property maintenance company.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://superbmaintenancegroup.com.au'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-pure text-text">
        <LenisProvider>
          <ScrollProgress />
          <div className="noise-overlay" aria-hidden="true" />
          <Navigation />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
