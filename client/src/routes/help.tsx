import { createFileRoute } from '@tanstack/react-router'
import { HelpPage } from '#/features/pages/components/HelpPage'

export const Route = createFileRoute('/help')({
  component: HelpPage
})
