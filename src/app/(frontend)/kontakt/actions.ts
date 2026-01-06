'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export type ContactFormState = {
  success: boolean
  message: string
} | null

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, message: 'Vyplňte prosím všechna povinná pole' }
  }

  try {
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
