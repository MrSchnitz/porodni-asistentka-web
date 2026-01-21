'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail, type ContactFormState } from '@/app/(frontend)/kontakt/actions'

// Turnstile site key (public, safe to hardcode)
const TURNSTILE_SITE_KEY = '0x4AAAAAACMuRHgADAH5xj6d'

function SubmitButton({ pending, disabled }: { pending: boolean; disabled: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
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
  const turnstileRef = useRef<TurnstileInstance>(null)
  // Store the time when form was loaded for bot detection
  const [formLoadTime] = useState(() => Date.now())
  // Turnstile token state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState<string | null>(null)

  const isTurnstileEnabled = TURNSTILE_SITE_KEY.length > 0

  // Reset form and turnstile on success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
      // Reset turnstile widget after successful submission
      turnstileRef.current?.reset()
      setTurnstileToken(null)
      setTurnstileError(null)
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
            role="alert"
            aria-live="polite"
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
          {/* Honeypot field - hidden from real users, bots will fill it */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Hidden timestamp for bot detection */}
          <input type="hidden" name="_formLoadTime" value={formLoadTime} />

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

          {/* Cloudflare Turnstile widget */}
          {isTurnstileEnabled && (
            <div className="flex flex-col items-center gap-2">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => {
                  setTurnstileToken(token)
                  setTurnstileError(null)
                }}
                onError={(error) => {
                  setTurnstileToken(null)
                  setTurnstileError(`Chyba ověření: ${error || 'neznámá'}`)
                }}
                onExpire={() => {
                  setTurnstileToken(null)
                  setTurnstileError('Ověření vypršelo, zkuste znovu.')
                }}
                options={{
                  theme: 'auto',
                  language: 'cs',
                }}
              />
              {turnstileError && <p className="text-sm text-red-600">{turnstileError}</p>}
            </div>
          )}

          {/* Hidden field to pass turnstile token */}
          {turnstileToken && (
            <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
          )}

          <SubmitButton
            pending={isPending}
            disabled={isTurnstileEnabled ? !turnstileToken : false}
          />
        </form>
      </CardContent>
    </Card>
  )
}
