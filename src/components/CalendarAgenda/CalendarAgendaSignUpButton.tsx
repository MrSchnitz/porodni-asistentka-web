'use client'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PAGE_ROUTES } from '@/features/_shared/pageRoutes'
import { isRichTextEmpty } from '@/utilities/richText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Link from 'next/link'
import { useCallback, useId, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  eventTitle: string
  className?: string
  signUpDetails?: DefaultTypedEditorState | null
}

export function CalendarAgendaSignUpButton({ eventTitle, className, signUpDetails }: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const close = useCallback(() => setOpen(false), [])
  const openModal = useCallback(() => setOpen(true), [])

  return (
    <>
      <Button
        className={cn('shrink-0 bg-primary/60 hover:bg-secondary/60 text-foreground', className)}
        type="button"
        size="sm"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Přihlásit se
      </Button>
      <Dialog open={open} onClose={close} aria-labelledby={titleId}>
        <DialogContent onClose={close}>
          <DialogHeader>
            <DialogTitle id={titleId}>Přihlášení na termín</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <h2 className="text-foreground mb-4 text-2xl font-medium">{eventTitle}</h2>
            {signUpDetails && !isRichTextEmpty(signUpDetails) ? (
              <RichText data={signUpDetails} className="text-base text-foreground" />
            ) : (
              <p className="text-foreground/90">
                Pro přihlášení na tento termín nás prosím{' '}
                <Link
                  href={PAGE_ROUTES.contactPage.path}
                  className="text-primary underline font-medium"
                  onClick={close}
                >
                  kontaktujte přes stránku Kontakt
                </Link>
                .
              </p>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
