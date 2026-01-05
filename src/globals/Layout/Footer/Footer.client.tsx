import { GlobalLogo } from '@/components/Logo/GlobalLogo'
import { PAGE_ROUTES } from '@/globals/Pages/pageRoutes'
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
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
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
              <h3 className="mb-3">{downloadsSection.title}</h3>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link
                    href={PAGE_ROUTES.downloadsPage.path}
                    className="text-background/70 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    {downloadsSection.link}
                  </Link>
                </li>
              </ul>
              {downloadsSection.description && (
                <p className="text-background/60 text-xs mt-3">{downloadsSection.description}</p>
              )}
            </div>
          )}

          {/* Contact Info */}
          {contact && (
            <div className="md:col-start-3 md:col-end-3">
              {contact.title && <h3 className="text-lg mb-4">{contact.title}</h3>}
              <ul className="space-y-3">
                {contact.phone && (
                  <li className="flex items-start gap-3 text-background/70">
                    <Phone className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <a href="tel:+420777123456" className="hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li className="flex items-start gap-3 text-background/70">
                    <Mail className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <a
                      href="mailto:jana@porodni-asistentka.cz"
                      className="hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.adress && (
                  <li className="flex items-start gap-3 text-background/70">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <span>{contact.adress}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {bottomText && (
          <div className="border-t border-background/20 pt-8 text-center text-background/70 w-full">
            <p>
              &copy; {currentYear} {bottomText}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}
