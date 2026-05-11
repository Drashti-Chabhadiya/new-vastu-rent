import { ArrowRight } from "lucide-react"
import { Button } from "#/components/ui/button"

export function OwnerCTA() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-bg-gradient-from to-bg-gradient-to px-6 py-10 sm:px-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between min-h-[300px]">
          
          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 sm:text-4xl">
              Have something to rent?
            </h2>
            <p className="text-gray-600 mb-8 text-base sm:text-lg font-medium">
              List your items and start earning today.
            </p>
            <Button className="mx-auto lg:mx-0 gap-2 rounded-xl bg-brand px-6 py-6 text-base font-semibold text-white hover:bg-brand-hover shadow-md w-fit flex items-center justify-center">
              Become a Lister
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Image Composition */}
          <div className="relative w-full lg:w-1/2 h-[250px] sm:h-[300px] flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="absolute right-0 bottom-[-20px] lg:bottom-[-64px] h-[300px] lg:h-[400px] w-full max-w-[500px]">
                <div className="relative w-full h-full flex justify-center lg:justify-end items-end">
                   <div className="bg-brand-muted rounded-t-full w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] absolute lg:right-10 bottom-0 opacity-50 blur-3xl"></div>
                   
                   <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" className="relative z-10 h-[220px] sm:h-[280px] lg:h-[350px] object-cover object-top mask-image-bottom" alt="Man looking at phone" />
                   
                   {/* Mobile Mockup */}
                   <div className="absolute right-[10%] sm:right-10 lg:right-0 top-10 w-[120px] sm:w-[140px] bg-white rounded-3xl shadow-xl p-2 z-20 border-4 border-gray-100 hidden sm:block">
                     <div className="h-3 w-12 sm:w-16 bg-gray-200 mx-auto rounded-b-xl mb-3 sm:mb-4"></div>
                     <div className="px-2">
                       <p className="text-[10px] text-gray-500 font-semibold mb-1">My Earnings</p>
                       <p className="text-base sm:text-lg font-bold text-brand-accent">₹12,450</p>
                       <p className="text-[8px] text-gray-400 mb-2 sm:mb-4">+18% this month</p>
                       <div className="h-10 sm:h-12 w-full bg-green-50 rounded-lg overflow-hidden flex items-end">
                         <svg viewBox="0 0 100 40" className="w-full h-full text-green-300 stroke-current fill-green-100/50">
                            <path d="M0,40 L0,30 L20,35 L40,15 L60,25 L80,5 L100,20 L100,40 Z" strokeWidth="2"></path>
                         </svg>
                       </div>
                     </div>
                   </div>

                   {/* Floating items */}
                   <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80" className="absolute right-[60%] lg:right-[200px] bottom-10 w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-xl shadow-lg z-20 hidden md:block" alt="Sofa" />
                   <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" className="absolute right-[20%] lg:right-[80px] bottom-4 w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-xl shadow-lg z-30 hidden md:block" alt="Camera" />
                   <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&q=80" className="absolute lg:right-[-20px] top-20 w-20 h-28 lg:w-24 lg:h-32 object-cover rounded-xl shadow-lg z-10 hidden lg:block" alt="Plant" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
