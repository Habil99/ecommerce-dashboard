export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  category: string
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ProductCreateInput {
  name: string
  description?: string
  price: number
  stock: number
  category: string
  imageUrl?: string
}

export interface ProductUpdateInput {
  name?: string
  description?: string
  price?: number
  stock?: number
  category?: string
  imageUrl?: string
}
