import { createFileRoute } from '@tanstack/react-router'
import { JournalPage } from '#/features/journal/pages/JournalPage'

export const Route = createFileRoute('/about')({
  component: JournalPage,
})
