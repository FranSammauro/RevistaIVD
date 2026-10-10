import { getAllArticles } from '@/lib/articles'
import ArticlesClient from '@/components/ArticlesClient'

export default function ArticlesPage() {
  const articles = getAllArticles()
  return <ArticlesClient initialArticles={articles} />
}