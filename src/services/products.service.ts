import { httpClient } from './http'
import { Product, ProductCreateInput, ProductUpdateInput } from '@/domain/product/types'

export interface ProductListResponse {
  data: Product[]
  total: number
  page: number
  pageSize: number
}

export const productsService = {
  getAll: async (params?: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
  }): Promise<ProductListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())
    if (params?.category) searchParams.append('category', params.category)
    if (params?.search) searchParams.append('search', params.search)

    return httpClient.get(`/api/products?${searchParams}`)
  },

  getById: async (id: string): Promise<Product> => {
    return httpClient.get(`/api/products/${id}`)
  },

  create: async (data: ProductCreateInput): Promise<Product> => {
    return httpClient.post('/api/products', data)
  },

  update: async (id: string, data: ProductUpdateInput): Promise<Product> => {
    return httpClient.put(`/api/products/${id}`, data)
  },

  delete: async (id: string): Promise<void> => {
    return httpClient.delete(`/api/products/${id}`)
  },
}
