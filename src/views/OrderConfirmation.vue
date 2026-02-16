<template>
  <div class="confirmation-page">
    <!-- Confirmation Content -->
    <section class="confirmation-content">
      <div class="container">
        <div class="confirmation-wrapper">
          <!-- Success Message -->
          <div class="success-header">
            <div class="success-icon">✓</div>
            <h1 class="success-title">Order Confirmed!</h1>
            <p class="success-message">Thank you for your order. We'll prepare it right away.</p>
          </div>

          <!-- Order Details Card -->
          <div class="order-card">
            <div class="order-card-header">
              <h2 class="card-title">Order Details</h2>
              <span class="order-id">Order #{{ orderDetails.orderId }}</span>
            </div>
            
            <div class="order-card-body">
              <!-- Customer Info -->
              <div class="info-section">
                <h3 class="info-title">Customer Information</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span class="info-value">{{ orderDetails.customerInfo.name }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">{{ orderDetails.customerInfo.phone }}</span>
                  </div>
                  <div class="info-item" v-if="orderDetails.customerInfo.email">
                    <span class="info-label">Email:</span>
                    <span class="info-value">{{ orderDetails.customerInfo.email }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Order Type:</span>
                    <span class="info-value order-type-badge" :class="orderDetails.orderType">
                      {{ orderDetails.orderType === 'delivery' ? 'Delivery' : 'Pickup' }}
                    </span>
                  </div>
                  <div class="info-item" v-if="orderDetails.orderType === 'delivery' && orderDetails.customerInfo.address">
                    <span class="info-label">Address:</span>
                    <span class="info-value">{{ orderDetails.customerInfo.address }}</span>
                  </div>
                  <div class="info-item" v-if="orderDetails.customerInfo.notes">
                    <span class="info-label">Notes:</span>
                    <span class="info-value">{{ orderDetails.customerInfo.notes }}</span>
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div class="info-section">
                <h3 class="info-title">Order Items</h3>
                <div class="order-items-list">
                  <div 
                    v-for="item in orderDetails.items" 
                    :key="`${item.name}-${item.size}`"
                    class="order-item"
                  >
                    <div class="order-item-info">
                      <span class="order-item-name">{{ item.name }}</span>
                      <span class="order-item-details">{{ item.size }} × {{ item.quantity }}</span>
                    </div>
                    <span class="order-item-price">₱{{ item.price * item.quantity }}</span>
                  </div>
                </div>
              </div>

              <!-- Order Total -->
              <div class="order-total-section">
                <div class="total-row">
                  <span class="total-label">Total Amount:</span>
                  <span class="total-value">₱{{ orderDetails.total }}</span>
                </div>
              </div>

              <!-- Order Date -->
              <div class="order-date">
                <span>Order Date: {{ formatDate(orderDetails.date) }}</span>
              </div>
            </div>
          </div>

          <!-- QR Code Section -->
          <div class="qr-section">
            <h3 class="qr-title">Order QR Code</h3>
            <p class="qr-description">Show this QR code when picking up your order</p>
            <div class="qr-container">
              <canvas ref="qrCanvas" class="qr-code"></canvas>
            </div>
            <p class="qr-note">Order ID: {{ orderDetails.orderId }}</p>
          </div>

          <!-- Actions -->
          <div class="confirmation-actions">
            <button @click="printOrder" class="action-btn print-btn">Print Order</button>
            <router-link to="/menu" class="action-btn continue-btn">Continue Shopping</router-link>
          </div>
        </div>
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
import QRCode from 'qrcode'
import { useCart } from '../composables/useCart'

export default {
  name: 'OrderConfirmation',
  setup() {
    const { resetCart } = useCart()
    return { resetCart }
  },
  data() {
    return {
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
    // Get order details from sessionStorage or route query
    const orderId = this.$route.query.orderId
    const storedOrder = sessionStorage.getItem('pendingOrder')
    
    if (storedOrder) {
      this.orderDetails = JSON.parse(storedOrder)
      sessionStorage.removeItem('pendingOrder')
    } else if (orderId) {
      // If no stored order, create a placeholder (in real app, fetch from API)
      this.orderDetails.orderId = orderId
    }
    
    // Generate QR code
    this.generateQRCode()
    
    // Clear cart after order confirmation
    this.resetCart()
  },
  methods: {
    async generateQRCode() {
      try {
        const qrData = JSON.stringify({
          orderId: this.orderDetails.orderId,
          total: this.orderDetails.total,
          date: this.orderDetails.date
        })
        
        await QRCode.toCanvas(this.$refs.qrCanvas, qrData, {
          width: 200,
          margin: 2,
          color: {
            dark: '#2c2c2c',
            light: '#ffffff'
          }
        })
      } catch (error) {
        console.error('Error generating QR code:', error)
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
    },
    printOrder() {
      window.print()
    }
  }
}
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.confirmation-content {
  flex: 1;
  padding: 60px 0;
}

.confirmation-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.success-header {
  text-align: center;
  margin-bottom: 40px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--primary-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 20px;
  font-weight: bold;
}

.success-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--dark-gray);
  margin-bottom: 10px;
}

.success-message {
  font-size: 1.1rem;
  color: var(--dark-gray);
  opacity: 0.8;
}

.order-card {
  background-color: #e1dfd7;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-card-header {
  background-color: var(--primary-green);
  color: white;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}

.order-id {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 500;
  letter-spacing: 1px;
}

.order-card-body {
  padding: 24px;
}

.info-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(44, 44, 44, 0.1);
}

.info-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--dark-gray);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 0.95rem;
  color: var(--dark-gray);
  font-weight: 500;
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

.order-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.order-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-item-name {
  font-weight: 500;
  color: var(--dark-gray);
}

.order-item-details {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.7;
}

.order-item-price {
  font-weight: 600;
  color: var(--primary-green);
}

.order-total-section {
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

.order-date {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(44, 44, 44, 0.1);
  text-align: center;
  font-size: 0.9rem;
  color: var(--dark-gray);
  opacity: 0.7;
}

.qr-section {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.qr-title {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--dark-gray);
}

.qr-description {
  font-size: 0.95rem;
  color: var(--dark-gray);
  opacity: 0.7;
  margin-bottom: 20px;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding: 20px;
  background-color: white;
  border: 2px solid rgba(44, 44, 44, 0.1);
  border-radius: 8px;
  display: inline-block;
}

.qr-code {
  display: block;
}

.qr-note {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.6;
  margin-top: 12px;
}

.confirmation-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  padding: 14px 32px;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.95rem;
}

.print-btn {
  background-color: var(--dark-gray);
  color: white;
}

.print-btn:hover {
  background-color: var(--primary-green);
}

.continue-btn {
  background-color: var(--primary-green);
  color: white;
}

.continue-btn:hover {
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

@media print {
  .footer,
  .confirmation-actions {
    display: none;
  }
  
  .confirmation-content {
    padding: 20px 0;
  }
}

@media (max-width: 768px) {
  .success-title {
    font-size: 2rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>

