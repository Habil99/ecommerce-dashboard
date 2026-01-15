import { httpClient } from './http'
import { Order, OrderUpdateInput } from '@/domain/order/types'

export interface OrderListResponse {
  data: Order[]
  total: number
  page: number
  pageSize: number
}

export const ordersService = {
  getAll: async (params?: {
    page?: number
    pageSize?: number
  }): Promise<OrderListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

    return httpClient.get(`/api/orders?${searchParams}`)
  },

  getById: async (id: string): Promise<Order> => {
    return httpClient.get(`/api/orders/${id}`)
  },

  updateStatus: async (id: string, data: OrderUpdateInput): Promise<Order> => {
    return httpClient.patch(`/api/orders/${id}`, data)
  },
}
