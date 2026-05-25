import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PublicarClient from '@/components/PublicarClient'

export default async function PublicarPage() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('auth_user')?.value
  if (!raw) redirect('/login')

  let user: { username: string; displayName: string; category: string }
  try { user = JSON.parse(raw) } catch { redirect('/login') }

  return <PublicarClient user={user} />
}
