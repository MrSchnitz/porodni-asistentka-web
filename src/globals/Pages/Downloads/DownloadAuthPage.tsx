'use client'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '../components/PageHeader'
import { useState, useTransition } from 'react'
import { DownloadsPage as DownloadsPageType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { verifyDownloadsPassword } from '@/app/(frontend)/ke-stazeni/actions'
import { useRouter } from 'next/navigation'

export const DownloadAuthPage = ({ data }: { data: DownloadsPageType }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    startTransition(async () => {
      const result = await verifyDownloadsPassword(password)
      if (result.success) {
        router.refresh()
      } else {
        setError(result.error ?? 'Nesprávné heslo')
        setPassword('')
      }
    })
  }

  const { pageHeader } = data

  return (
    <div className="min-dvh-screen bg-background">
      <PageHeader data={pageHeader} />

      {/* Password Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="border-primary/30">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2
                  className="text-2xl text-center mb-2 text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Chráněná sekce
                </h2>
                <p className="text-center text-foreground/70 mb-6">
                  Pro přístup k dokumentům zadejte heslo
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2 text-foreground">
                      Heslo
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                        placeholder="Zadejte heslo"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-primary transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-foreground"
                    size="lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Ověřování...
                      </>
                    ) : (
                      'Přihlásit se'
                    )}
                  </Button>
                </form>

                <p className="text-center text-foreground/60 text-sm mt-6">
                  Heslo obdržíte při první konzultaci nebo emailem po domluvě.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
