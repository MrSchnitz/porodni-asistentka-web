import { ImportantItemsSection as ImportantItemsSectionType } from '@/features/_shared/types'
import { CheckCircle2 } from 'lucide-react'

const ImportantItem = ({ title }: { title: string }) => {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <span>{title}</span>
    </li>
  )
}

type Props = ImportantItemsSectionType

export const ImportantItemsSection = ({ title, infoItems }: Props) => {
  return (
    <div className="mt-12 p-6 bg-linear-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/30">
      <h3 className="text-xl mb-3 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h3>
      <ul className="space-y-2 text-foreground/70">
        {infoItems?.map((item) => (
          <ImportantItem key={item.id} title={item.item} />
        ))}
      </ul>
    </div>
  )
}
