import {
  MapPin,
  Search,
  LayoutGrid,
  Heart,
  User,
} from "lucide-react"

import { Button } from "#/components/ui/button"

const popularSearches = [
  "DSLR Camera",
  "Sofa",
  "Wedding Dress",
  "Laptop",
  "Scooter",
  "Party Items",
]

const floatingItems = [
  {
    title: "Camera",
    price: "₹1,200",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    className: "top-[5%] left-[5%]",
  },
  {
    title: "Sofa",
    price: "₹800",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    className: "top-[0%] right-[12%]",
  },
  {
    title: "Laptop",
    price: "₹1,000",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    className: "top-[18%] right-[-5%]",
  },
  {
    title: "Wedding Dress",
    price: "₹2,000",
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=500&q=80",
    className: "bottom-[5%] right-[0%]",
  },
  {
    title: "Scooter",
    price: "₹500",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&q=80",
    className: "bottom-[8%] left-[10%]",
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg-light">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,106,74,0.08),transparent_30%)]" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:py-16">
          {/* LEFT */}
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black leading-[1.1] tracking-tight text-text-dark">
              Rent Anything,
              <br className="hidden sm:block" />
              <span className="text-brand-light">
                {' '}Live Smarter
              </span>
            </h1>

            <p className="mt-4 sm:mt-7 mx-auto lg:mx-0 max-w-xl text-lg sm:text-xl leading-relaxed sm:leading-9 text-gray-600">
              From homes to gadgets, clothes to cars and more —
              rent anything you need, anytime, anywhere.
            </p>

            {/* SEARCH */}
            <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 my-8 border border-gray-100 text-left">
              <div className="flex flex-col lg:flex-row items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {/* Location */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full cursor-pointer hover:bg-gray-50 rounded-xl lg:rounded-none">
                  <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
                  <div className="flex-1 truncate text-sm font-medium text-gray-800">
                    Ahmedabad, Gujarat
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-gray-400 shrink-0">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>

                {/* Categories */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full cursor-pointer hover:bg-gray-50 rounded-xl lg:rounded-none">
                  <LayoutGrid className="h-5 w-5 text-gray-400 shrink-0" />
                  <div className="flex-1 truncate text-sm font-medium text-gray-800">
                    All Categories
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-gray-400 shrink-0">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>

                {/* Search Input */}
                <div className="flex-[2] flex flex-col sm:flex-row items-center gap-3 px-4 py-3 lg:py-2 w-full">
                  <div className="flex items-center gap-3 w-full">
                    <Search className="h-5 w-5 text-gray-400 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="What are you looking for?" 
                      className="w-full border-0 bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                    />
                  </div>
                  <Button className="h-11 w-full sm:w-auto px-8 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold flex items-center justify-center gap-2 shadow-md transition-transform hover:-translate-y-0.5 shrink-0">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-sm font-bold text-gray-800">
                Popular Searches:
              </span>

              {popularSearches.map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-gray-200 bg-white px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 transition hover:border-brand-light hover:text-brand-light"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative hidden h-[680px] lg:block">
            {/* Main Image */}
            <div className="absolute inset-0 overflow-hidden rounded-[40px] bg-gradient-to-br from-brand-soft-light to-bg-alt">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80"
                alt=""
                className="absolute bottom-0 right-0 h-full object-cover"
              />
            </div>

            {/* Floating Cards */}
            {floatingItems.map((item, index) => (
              <div
                key={index}
                className={`absolute ${item.className} w-[180px] rounded-[28px] border border-white/60 bg-white/95 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-2`}
              >
                <div className="overflow-hidden rounded-2xl bg-gray-50">
                  <img
                    src={item.image}
                    alt=""
                    className="h-[120px] w-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-bold text-gray-900">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-lg font-black text-brand-light">
                    {item.price}
                    <span className="text-xs font-medium text-gray-400">
                      {" "}
                      /day
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}