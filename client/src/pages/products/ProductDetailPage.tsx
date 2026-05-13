import { useParams } from "@tanstack/react-router"
import { ProductDetail } from "#/features/products"

export function ProductDetailPage() {
  const { id } = useParams({ from: '/products/$id' })
  return <ProductDetail id={id} />
}
