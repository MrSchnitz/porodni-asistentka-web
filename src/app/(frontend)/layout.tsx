import React from 'react'
import './globals.css'
import { Header } from '@/globals/Header/Header'

export const metadata = {
  description: 'Web for porodni asistentka',
  title: 'Porodni asistentka web',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
