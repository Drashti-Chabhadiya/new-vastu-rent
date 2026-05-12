import { Menu, ChevronDown, User, LogOut, X } from "lucide-react"
import { Button } from "#/components/ui/button"
import { cn } from "#/lib/utils"
import { authClient } from "#/lib/auth/auth-client"
import { Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Heart, Folder, ShoppingBag, Package } from "lucide-react"
import { useCategories, useWishlist } from "#/hook"
import { CategoryIcon } from "#/components/common/CategoryIcon"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Become a Lister", href: "/become-lister" },
  { label: "Help", href: "/help" },
]

export function Navbar() {
  const [session, setSession] = useState<any>(null)
  const [isPending, setIsPending] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)

  const { data: categories } = useCategories()
  const { count } = useWishlist()

  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res.data)
      setIsPending(false)
    })
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleSignOut = async () => {
    setIsPending(true)
    await authClient.signOut()
    setSession(null)
    setIsPending(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-brand">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6 text-white" stroke="currentColor" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
                <circle cx="12" cy="17" r="1.5" fill="white" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">vastu-rent</div>
              <div className="hidden sm:block text-[10px] text-gray-500 font-medium">Rent Anything. Live in Harmony.</div>
            </div>
          </Link>

          {/* Nav Links — Desktop */}
          <nav className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  to={link.href === "#" ? "/" : (link.href as any)}
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold no-underline transition-colors whitespace-nowrap py-4",
                    link.active
                      ? "text-brand"
                      : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-4 w-4 text-gray-400 group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Dropdown Menu for Categories */}
                {link.hasDropdown && categories && (
                  <div className="absolute left-0 top-full -mt-2 w-[560px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto z-50 p-6">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {categories.map((category: any) => {
                          return (
                            <Link
                              key={category.id}
                              to={`/categories/${category.id}` as any}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group/item"
                            >
                              <CategoryIcon category={category} size="md" />
                              <div>
                                <p className="text-sm font-bold text-gray-900 group-hover/item:text-brand transition-colors">
                                  {category.name}
                                </p>
                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                                  {category._count?.products || 0} listings
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <Link to={"/categories" as any} className="text-xs font-bold text-brand hover:underline">View All Categories</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden p-2 text-gray-600 hover:text-gray-900 lg:flex items-center no-underline">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5]" />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-light text-[10px] font-bold text-white border-2 border-white">
                  {count}
                </span>
              )}
            </Link>

          

            {/* Auth — Desktop */}
            {isPending ? (
              <div className="hidden lg:block w-[110px] h-9 animate-pulse bg-gray-100 rounded-full" />
            ) : session ? (
              <div className="relative group hidden lg:block">
                <button className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 hover:border-gray-300 transition-colors bg-white">
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-bold text-gray-700 max-w-[80px] truncate">{session.user.name || 'User'}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                </button>
                
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto z-50 p-2">
                  <div className="px-4 py-4 border-b border-gray-50 mb-2">
                    <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                    {(session.user.role === 'admin' || session.user.role === 'superAdmin') && (
                      <Link 
                        to="/admin/dashboard" 
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-brand hover:bg-brand/5 rounded-xl transition-colors"
                      >
                        <Folder className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <User className="h-4 w-4 text-gray-400" />
                      My Profile
                    </Link>
                    <Link 
                      to="/profile/bookings" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      My Bookings
                    </Link>
                    <Link 
                      to="/profile/listings" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Package className="h-4 w-4 text-gray-400" />
                      My Listings
                    </Link>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-50">
                    <button
                      onClick={handleSignOut}
                      disabled={isPending}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                    >
                      Sign Out
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:inline-flex">
                <Button className="bg-brand text-white hover:bg-brand-hover font-semibold rounded-full px-5 items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Hamburger — Mobile/Tablet */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 xl:hidden transition-colors rounded-lg hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-[min(320px,100vw)] bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 no-underline">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900">vastu-rent</span>
          </Link>
          <button
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.hasDropdown ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold no-underline transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", mobileCategoriesOpen && "rotate-180")} />
                    </button>
                    
                    {/* Mobile Categories Submenu */}
                    {mobileCategoriesOpen && categories && (
                      <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                        {categories.map((category: any) => {
                          return (
                            <Link
                              key={category.id}
                              to={`/categories/${category.id}` as any}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <CategoryIcon category={category} size="sm" />
                              {category.name}
                            </Link>
                          )
                        })}
                        <Link
                          to={"/categories" as any}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-4 py-2 rounded-xl text-xs font-bold text-brand hover:bg-brand/5"
                        >
                          View All Categories
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href === "#" ? "/" : (link.href as any)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold no-underline transition-colors",
                      link.active
                        ? "bg-brand/8 text-brand"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold no-underline transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </div>
                {count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">

            {isPending ? (
              <div className="h-11 w-full animate-pulse bg-gray-100 rounded-xl" />
            ) : session ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{session.user.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                </div>
                
                {(session.user.role === 'admin' || session.user.role === 'superAdmin') && (
                  <Link 
                    to="/admin/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-brand hover:bg-brand/5 rounded-xl transition-colors"
                  >
                    <Folder className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/profile" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <User className="h-4 w-4 text-gray-400" />
                  My Profile
                </Link>
                
                <Link 
                  to="/profile/bookings" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <ShoppingBag className="h-4 w-4 text-gray-400" />
                  My Bookings
                </Link>
                
                <Link 
                  to="/profile/listings" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Package className="h-4 w-4 text-gray-400" />
                  My Listings
                </Link>

                <button
                  onClick={handleSignOut}
                  disabled={isPending}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                >
                  Sign Out
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-brand text-white hover:bg-brand-hover font-semibold rounded-xl items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
