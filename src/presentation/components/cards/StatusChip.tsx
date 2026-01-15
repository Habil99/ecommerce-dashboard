import { Chip } from '@mui/material'
import { OrderStatus } from '@/domain/order/types'

interface StatusChipProps {
  status: OrderStatus
}

const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
  PENDING: { bg: '#fef3c7', text: '#92400e' },
  PROCESSING: { bg: '#dbeafe', text: '#1e40af' },
  SHIPPED: { bg: '#e0e7ff', text: '#3730a3' },
  DELIVERED: { bg: '#d1fae5', text: '#065f46' },
  CANCELLED: { bg: '#fee2e2', text: '#991b1b' },
}

export function StatusChip({ status }: StatusChipProps) {
  const colors = statusColors[status]

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: colors.bg,
        color: colors.text,
        fontWeight: 500,
      }}
    />
  )
}
