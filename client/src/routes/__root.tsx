import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cn } from "@/lib/utils";
import { Footer, Navbar } from '#/components/layout'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootDocument,
})

function RootDocument() {
  const routerState = useRouterState()
  const isAuthPage = routerState.location.pathname.startsWith('/login') || routerState.location.pathname.startsWith('/signup')
  const isAdminPage = routerState.location.pathname.startsWith('/admin')
  
  return (
    <div className={cn('bg-white', 'font-sans', 'antialiased')}>
      <QueryClientProvider client={queryClient}>
        {!isAuthPage && !isAdminPage && <Navbar />}
        <Outlet />
        {!isAuthPage && !isAdminPage && <Footer />}
      </QueryClientProvider>
      <TanStackDevtools
        config={{ position: 'bottom-right' }}
        plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
      />
    </div>
  )
}
