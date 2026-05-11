import { createFileRoute } from '@tanstack/react-router'
import { CategoryList } from '#/features/categories/components/CategoryList'

export const Route = createFileRoute('/categories')({
  component: CategoryList
})
