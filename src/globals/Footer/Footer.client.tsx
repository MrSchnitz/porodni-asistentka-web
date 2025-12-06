import { GlobalLogo } from '@/components/Logo/GlobalLogo'
import { Footer } from '@/payload-types'
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

type Props = {
  data: Footer
}

export const FooterClient = ({
  data: { logo, footerTitle, footerSubTitle, quickLinks, contact, bottomText },
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

          {/* Quick Links */}
          {quickLinks?.links && (
            <div>
              {quickLinks.title && <h3 className="text-lg mb-4">{quickLinks.title}</h3>}
              <ul className="space-y-2">
                {quickLinks.links.map(({ link, id }) => (
                  <li key={id}>
                    <Link
                      href={link.url ?? ''}
                      className="text-background/70 hover:text-primary transition-colors"
                      target={link.newTab ? '_blank' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          {contact && (
            <div>
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
