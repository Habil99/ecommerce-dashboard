'use client'

import { useEffect } from 'react'
import Link from 'next/link'
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
import { Visibility } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchOrders } from '@/store/slices/ordersSlice'
import { StatusChip } from '@/presentation/components/cards/StatusChip'

export function OrdersTable() {
  const dispatch = useAppDispatch()
  const { items, loading, pagination } = useAppSelector((state) => state.orders)

  useEffect(() => {
    dispatch(
      fetchOrders({
        page: pagination.page,
        pageSize: pagination.pageSize,
      })
    )
  }, [dispatch, pagination.page, pagination.pageSize])

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
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    #{order.id.substring(0, 8)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{order.customer.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.customer.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>
                <TableCell align="right">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    href={`/orders/${order.id}`}
                    size="small"
                  >
                    <Visibility />
                  </IconButton>
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
        onPageChange={() => {}}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  )
}
