import { getAllArticles } from '@/lib/articles'
import ArticlesClient from '@/components/ArticlesClient'

export default function ArticlesPage() {
  // Read articles server-side - no fetch, no network issues
  const articles = getAllArticles()
  return <ArticlesClient initialArticles={articles} />
}
