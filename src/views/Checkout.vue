<template>
  <div class="checkout-page">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <router-link to="/" class="logo">Prayz</router-link>
          <div class="nav-links ms-auto">
            <router-link to="/menu" class="nav-link">Menu</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
            <router-link to="/cart" class="cart-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Checkout Header -->
    <section class="checkout-header">
      <div class="container">
        <h1 class="checkout-title">Checkout</h1>
      </div>
    </section>

    <!-- Order Summary (shown after payment return) -->
    <section class="checkout-content" v-if="showOrderSummary && orderDetails.orderId">
      <div class="container">
        <div class="order-summary-container">
          <div class="summary-header">
            <h2 class="summary-title">Order Summary</h2>
            <p class="summary-subtitle">Thank you for your order!</p>
          </div>
          
          <div class="order-summary-card">
            <div class="summary-section">
              <h3 class="section-title-small">Order Details</h3>
              <div class="summary-info">
                <div class="info-row">
                  <span class="info-label">Order ID:</span>
                  <span class="info-value">{{ orderDetails.orderId }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Order Type:</span>
                  <span class="info-value order-type-badge" :class="orderDetails.orderType">
                    {{ orderDetails.orderType === 'delivery' ? 'Delivery' : 'Pickup' }}
                  </span>
                </div>
                <div class="info-row">
                  <span class="info-label">Date:</span>
                  <span class="info-value">{{ formatDate(orderDetails.date) }}</span>
                </div>
              </div>
            </div>

            <div class="summary-section">
              <h3 class="section-title-small">Customer Information</h3>
              <div class="summary-info">
                <div class="info-row">
                  <span class="info-label">Name:</span>
                  <span class="info-value">{{ orderDetails.customerInfo.name }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Phone:</span>
                  <span class="info-value">{{ orderDetails.customerInfo.phone }}</span>
                </div>
                <div class="info-row" v-if="orderDetails.customerInfo.email">
                  <span class="info-label">Email:</span>
                  <span class="info-value">{{ orderDetails.customerInfo.email }}</span>
                </div>
                <div class="info-row" v-if="orderDetails.orderType === 'delivery' && orderDetails.customerInfo.address">
                  <span class="info-label">Address:</span>
                  <span class="info-value">{{ orderDetails.customerInfo.address }}</span>
                </div>
              </div>
            </div>

            <div class="summary-section">
              <h3 class="section-title-small">Order Items</h3>
              <div class="order-items-summary">
                <div 
                  v-for="item in orderDetails.items" 
                  :key="`${item.name}-${item.size}`"
                  class="summary-item-row"
                >
                  <div class="item-info">
                    <span class="item-name">{{ item.name }}</span>
                    <span class="item-details">{{ item.size }} × {{ item.quantity }}</span>
                  </div>
                  <span class="item-price">₱{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="summary-total-section">
              <div class="total-row">
                <span class="total-label">Total Amount:</span>
                <span class="total-value">₱{{ orderDetails.total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-actions">
              <router-link to="/order-confirmation" class="view-details-btn">
                View Full Order Details
              </router-link>
              <router-link to="/menu" class="continue-shopping-btn">
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Checkout Content (shown before payment) -->
    <section class="checkout-content" v-else-if="groupedItems.length > 0">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-7">
            <form @submit.prevent="handleCheckout" class="checkout-form">
              <!-- Order Type Selection -->
              <div class="form-section">
                <h2 class="section-title">Order Type</h2>
                <div class="order-type-options">
                  <label class="order-type-option">
                    <input 
                      type="radio" 
                      name="orderType" 
                      value="pickup"
                      v-model="orderType"
                      required
                    />
                    <div class="option-content">
                      <span class="option-label">Pickup</span>
                      <span class="option-desc">Pick up your order at the cafe</span>
                    </div>
                  </label>
                  <label class="order-type-option">
                    <input 
                      type="radio" 
                      name="orderType" 
                      value="delivery"
                      v-model="orderType"
                      required
                    />
                    <div class="option-content">
                      <span class="option-label">Delivery</span>
                      <span class="option-desc">We'll deliver to your address</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Customer Information -->
              <div class="form-section">
                <h2 class="section-title">Customer Information</h2>
                <div class="form-group">
                  <label for="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    v-model="customerInfo.name"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    v-model="customerInfo.phone"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    v-model="customerInfo.email"
                    placeholder="Enter your email (optional)"
                  />
                </div>
                <div class="form-group" v-if="orderType === 'delivery'">
                  <label for="address">Delivery Address *</label>
                  <textarea 
                    id="address"
                    v-model="customerInfo.address"
                    :required="orderType === 'delivery'"
                    placeholder="Enter your delivery address"
                    rows="3"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="notes">Special Instructions</label>
                  <textarea 
                    id="notes"
                    v-model="customerInfo.notes"
                    placeholder="Any special requests or instructions (optional)"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="form-section">
                <h2 class="section-title">Payment</h2>
                <div class="payment-info">
                  <p>You will be redirected to PayMongo to complete your payment.</p>
                  <p class="payment-note">We accept <strong>QR PH</strong> payments (GCash, PayMaya).</p>
                  <div class="amount-reminder">
                    <p class="amount-label">Amount to Pay:</p>
                    <div class="amount-display">
                      <span class="amount-value">₱{{ totalPrice.toFixed(2) }}</span>
                      <button 
                        @click="copyAmount" 
                        class="copy-btn"
                        type="button"
                      >
                        Copy
                      </button>
                    </div>
                    <p class="amount-instruction">Please enter this exact amount on the PayMongo payment page.</p>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <router-link to="/cart" class="back-btn">Back to Cart</router-link>
                <button type="submit" class="submit-btn" :disabled="!isFormValid">
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
          <div class="col-12 col-lg-5">
            <div class="order-summary">
              <h2 class="summary-title">Order Summary</h2>
              <div class="summary-items">
                <div 
                  v-for="item in groupedItems" 
                  :key="`${item.name}-${item.size}`"
                  class="summary-item"
                >
                  <div class="summary-item-info">
                    <span class="summary-item-name">{{ item.name }}</span>
                    <span class="summary-item-details">{{ item.size }} × {{ item.quantity }}</span>
                  </div>
                  <span class="summary-item-price">₱{{ item.price * item.quantity }}</span>
                </div>
              </div>
              <div class="summary-total">
                <span>Total</span>
                <span>₱{{ totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty Cart Redirect -->
    <section v-else class="empty-checkout">
      <div class="container">
        <p>Your cart is empty. Please add items to your cart first.</p>
        <router-link to="/menu" class="shop-btn">Browse Menu</router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p class="footer-text">&copy; 2024 Prayz. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'

export default {
  name: 'Checkout',
  setup() {
    const { 
      cart, 
      getGroupedItems, 
      getTotalPrice, 
      getItemCount,
      setOrderType,
      setCustomerInfo
    } = useCart()
    
    return { 
      cart, 
      getGroupedItems, 
      getTotalPrice, 
      getItemCount,
      setOrderType,
      setCustomerInfo
    }
  },
  data() {
    return {
      orderType: this.cart.orderType || 'pickup',
      customerInfo: {
        name: this.cart.customerInfo.name || '',
        phone: this.cart.customerInfo.phone || '',
        email: this.cart.customerInfo.email || '',
        address: this.cart.customerInfo.address || '',
        notes: this.cart.customerInfo.notes || ''
      },
      showOrderSummary: false,
      orderDetails: {
        orderId: '',
        orderType: 'pickup',
        customerInfo: {},
        items: [],
        total: 0,
        date: new Date().toISOString()
      }
    }
  },
  mounted() {
    // Check if returning from payment
    this.checkPaymentReturn()
  },
  computed: {
    groupedItems() {
      return this.getGroupedItems()
    },
    totalPrice() {
      return this.getTotalPrice()
    },
    cartCount() {
      return this.getItemCount()
    },
    isFormValid() {
      if (!this.orderType) return false
      if (!this.customerInfo.name || !this.customerInfo.phone) return false
      if (this.orderType === 'delivery' && !this.customerInfo.address) return false
      return true
    }
  },
  methods: {
    handleCheckout() {
      // Save order type and customer info to cart
      this.setOrderType(this.orderType)
      this.setCustomerInfo(this.customerInfo)
      
      // Generate order details
      const orderDetails = this.generateOrderDetails()
      
      // Store order details in sessionStorage for confirmation page
      sessionStorage.setItem('pendingOrder', JSON.stringify(orderDetails))
      
      // Store the total amount for reference on PayMongo page
      sessionStorage.setItem('orderTotal', this.totalPrice.toString())
      
      // Redirect directly to PayMongo payment link
      // Note: PayMongo payment links may require manual amount entry
      const paymongoPaymentLink = 'https://paymongo.page/l/the-prayz-cafe'
      
      // Get the return URL (current checkout page)
      const returnUrl = encodeURIComponent(window.location.origin + '/checkout')
      
      // Try to pass amount and return URL as query parameters
      const formattedAmount = parseFloat(this.totalPrice).toFixed(2)
      window.location.href = `${paymongoPaymentLink}?amount=${formattedAmount}&return_url=${returnUrl}`
    },
    copyAmount() {
      const amount = this.totalPrice.toFixed(2)
      navigator.clipboard.writeText(amount).then(() => {
        // Show feedback
        const btn = event.target
        const originalText = btn.textContent
        btn.textContent = 'Copied!'
        btn.style.backgroundColor = 'var(--primary-green)'
        setTimeout(() => {
          btn.textContent = originalText
          btn.style.backgroundColor = ''
        }, 2000)
      }).catch(() => {
        alert(`Amount to pay: ₱${amount}`)
      })
    },
    generateOrderDetails() {
      const orderId = 'ORD-' + Date.now()
      return {
        orderId,
        orderType: this.orderType,
        customerInfo: { ...this.customerInfo },
        items: this.groupedItems,
        total: this.totalPrice,
        date: new Date().toISOString()
      }
    },
    checkPaymentReturn() {
      // Check if there's a pending order in sessionStorage (returning from payment)
      const pendingOrder = sessionStorage.getItem('pendingOrder')
      const urlParams = new URLSearchParams(window.location.search)
      
      // Check for PayMongo return parameters or pending order
      if (pendingOrder || urlParams.has('payment_id') || urlParams.has('status')) {
        if (pendingOrder) {
          this.orderDetails = JSON.parse(pendingOrder)
          this.showOrderSummary = true
          
          // Clean up URL parameters
          if (urlParams.has('payment_id') || urlParams.has('status')) {
            window.history.replaceState({}, document.title, window.location.pathname)
          }
        }
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  padding: 30px 0;
  position: sticky;
  top: 0;
  background-color: var(--cream);
  z-index: 100;
  border-bottom: 1px solid rgba(44, 44, 44, 0.1);
}

.nav-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-left: 3rem;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--primary-green);
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--dark-red);
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--dark-gray);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s ease;
  position: relative;
  margin-left: 1.5rem;
}

.nav-link:hover {
  color: var(--primary-green);
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.5rem;
  color: var(--dark-gray);
  transition: color 0.3s ease;
}

.cart-link:hover {
  color: var(--primary-green);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--dark-red);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}

.checkout-header {
  padding: 60px 0 40px;
  text-align: center;
}

.checkout-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--dark-gray);
}

.checkout-content {
  flex: 1;
  padding: 0 0 60px;
}

.checkout-form {
  background-color: #e1dfd7;
  padding: 30px;
  border-radius: 8px;
}

.form-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: var(--dark-gray);
}

.order-type-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.order-type-option {
  flex: 1;
  min-width: 200px;
  cursor: pointer;
}

.order-type-option input[type="radio"] {
  display: none;
}

.option-content {
  padding: 16px 20px;
  border: 2px solid rgba(44, 44, 44, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-type-option input[type="radio"]:checked + .option-content {
  border-color: var(--primary-green);
  background-color: rgba(75, 98, 49, 0.1);
}

.option-label {
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--dark-gray);
}

.option-desc {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.7;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--dark-gray);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: var(--font-sans);
  background-color: white;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-green);
}

.payment-info {
  background-color: rgba(75, 98, 49, 0.1);
  padding: 16px;
  border-radius: 4px;
  border-left: 4px solid var(--primary-green);
}

.payment-info p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--dark-gray);
}

