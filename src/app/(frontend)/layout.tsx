import React from 'react'
import './globals.css'
import { Header } from '@/globals/Layout/Header/Header'
import { AdminBar } from '@/components/AdminBar'
import { draftMode, headers } from 'next/headers'
import { Footer } from '@/globals/Layout/Footer/Footer'
import { Announcement } from '@/globals/Layout/Announcement/Announcement'
import { CookieConsent } from '@/components/CookieConsent/CookieConsent'

export const dynamic = 'force-dynamic'

export const metadata = {
  description: 'Web pro porodni asistentku',
  title: 'Porodni asistentka web',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerList, { isEnabled }] = await Promise.all([headers(), draftMode()])
  const isPreview = headerList.get('x-preview')

  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
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
