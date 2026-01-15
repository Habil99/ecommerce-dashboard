import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: {
    name: string
    imageUrl: string | null
  }
}

export interface Order {
  id: string
  customerId: string
  status: OrderStatus
  total: number
  createdAt: string
  updatedAt: string
  customer: {
    name: string
    email: string
  }
  items: OrderItem[]
}

interface OrdersState {
  items: Order[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    pageSize: number
    total: number
  }
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('pageSize', pageSize.toString())

    const response = await fetch(`/api/orders?${params}`)
    if (!response.ok) throw new Error('Failed to fetch orders')
    return response.json()
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }: { id: string; status: OrderStatus }) => {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) throw new Error('Failed to update order status')
    return response.json()
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination.total = action.payload.total
        state.pagination.page = action.payload.page
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch orders'
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((order) => order.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
  },
})

export default ordersSlice.reducer
