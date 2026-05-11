import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/bookings')({
  component: () => (
    <div className="p-8 lg:p-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Bookings</h1>
      <p className="text-gray-500 mb-8">View and manage your active and past rentals.</p>
      
      <div className="bg-brand/5 border border-brand/10 rounded-[32px] p-12 text-center">
        <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore the marketplace and find the perfect space or item for your next project.</p>
        <button className="bg-brand hover:bg-brand-hover text-white font-bold h-12 px-8 rounded-xl transition-all shadow-lg shadow-brand/20">
          Browse Marketplace
        </button>
      </div>
    </div>
  )
})
