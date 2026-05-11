import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/listings')({
  component: () => (
    <div className="p-8 lg:p-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Listings</h1>
      <p className="text-gray-500 mb-8">Manage the items you've listed for rent.</p>
      
      <div className="bg-brand/5 border border-brand/10 rounded-[32px] p-12 text-center">
        <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 8V21H3V8M1 3H23V8H1V3ZM10 12H14" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No listings yet</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start earning by listing your unused items today. It's quick, easy, and secure.</p>
        <button className="bg-brand hover:bg-brand-hover text-white font-bold h-12 px-8 rounded-xl transition-all shadow-lg shadow-brand/20">
          Create New Listing
        </button>
      </div>
    </div>
  )
})
