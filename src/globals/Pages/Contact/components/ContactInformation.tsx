import { Card, CardContent } from '@/components/ui/card'
import { ContactPageInfo, ContactPageNote } from '../../types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import RichText from '@/components/RichText'

const InfoContent = ({ info }: { info: ContactPageInfo }) => {
  if (info.valueType === 'formattedText' && info.formattedValue) {
    return <RichText className="text-base text-foreground/80" data={info.formattedValue} />
  }

  if (!info.value) {
    return null
  }

  switch (info.valueType) {
    case 'email':
      return (
        <a
          href={`mailto:${info.value}`}
          className="text-foreground/90 hover:text-secondary transition-colors"
          aria-label={`Napsat email na ${info.value}`}
        >
          {info.value}
        </a>
      )
    case 'phone':
      return (
        <a
          href={`tel:${info.value}`}
          className="text-foreground/90 hover:text-secondary transition-colors"
          aria-label={`Zavolat na ${info.value}`}
        >
          {info.value}
        </a>
      )
    case 'link':
      return (
        <a href={info.value} className="text-primary hover:text-secondary transition-colors">
          {info.value}
        </a>
      )
    default:
      return <span className="text-foreground/90">{info.value}</span>
  }
}

type Props = {
  contactInfo: ContactPageInfo[]
  note: ContactPageNote | null
}

export const ContactInformation = ({ contactInfo, note }: Props) => {
  return (
    <div>
      <h3 className="text-2xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
        Kontaktní informace
      </h3>

      <div className="space-y-4 mb-8">
        {contactInfo.map((info, index) => (
          <Card key={index} className="border-primary/30 hover:shadow-md transition-shadow bg-card">
            <CardContent className="p-4 flex items-start gap-4">
              {info.icon && (
                <div
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <DynamicIcon name={info.icon as IconName} className="w-5 h-5 text-primary" />
                </div>
              )}
              <div>
                <div className="text-base text-foreground font-medium mb-1">{info.title}</div>
                <div>
                  <InfoContent info={info} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {note && (
        <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 border border-primary/30">
          <RichText className="text-base text-foreground" data={note} />
        </div>
      )}
    </div>
  )
}
