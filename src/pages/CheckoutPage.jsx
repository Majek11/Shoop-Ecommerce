import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { clearCart } from '../store/slices/cartSlice'
import PaystackPayment from '../components/payment/PaystackPayment'
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'

const CheckoutPage = () => {
  const [user, setUser] = useState(null)
  const [isGuestCheckout, setIsGuestCheckout] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Info, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    createAccount: false,
    password: '',
    paymentMethod: 'paystack'
  })
  const [errors, setErrors] = useState({})
  const [orderReference, setOrderReference] = useState('')

  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = subtotal > 100 ? 0 : 15 // Free delivery over $100
  const total = subtotal + deliveryFee

  // Convert USD to NGN (approximate rate)
  const usdToNgnRate = 1650
  const totalInNGN = total * usdToNgnRate

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData(prev => ({
        ...prev,
        email: parsedUser.email,
        firstName: parsedUser.name?.split(' ')[0] || '',
        lastName: parsedUser.name?.split(' ')[1] || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || '',
        city: parsedUser.city || '',
        country: parsedUser.country || 'Nigeria'
      }))
    } else {
      setIsGuestCheckout(true)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    
    if (isGuestCheckout && formData.createAccount && !formData.password) {
      newErrors.password = 'Password is required for account creation'
    }
    
    return newErrors
  }

  const handleContinueToPayment = () => {
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(2)
    } else {
      setErrors(newErrors)
    }
  }

  const handlePaymentSuccess = (reference) => {
    setOrderReference(reference.reference)
    
    // Create account if requested
    if (isGuestCheckout && formData.createAccount) {
      const newUser = {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country
      }
      localStorage.setItem('user', JSON.stringify(newUser))
    }
    
    // Clear cart
    dispatch(clearCart())
    
    // Move to success step
    setCurrentStep(3)
  }

  const handlePaymentClose = () => {
    // Payment was cancelled
    console.log('Payment cancelled')
  }

  if (cartItems.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <p className="text-sm text-gray-600">Order Reference:</p>
            <p className="font-mono text-sm font-medium">{orderReference}</p>
          </div>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
            {user && (
              <Link
                to="/profile"
                className="block w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                View Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-integral font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping Information</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-black' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${currentStep >= 2 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                
                {/* Guest/User Toggle */}
                {!user && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 mb-3">
                      Already have an account?{' '}
                      <Link to="/login" className="text-black hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                )}

                <form className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="First name"
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Last name"
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your address"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="City"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                          errors.state ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="State"
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                          errors.zipCode ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="ZIP"
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>

                  {/* Create Account Option for Guests */}
                  {isGuestCheckout && (
                    <div className="border-t pt-4">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          id="createAccount"
                          name="createAccount"
                          checked={formData.createAccount}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label htmlFor="createAccount" className="ml-2 text-sm text-gray-700">
                          Create an account for faster checkout next time
                        </label>
                      </div>
                      
                      {formData.createAccount && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black ${
                              errors.password ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Create a password"
                          />
                          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                      )}
                    </div>
                  )}
                </form>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full mt-6 py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paystack"
                        name="paymentMethod"
                        value="paystack"
                        checked={formData.paymentMethod === 'paystack'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black focus:ring-black"
                      />
                      <label htmlFor="paystack" className="ml-3 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span className="font-medium">Paystack</span>
                        <span className="ml-2 text-sm text-gray-500">
                          (Cards, Bank Transfer, USSD)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Payment Button */}
                <PaystackPayment
                  amount={totalInNGN}
                  email={formData.email}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                  disabled={!formData.email}
                />

                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full mt-3 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Back to Shipping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Delivery
                  </span>
                  <span className="text-gray-900">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total (USD)</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Total (NGN)</span>
                    <span>₦{totalInNGN.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {deliveryFee === 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-800 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    You qualify for free delivery!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

