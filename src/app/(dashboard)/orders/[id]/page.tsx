'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
} from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import { StatusChip } from '@/presentation/components/cards/StatusChip'
import { OrderStatusDialog } from '@/presentation/components/dialogs/OrderStatusDialog'
import { OrderStatus } from '@/domain/order/types'

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [order, setOrder] = useState<any>(null)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/orders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to fetch order:', error)
          setLoading(false)
        })
    })
  }, [])

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (!order) return

    const response = await fetch(`/api/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!response.ok) throw new Error('Failed to update order status')

    const updatedOrder = await response.json()
    setOrder(updatedOrder)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        Loading...
      </Box>
    )
  }

  if (!order) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Order not found</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="h6">
                Total: ${order.total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="body1" gutterBottom>
                #{order.id.substring(0, 8)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Status
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                <StatusChip status={order.status as OrderStatus} />
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => setStatusDialogOpen(true)}
                >
                  Update
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Order Date
              </Typography>
              <Typography variant="body1">
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.customer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.customer.email}
              </Typography>
              {order.customer.phone && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Phone
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {order.customer.phone}
                  </Typography>
                </>
              )}
              {order.customer.address && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {order.customer.address}
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <OrderStatusDialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        onSubmit={handleStatusUpdate}
        currentStatus={order.status as OrderStatus}
      />
    </Box>
  )
}
