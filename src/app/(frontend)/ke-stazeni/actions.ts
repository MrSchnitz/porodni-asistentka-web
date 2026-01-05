'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import bcrypt from 'bcryptjs'

const COOKIE_NAME = 'dwn_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 1 day

export async function verifyDownloadsPassword(
  password: string,
): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config })
  const downloadsPage = await payload.findGlobal({ slug: 'downloadsPage' })

  const hashedPassword = downloadsPage.passwordHash

  if (!hashedPassword) {
    return { success: false, error: 'Heslo není nastaveno. Kontaktujte administrátora.' }
  }

  const isValid = await bcrypt.compare(password, hashedPassword)

  if (isValid) {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
    })
    return { success: true }
  }

  return { success: false, error: 'Nesprávné heslo. Zkuste to prosím znovu.' }
}

export async function isDownloadsAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(COOKIE_NAME)
  return authCookie?.value === 'authenticated'
}

export async function logoutDownloads(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
