import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import EditarClient from '@/components/EditarClient'

export default async function EditarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const cookieStore = await cookies()
  const raw = cookieStore.get('auth_user')?.value
  if (!raw) redirect('/login')

  let user: { username: string; displayName: string; category: string }
  try { user = JSON.parse(raw) } catch { redirect('/login') }

  const article = getArticleBySlug(slug)
  if (!article) redirect('/articulos')
  if (article.category !== user.category) redirect(`/articulos/${slug}`)

  return <EditarClient user={user} article={article} />
}
