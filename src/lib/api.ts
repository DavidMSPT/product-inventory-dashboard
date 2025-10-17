import { load, save } from './storage'
import type { Product } from '@store/types'

const uid = () => crypto.randomUUID()

const DEFAULT_PRODUCTS: Product[] = [
  { id: uid(), name: 'Noise-Cancelling Headphones', description: 'Over-ear wireless ANC with 30h battery.', price: 249.99, category: 'Electronics', stock: 12, imageUrl: 'https://www.cnet.com/a/img/resize/c6082a744b3db280b3670144dd5663db8aacbbfa/hub/2019/08/17/496ac8a5-bd2d-4594-899f-13505737f522/bang-olufsen-beoplay-h9.jpg?auto=webp&fit=crop&height=1200&width=1200' },
  { id: uid(), name: 'Organic Apples', description: 'Crisp, sweet, and suspiciously photogenic.', price: 2.49, category: 'Grocery', stock: 3, imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80&auto=format&fit=crop' },
  { id: uid(), name: 'Denim Jacket', description: 'Classic fit, stubborn zipper, eternal cool.', price: 79.0, category: 'Clothing', stock: 0, imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop' },
]

function ensureSeed() {
  const existing = load<Product>()
  if (!existing || existing.length === 0) save(DEFAULT_PRODUCTS)
}
ensureSeed()

function simulate<T>(result: T, shouldFail = false, ms = 500): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => shouldFail ? reject(new Error('Network error. Try again.')) : resolve(result), ms)
  })
}

export const api = {
  async list(): Promise<Product[]> {
    const data = load<Product>()
    const fail = Math.random() < 0.1
    return simulate(data, fail, 600)
  },
  async create(p: Omit<Product, 'id'>): Promise<Product> {
    const next: Product = { ...p, id: crypto.randomUUID() }
    const data = load<Product>()
    data.push(next); save(data)
    return simulate(next, false, 500)
  },
  async update(id: string, patch: Partial<Product>): Promise<Product> {
    const data = load<Product>()
    const idx = data.findIndex(d => d.id === id)
    if (idx === -1) throw new Error('Product not found')
    const updated = { ...data[idx], ...patch } as Product
    data[idx] = updated; save(data)
    return simulate(updated, false, 500)
  },
  async remove(id: string): Promise<{ id: string }> {
    const data = load<Product>()
    const next = data.filter(d => d.id != id); save(next)
    return simulate({ id }, false, 400)
  }
}
