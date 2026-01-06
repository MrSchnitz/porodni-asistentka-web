'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail, type ContactFormState } from '@/app/(frontend)/kontakt/actions'

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-secondary text-foreground"
      size="lg"
    >
      {pending ? 'Odesílám...' : 'Odeslat zprávu'}
    </Button>
  )
}

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    sendContactEmail,
    null,
  )
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form on success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <Card className="border-primary/30 shadow-lg bg-card">
      <CardContent className="p-6">
        <h3 className="text-2xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Napište mi
        </h3>

        {state && (
          <div
            className={`mb-4 p-3 rounded ${
              state.success
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}
          >
            {state.message}
          </div>
        )}

        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-2 text-foreground/80">
              Jméno
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Vaše jméno"
              required
              disabled={isPending}
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-2 text-foreground/80">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vas@email.cz"
              required
              disabled={isPending}
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-2 text-foreground/80">
              Telefon
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+420 777 123 456"
              disabled={isPending}
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-2 text-foreground/80">
              Zpráva
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Napište mi o vašich potřebách..."
              rows={5}
              required
              disabled={isPending}
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <SubmitButton pending={isPending} />
        </form>
      </CardContent>
    </Card>
  )
}
