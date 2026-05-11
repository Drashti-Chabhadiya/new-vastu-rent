import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { ProfileLayout } from '#/features/profile/components/ProfileLayout'

export const Route = createFileRoute('/profile')({
  component: ProfilePageLayout
})

function ProfilePageLayout() {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  
  // Determine active tab from pathname
  const activeTab = pathname.includes('/listings') 
    ? 'listings' 
    : pathname.includes('/bookings') 
      ? 'bookings' 
      : pathname.includes('/settings') 
        ? 'settings' 
        : 'personal'

  return (
    <ProfileLayout activeTab={activeTab}>
      <Outlet />
    </ProfileLayout>
  )
}
