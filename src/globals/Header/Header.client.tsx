'use client'
import { Header } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Heart, Phone, Mail, X, Menu } from 'lucide-react'

type Props = {
  data: Header
}

export function HeaderClient({
  data: { headerTitle, headerSubTitle, logo, email, phone, navItems },
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {logo ? (
              <img className="w-12 h-12" src={typeof logo === 'string' ? logo : (logo.url ?? '')} />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white fill-white" />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <span
                className="text-2xl text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {headerTitle}
              </span>
              {headerSubTitle && (
                <span
                  className="text-md text-foreground"
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
              <Link
                key={item.id}
                href={item.link.url ?? ''}
                className={`transition-colors ${
                  isActive(item.link.url ?? '')
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.link.label}
              </Link>
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
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/20">
            <div className="flex flex-col gap-4">
              {navItems?.map((item) => (
                <Link
                  key={item.id}
                  href={item.link.url ?? ''}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-left transition-colors py-2 ${
                    isActive(item.link.url ?? '')
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.link.label}
                </Link>
              ))}

              {/* Mobile Contact Info */}
              <div className="flex flex-col gap-3 pt-4 border-t border-primary/20">
                <a
                  href="tel:+420777123456"
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
          </nav>
        )}
      </div>
    </header>
  )
}
