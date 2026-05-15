import { createFileRoute } from '@tanstack/react-router'
import { BecomeListerPage } from '#/pages/become-lister/BecomeListerPage'

export const Route = createFileRoute('/become-lister')({
  component: BecomeListerPage
})
