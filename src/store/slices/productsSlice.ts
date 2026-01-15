import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  category: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  filters: {
    category: string
    search: string
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    search: '',
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, pageSize = 10, category, search }: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
  }) => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('pageSize', pageSize.toString())
    if (category) params.append('category', category)
    if (search) params.append('search', search)

    const response = await fetch(`/api/products?${params}`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination.total = action.payload.total
        state.pagination.page = action.payload.page
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
  },
})

export const { setCategory, setSearch, setPage } = productsSlice.actions
export default productsSlice.reducer
