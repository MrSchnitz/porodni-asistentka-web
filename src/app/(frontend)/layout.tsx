import React from 'react'
import './globals.css'
import { Header } from '@/globals/Header/Header'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Footer } from '@/globals/Footer/Footer'

export const metadata = {
  description: 'Web for porodni asistentka',
  title: 'Porodni asistentka web',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