.payment-note {
  margin-top: 8px !important;
  font-size: 0.85rem !important;
  opacity: 0.8;
}

.amount-reminder {
  margin-top: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid var(--primary-green);
}

.amount-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--dark-gray);
  margin-bottom: 8px;
}

.amount-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.amount-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--primary-green);
  flex: 1;
}

.copy-btn {
  padding: 8px 16px;
  background-color: var(--primary-green);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background-color: var(--dark-red);
}

.amount-instruction {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.8;
  margin: 0;
  font-style: italic;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(44, 44, 44, 0.1);
}

.back-btn {
  padding: 12px 24px;
  background-color: transparent;
  color: var(--dark-gray);
  text-decoration: none;
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;
}

.back-btn:hover {
  border-color: var(--primary-green);
  color: var(--primary-green);
}

.submit-btn {
  padding: 12px 24px;
  background-color: var(--primary-green);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 2;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--dark-red);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.order-summary {
  background-color: #e1dfd7;
  padding: 24px;
  position: sticky;
  top: 100px;
  border-radius: 8px;
}

.summary-title {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: var(--dark-gray);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(44, 44, 44, 0.1);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.summary-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-item-name {
  font-weight: 500;
  color: var(--dark-gray);
}

.summary-item-details {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.7;
}

.summary-item-price {
  font-weight: 500;
  color: var(--primary-green);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-green);
  border-top: 2px solid var(--dark-gray);
}

