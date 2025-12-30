import React from 'react'
import './globals.css'
import { Header } from '@/globals/Layout/Header/Header'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import { Footer } from '@/globals/Layout/Footer/Footer'
import { Announcement } from '@/globals/Layout/Announcement/Announcement'

export const metadata = {
  description: 'Web pro porodni asistentku',
  title: 'Porodni asistentka web',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <Announcement />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
