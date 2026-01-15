'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material'
import { z } from 'zod'

const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional(),
})

type ProductFormData = z.infer<typeof productFormSchema>

interface ProductFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => Promise<void>
  initialData?: ProductFormData | null
  mode: 'create' | 'edit'
}

export function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ProductFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      imageUrl: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        imageUrl: '',
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>
          {mode === 'create' ? 'Create Product' : 'Edit Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    inputProps={{ step: '0.01', min: '0' }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="stock"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="Stock"
                    type="number"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                    inputProps={{ min: '0' }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image URL (optional)"
                    fullWidth
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
