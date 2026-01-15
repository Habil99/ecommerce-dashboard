'use client'

import { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  Typography,
  IconButton,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProducts, setPage } from '@/store/slices/productsSlice'

interface Product {
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

interface ProductsTableProps {
  onEdit?: (product: Product) => void
  onDelete?: (id: string) => void
}

export function ProductsTable({ onEdit, onDelete }: ProductsTableProps) {
  const dispatch = useAppDispatch()
  const { items, loading, pagination, filters } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: pagination.page,
        pageSize: pagination.pageSize,
        category: filters.category,
        search: filters.search,
      })
    )
  }, [dispatch, pagination.page, pagination.pageSize, filters.category, filters.search])

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1))
  }

  if (loading && items.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {product.name}
                  </Typography>
                  {product.description && (
                    <Typography variant="caption" color="text.secondary">
                      {product.description.substring(0, 50)}
                      {product.description.length > 50 ? '...' : ''}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {onEdit && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(product)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(product.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={pagination.total}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  )
}
