import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  discount: 0.2, // 20% discount as shown in the design
  deliveryFee: 15,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      )

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail || product.images?.[0],
          quantity,
          selectedSize,
          selectedColor,
          brand: product.brand,
          category: product.category,
        })
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },

    removeFromCart: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload
      state.items = state.items.filter(
        item => !(
          item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        )
      )
      cartSlice.caseReducers.calculateTotals(state)
    },

    updateQuantity: (state, action) => {
      const { id, selectedSize, selectedColor, quantity } = action.payload
      const item = state.items.find(
        item => 
          item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      )
      
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },

    increaseQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload
      const item = state.items.find(
        item => 
          item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      )
      
      if (item) {
        item.quantity += 1
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },

    decreaseQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload
      const item = state.items.find(
        item => 
          item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      )
      
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },

    clearCart: (state) => {
      state.items = []
      cartSlice.caseReducers.calculateTotals(state)
    },

    applyPromoCode: (state, action) => {
      // Simple promo code logic - can be enhanced
      const { code } = action.payload
      if (code === 'SAVE20') {
        state.discount = 0.2
      } else {
        state.discount = 0
      }
      cartSlice.caseReducers.calculateTotals(state)
    },

    calculateTotals: (state) => {
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      const discountAmount = subtotal * state.discount
      
      state.totalAmount = subtotal - discountAmount + state.deliveryFee
      state.subtotal = subtotal
      state.discountAmount = discountAmount
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  applyPromoCode,
  calculateTotals,
} = cartSlice.actions

export default cartSlice.reducer

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalAmount = (state) => state.cart.totalAmount
export const selectCartSubtotal = (state) => state.cart.subtotal
export const selectCartDiscountAmount = (state) => state.cart.discountAmount
export const selectCartDeliveryFee = (state) => state.cart.deliveryFee

