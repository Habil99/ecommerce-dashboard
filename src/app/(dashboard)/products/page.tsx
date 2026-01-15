'use client'

import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { ProductsTable } from '@/presentation/components/tables/ProductsTable'
import { ProductFormDialog } from '@/presentation/components/dialogs/ProductFormDialog'
import { ConfirmDialog } from '@/presentation/components/dialogs/ConfirmDialog'
import { useAppDispatch } from '@/store/hooks'
import { fetchProducts } from '@/store/slices/productsSlice'

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

interface ProductFormData {
  name: string
  description?: string
  price: number
  stock: number
  category: string
  imageUrl?: string
}

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCreate = () => {
    setEditingProduct(null)
    setFormOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setDeletingProductId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingProductId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/products/${deletingProductId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete product')

      // Refresh products list
      dispatch(fetchProducts({}))
      setDeleteDialogOpen(false)
      setDeletingProductId(null)
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Failed to update product')
      } else {
        // Create new product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Failed to create product')
      }

      // Refresh products list
      dispatch(fetchProducts({}))
      setFormOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product. Please try again.')
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Product
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <ProductsTable onEdit={handleEdit} onDelete={handleDeleteClick} />
      </Box>

      <ProductFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingProduct(null)
        }}
        onSubmit={handleFormSubmit}
        initialData={
          editingProduct
            ? {
                name: editingProduct.name,
                description: editingProduct.description || '',
                price: editingProduct.price,
                stock: editingProduct.stock,
                category: editingProduct.category,
                imageUrl: editingProduct.imageUrl || '',
              }
            : null
        }
        mode={editingProduct ? 'edit' : 'create'}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setDeletingProductId(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        loading={isDeleting}
      />
    </Box>
  )
}
