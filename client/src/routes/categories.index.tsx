import { createFileRoute } from '@tanstack/react-router'
import { CategoriesPage } from '#/pages/categories/CategoriesPage'

export const Route = createFileRoute('/categories/')({
  component: CategoriesPage
})
