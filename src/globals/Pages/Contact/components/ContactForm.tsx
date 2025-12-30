'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert('Děkuji za zprávu! Ozvu se vám co nejdříve.')
  }

  return (
    <Card className="border-primary/30 shadow-lg bg-card">
      <CardContent className="p-6">
        <h3 className="text-2xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Napište mi
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-2 text-foreground/80">
              Jméno
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Vaše jméno"
              required
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-2 text-foreground/80">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="vas@email.cz"
              required
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-2 text-foreground/80">
              Telefon
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+420 777 123 456"
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-2 text-foreground/80">
              Zpráva
            </label>
            <Textarea
              id="message"
              placeholder="Napište mi o vašich potřebách..."
              rows={5}
              required
              className="border-primary/30 focus:border-primary bg-input-background"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-foreground"
            size="lg"
          >
            Odeslat zprávu
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
