import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/settings')({
  component: () => (
    <div className="p-8 lg:p-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Account Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account security and preferences.</p>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="font-bold text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive updates about your bookings and listings.</p>
          </div>
          <div className="w-12 h-6 bg-brand rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="font-bold text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
          </div>
          <button className="text-brand font-bold text-sm hover:underline">Enable</button>
        </div>

        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-red-600">Delete Account</h4>
            <p className="text-sm text-red-500">Permanently remove your account and data.</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold h-10 px-6 rounded-xl transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
})
