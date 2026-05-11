import { createFileRoute } from '@tanstack/react-router'
import { BecomeListerPage } from '#/features/pages/components/BecomeListerPage'

export const Route = createFileRoute('/become-lister')({
  component: BecomeListerPage
})
