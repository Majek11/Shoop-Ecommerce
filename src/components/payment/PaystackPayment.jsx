import { usePaystackPayment } from 'react-paystack'
import { useState } from 'react'

const PaystackPayment = ({ amount, email, onSuccess, onClose, disabled = false }) => {
  const [isLoading, setIsLoading] = useState(false)

  // Paystack test public key
  const publicKey = "pk_test_a4d98c403ba891bac49090e3d9c6b3f0de4e8838"

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: Math.round(amount * 100), // Paystack expects amount in kobo (NGN * 100)
    publicKey: publicKey,
    currency: 'NGN',
  }

  const initializePayment = usePaystackPayment(config)

  const handlePayment = () => {
    setIsLoading(true)
    initializePayment(
      (reference) => {
        setIsLoading(false)
        onSuccess(reference)
      },
      () => {
        setIsLoading(false)
        onClose()
      }
    )
  }

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
        disabled || isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {isLoading ? 'Processing...' : `Pay ₦${amount.toLocaleString()}`}
    </button>
  )
}

export default PaystackPayment

