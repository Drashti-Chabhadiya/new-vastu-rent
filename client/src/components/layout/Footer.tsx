import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MessageSquare } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <a href="#" className="flex items-center gap-2 no-underline mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                  <circle cx="12" cy="17" r="1.5" fill="white" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-xl font-bold text-gray-900 tracking-tight">vastu-rent</div>
                <div className="text-[10px] text-gray-500 font-medium">Rent Anything. Live in Harmony.</div>
              </div>
            </a>
            <p className="text-sm sm:text-xs text-gray-500 mb-6 leading-relaxed max-w-[280px] lg:max-w-[250px]">
              Vastu-Rent is your one-stop platform to rent anything you need, anytime, anywhere.
            </p>
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-brand hover:border-brand transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-brand hover:border-brand transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-brand hover:border-brand transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-brand hover:border-brand transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
            <p className="text-xs sm:text-[10px] text-gray-400 hidden lg:block">
              &copy; {year} Vastu-Rent. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 mb-5 lg:mb-6">Quick Links</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">About Us</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">How It Works</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">Privacy Policy</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">Help Center</a></li>
            </ul>
          </div>

          {/* For Users */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 mb-5 lg:mb-6">For Users</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">Browse Categories</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">Become a Lister</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">My Bookings</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">My Wishlist</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light">Login / Sign Up</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 mb-5 lg:mb-6">Support</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +91 98765 43210</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> support@vastu-rent.com</a></li>
              <li><a href="#" className="text-sm lg:text-xs font-semibold text-gray-500 hover:text-brand-light flex items-center gap-2"><MessageSquare className="w-4 h-4 shrink-0" /> Live Chat</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div className="col-span-1 flex flex-col items-start lg:items-end">
            <h4 className="text-sm font-bold text-gray-900 mb-5 lg:mb-6">Download Our App</h4>
            <div className="flex flex-row lg:flex-col gap-3">
              <a href="#" className="inline-block transition-transform hover:-translate-y-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10 lg:h-10 object-contain" />
              </a>
              <a href="#" className="inline-block transition-transform hover:-translate-y-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-10 lg:h-10 object-contain" />
              </a>
            </div>
          </div>
          
          {/* Mobile Copyright (bottom) */}
          <div className="col-span-1 sm:col-span-2 block lg:hidden mt-4 pt-6 border-t border-gray-100">
             <p className="text-xs text-gray-400 text-center">
              &copy; {year} Vastu-Rent. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
