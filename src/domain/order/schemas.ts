import { z } from 'zod'

export const orderStatusSchema = z.enum([
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
])

export const orderUpdateSchema = z.object({
  status: orderStatusSchema,
})

export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>