.empty-checkout {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  text-align: center;
}

.shop-btn {
  padding: 16px 32px;
  background-color: var(--primary-green);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.shop-btn:hover {
  background-color: var(--dark-red);
}

.footer {
  padding: 40px 0;
  border-top: 1px solid rgba(44, 44, 44, 0.1);
  margin-top: auto;
}

.footer-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.6;
  letter-spacing: 1px;
}

.order-summary-container {
  max-width: 800px;
  margin: 0 auto;
}

.summary-header {
  text-align: center;
  margin-bottom: 30px;
}

.summary-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--dark-gray);
  margin-bottom: 8px;
}

.summary-subtitle {
  font-size: 1.1rem;
  color: var(--dark-gray);
  opacity: 0.8;
}

.order-summary-card {
  background-color: #e1dfd7;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(44, 44, 44, 0.1);
}

.summary-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title-small {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--dark-gray);
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.info-label {
  font-size: 0.9rem;
  color: var(--dark-gray);
  opacity: 0.7;
  font-weight: 500;
  min-width: 100px;
}

.info-value {
  font-size: 0.95rem;
  color: var(--dark-gray);
  font-weight: 500;
  text-align: right;
  flex: 1;
}

.order-type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.order-type-badge.pickup {
  background-color: rgba(75, 98, 49, 0.2);
  color: var(--primary-green);
}

.order-type-badge.delivery {
  background-color: rgba(122, 15, 31, 0.2);
  color: var(--dark-red);
}

.order-items-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-weight: 500;
  color: var(--dark-gray);
}

.item-details {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.7;
}

.item-price {
  font-weight: 600;
  color: var(--primary-green);
}

.summary-total-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid var(--dark-gray);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--dark-gray);
}

.total-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-green);
}

.summary-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.view-details-btn {
  flex: 1;
  padding: 14px;
  background-color: var(--primary-green);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease;
}

.view-details-btn:hover {
  background-color: var(--dark-red);
}

.continue-shopping-btn {
  flex: 1;
  padding: 14px;
  background-color: transparent;
  color: var(--dark-gray);
  text-align: center;
  text-decoration: none;
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  border-color: var(--primary-green);
  color: var(--primary-green);
}

@media (max-width: 768px) {
  .order-summary {
    position: static;
    margin-top: 30px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .order-type-options {
    flex-direction: column;
  }

  .summary-actions {
    flex-direction: column;
  }

  .info-row {
    flex-direction: column;
    gap: 4px;
  }

  .info-value {
    text-align: left;
  }
}
</style>

