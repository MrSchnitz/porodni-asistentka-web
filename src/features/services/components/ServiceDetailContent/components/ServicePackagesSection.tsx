import { Card, CardContent } from '@/components/ui/card'
import { ServicePackageSection as ServicePackageSectionType } from '@/features/_shared/types'
import { CheckCircle2 } from 'lucide-react'

type Props = {
  packageSection: ServicePackageSectionType
}

export const ServicePackagesSection = ({ packageSection }: Props) => {
  return (
    <div>
      <div className="text-center mb-6 space-y-2">
        <h2
          className="text-2xl text-foreground text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {packageSection.title}
        </h2>
        <p className="text-lg text-foreground/90 max-w-2xl mx-auto">{packageSection.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packageSection.packages?.map((pkg, idx) => (
          <Card key={idx} className="border-2 transition-all hover:shadow-lg border-primary/30">
            <CardContent className="p-6">
              <h3
                className="text-xl mb-2 text-foreground text-center"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {pkg.title}
              </h3>

              {/* Price */}
              {pkg.price && (
                <div className="text-center mb-6 pb-4 border-b border-primary/20">
                  <div className="text-3xl text-primary mb-1">{pkg.price}</div>
                </div>
              )}

              {/* Items */}
              {pkg.includedOffers && pkg.includedOffers.length > 0 && (
                <div className="space-y-3 mb-6">
                  {pkg.includedOffers.map((offer, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{offer.item}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
