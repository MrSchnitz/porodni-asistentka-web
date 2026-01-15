'use server'

import nodemailer from 'nodemailer'

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export type ContactFormState = {
  success: boolean
  message: string
} | null

// Minimum time in milliseconds that a human would take to fill the form
const MIN_FORM_TIME_MS = 3000

// Cloudflare Turnstile verification
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type TurnstileVerifyResponse = {
  success: boolean
  'error-codes'?: string[]
}

async function verifyTurnstileToken(
  token: string,
  secretKey: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data: TurnstileVerifyResponse = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: data['error-codes']?.join(', ') || 'Unknown error',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return { success: false, error: 'Verification request failed' }
  }
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  // Honeypot field - if filled, it's a bot (this field is hidden from real users)
  const honeypot = formData.get('website') as string
  if (honeypot) {
    // Silently reject but return success to not alert bots
    console.log('Bot detected: honeypot field filled')
    return { success: true, message: 'Děkuji za zprávu! Ozvu se vám co nejdříve.' }
  }

  // Time-based validation - bots submit too quickly
  const formLoadTime = formData.get('_formLoadTime') as string
  if (formLoadTime) {
    const loadTime = parseInt(formLoadTime, 10)
    const submitTime = Date.now()
    const timeDiff = submitTime - loadTime

    if (timeDiff < MIN_FORM_TIME_MS) {
      console.log(`Bot detected: form submitted too quickly (${timeDiff}ms)`)
      return { success: true, message: 'Děkuji za zprávu! Ozvu se vám co nejdříve.' }
    }
  }

  // Cloudflare Turnstile verification (only if configured)
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecretKey) {
    const turnstileToken = formData.get('cf-turnstile-response') as string

    if (!turnstileToken) {
      return { success: false, message: 'Prosím potvrďte, že nejste robot.' }
    }

    const turnstileVerification = await verifyTurnstileToken(turnstileToken, turnstileSecretKey)
    if (!turnstileVerification.success) {
      console.log('Bot detected: Turnstile verification failed', turnstileVerification.error)
      return { success: true, message: 'Děkuji za zprávu! Ozvu se vám co nejdříve.' }
    }
  }

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, message: 'Vyplňte prosím všechna povinná pole' }
  }

  try {
    const transporter = getTransporter()
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Kontaktní formulář: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nová zpráva z kontaktního formuláře</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Jméno:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'Neuvedeno'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <strong>Zpráva:</strong>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    return { success: true, message: 'Děkuji za zprávu! Ozvu se vám co nejdříve.' }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, message: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' }
  }
}
