export type Category = 'Electronics' | 'Clothing' | 'Grocery'

export const CATEGORIES: readonly Category[] = ['Electronics', 'Clothing', 'Grocery'] as const

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: Category
  stock: number
  imageUrl: string
}

export type SortKey = 'name' | 'price' | 'stock'
export type ViewMode = 'grid' | 'table'
export type Theme = 'light' | 'dark'
