import { Card, CardContent } from '@/components/ui/card'
import { ServiceBenefitsSection as ServiceBenefitsSectionType } from '@/features/_shared/types'
import { CheckCircle2 } from 'lucide-react'

type Props = {
  benefitsSection: ServiceBenefitsSectionType
}

export const ServiceBenefitsSection = ({ benefitsSection }: Props) => {
  return (
    <Card className="border-primary/30 bg-muted">
      <CardContent className="p-6">
        <h2 className="text-2xl mb-4 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          {benefitsSection.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefitsSection?.benefits?.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/80">{benefit.title}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
