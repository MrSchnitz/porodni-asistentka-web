'use client'
import { Service } from '@/payload-types'
import { ServiceIcon } from './components/ServiceIcon'
import { X } from 'lucide-react'
import { ServiceDetailContent } from './components/ServiceDetailContent/ServiceDetailContent'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PAGE_ROUTES } from '../pageRoutes'
import { Modal, ModalImperativeHandle } from '@/components/Modal/Modal'
import { useRef } from 'react'

type ServiceDetailModalProps = {
  service: Service
}

export const ServiceDetailModal = ({ service }: ServiceDetailModalProps) => {
  const modalRef = useRef<ModalImperativeHandle | null>(null)

  const handleClose = () => {
    modalRef.current?.handleClose()
  }

  return (
    <Modal ref={modalRef}>
      <div className="relative mx-4 bg-card rounded-2xl shadow-2xl border border-primary/30">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-6 pb-3 mb-3 sticky top-0 bg-card rounded-t-2xl">
          {service.icon && <ServiceIcon icon={service.icon} />}
          <h1 className="text-3xl text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            {service.title}
          </h1>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors z-10"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-3 space-y-6">
          <ServiceDetailContent service={service} />
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-6 pt-3 sticky bottom-0 bg-card rounded-b-2xl shadow-lg">
          <Link href={PAGE_ROUTES.contactPage.path}>
            <Button size="lg" className="w-full bg-primary hover:bg-secondary text-foreground">
              Kontaktovat
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  )
}
