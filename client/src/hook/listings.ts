import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '#/lib/api'
import { type ListingSchema } from '#/schema'

// Fetch all listings with filters (Public)
export const useProducts = (params?: { search?: string; categoryId?: string; status?: string }) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const res = await apiClient.get('/products', { params })
      return res.data.products
    }
  })
}

// Fetch single listing by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}`)
      return res.data.product
    },
    enabled: !!id
  })
}

// Fetch all listings with filters (Admin)
export const useAdminProducts = (params?: { search?: string; categoryId?: string; status?: string }) => {
  return useQuery({
    queryKey: ['admin-products', params],
    queryFn: async () => {
      const res = await apiClient.get('/admin/products', { params })
      return res.data.products
    }
  })
}

// Fetch recent listings
export const useAdminRecentProducts = () => {
  return useQuery({
    queryKey: ['recent-products'],
    queryFn: async () => {
      const res = await apiClient.get('/admin/products/recent')
      return res.data.products
    }
  })
}

// Create listing mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ListingSchema) => {
      await apiClient.post('/admin/products', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['recent-products'] })
    }
  })
}

// Toggle listing availability mutation
export const useToggleProductStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, isAvailable }: { id: string; isAvailable: boolean }) => {
      await apiClient.post(`/admin/products/${id}/available`, { isAvailable })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
    }
  })
}

// Delete listing mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/products/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['recent-products'] })
    }
  })
}
