import { createFileRoute } from '@tanstack/react-router'
import { CategoryDetailPage } from '#/pages/categories/CategoryDetailPage'

export const Route = createFileRoute('/categories/$id')({
  component: CategoryDetailPage
})
