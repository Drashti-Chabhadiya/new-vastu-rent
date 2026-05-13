import { createFileRoute } from '@tanstack/react-router'
import { UserProfilePage } from '#/pages/users/UserProfilePage'

export const Route = createFileRoute('/users/$id')({
  component: UserProfilePage
})
