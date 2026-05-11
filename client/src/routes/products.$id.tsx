import { createFileRoute } from '@tanstack/react-router'
import { useProduct } from '#/hook'
import { Skeleton } from '#/components/ui/skeleton'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Heart, 
  Share2, 
  Calendar,
  MessageCircle,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailPage
})

function ProductDetailPage() {
  const { id } = Route.useParams()
  const { data: product, isLoading, error } = useProduct(id)
  const [selectedImage, setSelectedImage] = useState(0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full rounded-[32px]" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">The product you are looking for might have been removed or the link is incorrect.</p>
        <Button onClick={() => window.history.back()} variant="outline" className="rounded-xl font-bold">
          Go Back
        </Button>
      </div>
    )
  }

  const images = product.images?.length > 0 ? product.images : ["https://via.placeholder.com/800x600?text=No+Image+Available"]

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <a href="/" className="hover:text-brand">Home</a>
          <ChevronRight size={14} />
          <a href="/products" className="hover:text-brand">Marketplace</a>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group">
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute top-6 right-6 flex gap-3">
                <button className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500 shadow-xl transition-all active:scale-95">
                  <Heart size={20} />
                </button>
                <button className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-600 hover:text-brand shadow-xl transition-all active:scale-95">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-brand shadow-lg ring-2 ring-brand/10' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Booking */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-brand/10 text-brand border-none hover:bg-brand/20 px-3 py-1 rounded-lg font-bold">
                  {product.category?.name || "Rental"}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{product.rating || "5.0"}</span>
                  <span className="text-gray-400 font-medium">({product.reviewsCount || 0} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={18} className="text-brand-light" />
                <span className="font-medium">{product.location || "Ahmedabad, Gujarat"}</span>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-gray-50/50 border border-gray-100 space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-lg font-medium text-gray-500">/ day</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <Calendar className="text-brand w-5 h-5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Start Date</p>
                    <p className="text-sm font-bold text-gray-900">Select Date</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <Calendar className="text-brand w-5 h-5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">End Date</p>
                    <p className="text-sm font-bold text-gray-900">Select Date</p>
                  </div>
                </div>
              </div>

              <Button className="w-full h-16 rounded-2xl bg-brand hover:bg-brand-hover text-white text-lg font-bold shadow-xl shadow-brand/20 transition-all active:scale-[0.98]">
                Book Now
              </Button>
              
              <p className="text-center text-xs font-medium text-gray-400 italic">No payment charged now</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "No description provided for this item."}
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-900 text-xl overflow-hidden border border-gray-200">
                    {product.owner?.image ? (
                      <img src={product.owner.image} alt={product.owner.name} className="w-full h-full object-cover" />
                    ) : (
                      product.owner?.name?.[0] || "O"
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Listed By</p>
                    <p className="font-bold text-gray-900 text-lg">{product.owner?.name || "Verified Owner"}</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl border-gray-200 h-12 px-6 flex items-center gap-2 font-bold text-gray-700 hover:bg-gray-50 transition-all">
                  <MessageCircle size={18} />
                  Chat
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <ShieldCheck className="text-brand w-6 h-6 shrink-0" />
              <p className="text-sm font-medium text-brand-dark">
                Protected by <span className="font-bold">Vastu-Rent Guarantee</span>. Your items are safe with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
