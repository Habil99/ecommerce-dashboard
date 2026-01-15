import { Box, Grid, Typography } from '@mui/material'
import {
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material'
import { StatsCard } from '@/presentation/components/cards/StatsCard'
import { prisma } from '@/utils/prisma'

async function getStats() {
  const [
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),
    prisma.order.count(),
    prisma.customer.count(),
    prisma.product.count(),
  ])

  return {
    revenue: totalRevenue._sum.total || 0,
    orders: totalOrders,
    customers: totalCustomers,
    products: totalProducts,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Revenue"
            value={`$${stats.revenue.toFixed(2)}`}
            icon={<AttachMoney />}
            color="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Orders"
            value={stats.orders}
            icon={<ShoppingCart />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Customers"
            value={stats.customers}
            icon={<People />}
            color="#9c27b0"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Products"
            value={stats.products}
            icon={<Inventory />}
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
