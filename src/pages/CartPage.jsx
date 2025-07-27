import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react'

const CartPage = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount, subtotal, discountAmount, deliveryFee } = useSelector((state) => state.cart)
  
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState('')

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      }))
    } else {
      dispatch(updateQuantity({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: newQuantity
      }))
    }
  }

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      id: item.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }))
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      dispatch({ type: 'cart/applyPromoCode', payload: { code: promoCode.toUpperCase() } })
      setPromoError('')
      setPromoCode('')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black">Cart</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/shop">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="text-black">Cart</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-lg">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span>Size: {item.selectedSize}</span>
                            <span>Color: {item.selectedColor}</span>
                          </div>
                          <p className="text-lg font-bold text-black">${item.price}</p>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 rounded-l-full"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-full"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <p className="text-lg font-bold text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    variant="outline"
                    className="rounded-full px-6"
                  >
                    Apply
                  </Button>
                </div>
                {promoError && (
                  <p className="text-sm text-red-500">{promoError}</p>
                )}
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>SAVE20</span>
                    </Badge>
                    <button
                      onClick={() => dispatch({ type: 'cart/applyPromoCode', payload: { code: '' } })}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-red-600">
                    <span>Discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-lg font-bold text-black">${totalAmount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <button className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-3 mb-4 flex items-center justify-center font-medium">
                  Go to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>

              {/* Continue Shopping */}
              <Link to="/shop">
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full py-3 font-medium">
                  Continue Shopping
                </button>
              </Link>

              {/* Clear Cart */}
              {items.length > 0 && (
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full mt-4 text-red-500 hover:text-red-700 hover:bg-red-50 py-2 font-medium"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

