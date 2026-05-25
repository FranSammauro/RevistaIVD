import { validateUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const user = await validateUser(username, password)

  if (!user) {
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('auth_user', JSON.stringify({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    category: user.category,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })

  return NextResponse.json({ ok: true, user: { username: user.username, displayName: user.displayName, category: user.category } })
}
