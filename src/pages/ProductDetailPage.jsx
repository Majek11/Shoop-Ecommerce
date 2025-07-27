import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetProductByIdQuery, useGetProductsQuery } from '@/store/api/productsApi'
import { addToCart } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Plus, Minus, Heart, Share2 } from 'lucide-react'
import ProductCard from '@/components/common/ProductCard'

const ProductDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [selectedColor, setSelectedColor] = useState('Black')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')

  const { data: product, isLoading, error } = useGetProductByIdQuery(id)
  const { data: relatedProducts = [] } = useGetProductsQuery({ 
    category: product?.category,
    limit: 4 
  })

  // Mock data for sizes and colors since fakestoreapi doesn't provide these
  const availableSizes = ['Small', 'Medium', 'Large', 'X-Large']
  const availableColors = ['Black', 'White', 'Navy', 'Gray']

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.image
      },
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor
    }))
  }

  const renderStars = (rating) => {
    const rate = rating?.rate || 0
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const filteredRelatedProducts = relatedProducts.filter(p => p.id !== parseInt(id)).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <span className="text-black capitalize">{product.category}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating?.rate || 0}/5
                </span>
                {product.rating?.count && (
                  <span className="text-sm text-gray-500">
                    ({product.rating.count} reviews)
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Colors</h3>
              <div className="flex space-x-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                     color.toLowerCase() === 'black' ? '#000000' :
                                     color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                     '#6b7280'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 text-sm font-medium rounded-full border transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-full"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-full"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-gray-800 rounded-full py-3"
              >
                Add to Cart
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 rounded-full">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="flex-1 rounded-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-gray-200 pt-8 mb-16">
          <div className="flex space-x-8 mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rating & Reviews
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'faqs'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              FAQs
            </button>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Category: {product.category}</li>
                  <li>Material: High-quality fabric blend</li>
                  <li>Care Instructions: Machine wash cold, tumble dry low</li>
                  <li>Fit: Regular fit</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {renderStars({ rate: 5 })}
                      </div>
                      <span className="font-medium">Sarah M.</span>
                    </div>
                    <p className="text-gray-600">
                      "Great quality product! Exactly as described and fits perfectly. 
                      Would definitely recommend to others."
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {renderStars({ rate: 4 })}
                      </div>
                      <span className="font-medium">Alex K.</span>
                    </div>
                    <p className="text-gray-600">
                      "Good value for money. The material feels nice and the delivery was quick."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">What is your return policy?</h4>
                    <p className="text-gray-600">
                      We offer a 30-day return policy for all unworn items with original tags.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How do I care for this item?</h4>
                    <p className="text-gray-600">
                      Machine wash cold with like colors. Tumble dry low or hang to dry.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">What if the size doesn't fit?</h4>
                    <p className="text-gray-600">
                      You can exchange for a different size within 30 days of purchase.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8 text-center">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage

