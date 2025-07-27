import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const ProductCard = ({ product, className = '' }) => {
  const {
    id,
    title,
    price,
    rating = {},
    image,
    category
  } = product

  const productRating = rating?.rate || 0
  const ratingCount = rating?.count || 0

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      )
    }

    return stars
  }

  return (
    <Link 
      to={`/product/${id}`}
      className={`group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image || '/placeholder-product.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded capitalize">
          {category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition-colors">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(productRating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {productRating.toFixed(1)}/5
          </span>
          {ratingCount > 0 && (
            <span className="ml-1 text-xs text-gray-400">
              ({ratingCount})
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-black">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

