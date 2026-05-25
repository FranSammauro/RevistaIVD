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

export const CATEGORIES: Record<string, { label: string; color: string }> = {
  quimica:              { label: 'Química',           color: '#C8102E' },
  fisica:               { label: 'Física',            color: '#1A4A8A' },
  'ciencias-de-la-tierra': { label: 'Cs. de la Tierra', color: '#2D6A2D' },
  biologia:             { label: 'Biología',          color: '#7A3B8C' },
}
