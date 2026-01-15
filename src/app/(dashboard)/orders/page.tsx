import { Box, Typography } from '@mui/material'
import { OrdersTable } from '@/presentation/components/tables/OrdersTable'

export default function OrdersPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Box sx={{ mt: 3 }}>
        <OrdersTable />
      </Box>
    </Box>
  )
}
