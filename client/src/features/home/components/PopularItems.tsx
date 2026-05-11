import { ChevronRight } from "lucide-react"
import { useProducts } from "#/hook"
import { ProductCard } from "#/components/common/ProductCard"
import { Skeleton } from "#/components/ui/skeleton"
import { Link } from "@tanstack/react-router"

export function PopularItems() {
  const { data: products, isLoading } = useProducts({ status: 'active' })

  return (
    <section className="bg-bg-base py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Items Near You</h2>
          <Link 
            to="/products" 
            className="text-sm font-bold text-brand hover:text-brand-hover flex items-center gap-1 group transition-colors"
          >
            View all items 
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[220px] w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ))
            ) : products?.length > 0 ? (
              products.slice(0, 8).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 font-medium">No popular items found in your area.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

