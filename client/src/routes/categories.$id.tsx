import { createFileRoute } from '@tanstack/react-router'
import { CategoryDetail } from '#/features/categories/components/CategoryDetail'

export const Route = createFileRoute('/categories/$id')({
  component: CategoryDetail
})
