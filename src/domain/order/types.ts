export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  createdAt: Date
  updatedAt: Date
  product?: {
    name: string
    imageUrl: string | null
  }
}

export interface Order {
  id: string
  customerId: string
  status: OrderStatus
  total: number
  createdAt: Date
  updatedAt: Date
  customer?: {
    name: string
    email: string
  }
  items?: OrderItem[]
}

export interface OrderUpdateInput {
  status: OrderStatus
}
