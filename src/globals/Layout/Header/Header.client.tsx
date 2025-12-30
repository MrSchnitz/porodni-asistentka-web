'use client'
import { Header } from '@/payload-types'
import Link from 'next/link'
import { useState } from 'react'
import { Phone, Mail, X, Menu } from 'lucide-react'
import { GlobalLogo } from '@/components/Logo/GlobalLogo'
import { NavItem } from './components/NavItem'
import { motion } from 'motion/react'

type Props = {
  data: Header
}

export function HeaderClient({
  data: { headerTitle, headerSubTitle, logo, email, phone, navItems },
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {logo && <GlobalLogo logo={logo} className="w-10 h-10 sm:w-12 sm:h-12" />}
            <div className="flex flex-col justify-center">
              <span
                className="text-lg sm:text-2xl text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {headerTitle}
              </span>
              {headerSubTitle && (
                <span
                  className="text-sm sm:text-md text-foreground"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {headerSubTitle}
                </span>
              )}
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems?.map((item) => (
              <NavItem key={item.id} item={item.link} />
            ))}
            {/* Contact Info */}
            <div className="flex items-center gap-6 ml-4 border-l border-primary/20 pl-6">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden fixed left-0 right-0 bg-background/98 backdrop-blur-md border-b border-primary/20 shadow-xl"
        initial={false}
        animate={{
          top: 72,
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
          paddingTop: mobileMenuOpen ? 24 : 0,
          paddingBottom: mobileMenuOpen ? 24 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          overflow: 'hidden',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {navItems?.map((item) => (
              <NavItem key={item.id} item={item.link} className="text-left py-2" />
            ))}

            {/* Mobile Contact Info */}
            <div className="flex flex-col gap-3 pt-4 border-t border-primary/20">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span>{phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail className="w-5 h-5" />
                <span>{email}</span>
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Backdrop overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          style={{ top: 80 }}
        />
      )}
    </motion.header>
  )
}
