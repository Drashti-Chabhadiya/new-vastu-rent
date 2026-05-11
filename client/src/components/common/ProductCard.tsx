import { useState } from "react"
import { Heart, MapPin, Star, Package } from "lucide-react"
import { Button } from "#/components/ui/button"
import { Link } from "@tanstack/react-router"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    images?: string[]
    location?: string
    rating?: number
    reviewsCount?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const mainImage = product.images?.[0] || "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=800&q=80"

  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 group flex flex-col h-full">
      <div className="relative w-full h-[220px] rounded-xl bg-gray-100 mb-4 overflow-hidden shrink-0 flex items-center justify-center">
        {!imageError ? (
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300 gap-2">
            <Package size={48} className="opacity-20" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">No Image</span>
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
      
      <div className="flex items-end justify-between mb-3 mt-auto">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-brand-light">₹{product.price.toLocaleString()}</span>
          <span className="text-xs font-medium text-gray-500">/day</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-gray-700">{product.rating || "5.0"}</span>
          <span className="text-xs font-medium text-gray-400">({product.reviewsCount || "0"})</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-gray-500 mb-4">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs font-medium truncate">{product.location || "Ahmedabad"}</span>
      </div>

      <Link to={`/products/${product.id}` as any} className="w-full">
        <Button className="w-full bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl h-11 shrink-0">
          Rent Now
        </Button>
      </Link>
    </div>
  )
}
