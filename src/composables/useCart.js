import { reactive } from 'vue'

// Cart state
const cart = reactive({
  items: [],
  orderType: null, // 'delivery' or 'pickup'
  customerInfo: {
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  }
})

// Generate unique ID for cart items
let itemIdCounter = 0

export function useCart() {
  const addToCart = (menuItem, selectedSize) => {
    const cartItem = {
      id: ++itemIdCounter,
      name: menuItem.name,
      category: menuItem.category,
      size: selectedSize.label,
      price: selectedSize.price,
      description: menuItem.description || null
    }
    cart.items.push(cartItem)
  }

  const removeFromCart = (itemId) => {
    const index = cart.items.findIndex(item => item.id === itemId)
    if (index > -1) {
      cart.items.splice(index, 1)
    }
  }

  const updateQuantity = (itemId, quantity) => {
    const item = cart.items.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId)
      } else {
        // For simplicity, we'll duplicate items for quantity > 1
        // In a real app, you'd have a quantity field
        const currentCount = cart.items.filter(i => i.id === itemId).length
        if (quantity > currentCount) {
          // Add more
          for (let i = currentCount; i < quantity; i++) {
            cart.items.push({ ...item, id: ++itemIdCounter })
          }
        } else if (quantity < currentCount) {
          // Remove some
          let removed = 0
          for (let i = cart.items.length - 1; i >= 0 && removed < (currentCount - quantity); i--) {
            if (cart.items[i].id === itemId || 
                (cart.items[i].name === item.name && 
                 cart.items[i].size === item.size && 
                 cart.items[i].price === item.price)) {
              cart.items.splice(i, 1)
              removed++
            }
          }
        }
      }
    }
  }

  const getItemQuantity = (itemId) => {
    return cart.items.filter(item => item.id === itemId).length
  }

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + item.price, 0)
  }

  const getItemCount = () => {
    return cart.items.length
  }

  const clearCart = () => {
    cart.items = []
  }

  const setOrderType = (type) => {
    cart.orderType = type
  }

  const setCustomerInfo = (info) => {
    cart.customerInfo = { ...cart.customerInfo, ...info }
  }

  const resetCart = () => {
    cart.items = []
    cart.orderType = null
    cart.customerInfo = {
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    }
  }

  // Get grouped items (same name, size, price grouped together)
  const getGroupedItems = () => {
    const grouped = {}
    cart.items.forEach(item => {
      const key = `${item.name}-${item.size}-${item.price}`
      if (!grouped[key]) {
        grouped[key] = {
          ...item,
          quantity: 0,
          ids: []
        }
      }
      grouped[key].quantity++
      grouped[key].ids.push(item.id)
    })
    return Object.values(grouped)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    getTotalPrice,
    getItemCount,
    clearCart,
    setOrderType,
    setCustomerInfo,
    resetCart,
    getGroupedItems
  }
}

