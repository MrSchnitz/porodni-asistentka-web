'use client'

import { GlobalLogo } from '@/components/Logo/GlobalLogo'
import { PAGE_ROUTES } from '@/features/_shared/pageRoutes'
import { Footer } from '@/payload-types'
import { Mail, MapPin, Phone, Lock } from 'lucide-react'
import Link from 'next/link'

type Props = {
  data: Footer
}

export const FooterClient = ({
  data: { logo, footerTitle, footerSubTitle, downloadsSection, contact, bottomText },
}: Props) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-8 md:py-12" aria-label="Patička webu">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              {logo && <GlobalLogo logo={logo} className="w-12 h-12" />}
              <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                {footerTitle}
              </span>
            </div>
            <p className="text-background/70">{footerSubTitle}</p>
          </div>

          {/* Documents Section */}
          {downloadsSection?.enabled && (
            <div>
              <h2 className="mb-2 md:mb-3 text-base">{downloadsSection.title}</h2>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link
                    href={PAGE_ROUTES.downloadsPage.path}
                    className="text-background/70 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    {downloadsSection.link}
                  </Link>
                </li>
              </ul>
              {downloadsSection.description && (
                <p className="text-background/60 text-xs mt-2 md:mt-3">
                  {downloadsSection.description}
                </p>
              )}
            </div>
          )}

          {/* Contact Info */}
          {contact && (
            <div className="md:col-start-3 md:col-end-3">
              {contact.title && <h2 className="text-lg mb-3 md:mb-4">{contact.title}</h2>}
              <ul className="space-y-2 md:space-y-3">
                {contact.phone && (
                  <li className="flex items-start gap-3 text-background/70">
                    <Phone className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="hover:text-primary transition-colors"
                      aria-label={`Zavolat na ${contact.phone}`}
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li className="flex items-start gap-3 text-background/70">
                    <Mail className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-primary transition-colors"
                      aria-label={`Napsat email na ${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.adress && (
                  <li className="flex items-start gap-3 text-background/70">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                    <address className="not-italic">{contact.adress}</address>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {bottomText && (
          <div className="border-t border-background/20 mt-6 pt-6 md:mt-8 md:pt-8 text-center text-background/70 w-full">
            <p>
              &copy; {currentYear} {bottomText}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}
