import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '#/lib/api'

// Fetch all reviews with filters
export const useAdminReviews = (params?: { search?: string }) => {
  return useQuery({
    queryKey: ['admin-reviews', params],
    queryFn: async () => {
      const res = await apiClient.get('/admin/reviews', { params })
      return res.data.reviews
    }
  })
}

// Delete review mutation
export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/reviews/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
    }
  })
}
