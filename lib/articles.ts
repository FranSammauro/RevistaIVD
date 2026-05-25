import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDir = path.join(process.cwd(), 'content/articulos')

export interface ArticleMeta {
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: number
  featured: boolean
  coverColor: string
}

export interface Article extends ArticleMeta {
  content: string
}

export const CATEGORIES: Record<string, { label: string; color: string }> = {
  quimica:                  { label: 'Química',           color: '#C8102E' },
  fisica:                   { label: 'Física',            color: '#1A4A8A' },
  'ciencias-de-la-tierra':  { label: 'Cs. de la Tierra', color: '#2D6A2D' },
  biologia:                 { label: 'Biología',          color: '#7A3B8C' },
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDir)) return []
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
      const { data } = matter(raw)
      return data as ArticleMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { ...(data as ArticleMeta), content }
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter(a => a.featured)
}
