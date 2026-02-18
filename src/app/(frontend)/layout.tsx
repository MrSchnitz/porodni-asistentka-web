import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/globals/Layout/Header/Header'
import { AdminBar } from '@/components/AdminBar'
import { draftMode, headers } from 'next/headers'
import { Footer } from '@/globals/Layout/Footer/Footer'
import { Announcement } from '@/globals/Layout/Announcement/Announcement'
import { CookieConsent } from '@/components/CookieConsent/CookieConsent'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

const baseUrl = getServerSideURL()
const siteName = 'Eva Hurtová, DiS., porodní asistentka'
const defaultDescription =
  'Eva Hurtová, DiS., porodní asistentka – informace o službách, příprava na porod, doprovod u porodu a péče o rodinu po porodu.'

/** Default image for link preview (Facebook, WhatsApp, Twitter, etc.). Recommended size: 1200×630 px. File: public/og-image.jpg */
const defaultOgImage = '/og-image.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName,
    title: siteName,
    description: defaultDescription,
    url: baseUrl,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Uncomment and set when you have verification codes:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerList, { isEnabled }] = await Promise.all([headers(), draftMode()])
  const isPreview = headerList.get('x-preview')

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    description: defaultDescription,
    url: baseUrl,
    inLanguage: 'cs',
  }

  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body data-preview={isPreview ? 'true' : undefined}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Přeskočit na obsah
        </a>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        {!isPreview && <Announcement />}
        {!isPreview && <Header />}
        <main id="main-content">{children}</main>
        {!isPreview && <Footer />}
        {!isPreview && <CookieConsent />}
      </body>
    </html>
  )
}
