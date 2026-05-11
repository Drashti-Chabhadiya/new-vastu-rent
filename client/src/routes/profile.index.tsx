import { createFileRoute } from '@tanstack/react-router'
import { PersonalInfo } from '#/features/profile/components/PersonalInfo'

export const Route = createFileRoute('/profile/')({
  component: () => <PersonalInfo />
})
