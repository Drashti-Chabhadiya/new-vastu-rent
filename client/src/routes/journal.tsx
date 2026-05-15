import { createFileRoute } from '@tanstack/react-router'
import { JournalPage } from '#/pages/journal/JournalPage'

export const Route = createFileRoute('/journal')({
  component: JournalPage,
})
