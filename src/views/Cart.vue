<template>
  <div class="cart-page">
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

    <!-- Cart Header -->
    <section class="cart-header">
      <div class="container">
        <h1 class="cart-title">Your Cart</h1>
        <p v-if="groupedItems.length === 0" class="cart-empty">Your cart is empty</p>
      </div>
    </section>

    <!-- Cart Content -->
    <section class="cart-content" v-if="groupedItems.length > 0">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="cart-items">
              <div 
                v-for="item in groupedItems" 
                :key="`${item.name}-${item.size}`"
                class="cart-item"
              >
                <div class="cart-item-info">
                  <h3 class="cart-item-name">{{ item.name }}</h3>
                  <p class="cart-item-details">
                    Size: {{ item.size }} · ₱{{ item.price }} each
                  </p>
                  <p v-if="item.description" class="cart-item-description">
                    {{ item.description }}
                  </p>
                </div>
                <div class="cart-item-controls">
                  <div class="quantity-controls">
                    <button 
                      @click="updateItemQuantity(item, item.quantity - 1)"
                      class="quantity-btn"
                    >-</button>
                    <span class="quantity-value">{{ item.quantity }}</span>
                    <button 
                      @click="updateItemQuantity(item, item.quantity + 1)"
                      class="quantity-btn"
                    >+</button>
                  </div>
                  <p class="cart-item-total">₱{{ item.price * item.quantity }}</p>
                  <button 
                    @click="removeItem(item)"
                    class="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="cart-summary">
              <h2 class="summary-title">Order Summary</h2>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>₱{{ totalPrice }}</span>
              </div>
              <div class="summary-row">
                <span>Items</span>
                <span>{{ cartCount }}</span>
              </div>
              <div class="summary-total">
                <span>Total</span>
                <span>₱{{ totalPrice }}</span>
              </div>
              <router-link to="/checkout" class="checkout-btn">
                Proceed to Checkout
              </router-link>
              <router-link to="/menu" class="continue-shopping">
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty Cart Message -->
    <section v-else class="empty-cart">
      <div class="container">
        <router-link to="/menu" class="shop-btn">
          Browse Menu
        </router-link>
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
  name: 'Cart',
  setup() {
    const { 
      cart, 
      getGroupedItems, 
      getTotalPrice, 
      getItemCount, 
      updateQuantity,
      removeFromCart 
    } = useCart()
    
    return { 
      cart, 
      getGroupedItems, 
      getTotalPrice, 
      getItemCount, 
      updateQuantity,
      removeFromCart 
    }
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
    }
  },
  methods: {
    updateItemQuantity(item, newQuantity) {
      if (newQuantity < 1) {
        this.removeItem(item)
        return
      }
      
      const currentQuantity = item.quantity
      const difference = newQuantity - currentQuantity
      
      if (difference > 0) {
        // Add more items
        for (let i = 0; i < difference; i++) {
          const newItem = {
            id: Date.now() + Math.random(),
            name: item.name,
            category: item.category,
            size: item.size,
            price: item.price,
            description: item.description
          }
          this.cart.items.push(newItem)
        }
      } else if (difference < 0) {
        // Remove items
        let toRemove = Math.abs(difference)
        for (let i = this.cart.items.length - 1; i >= 0 && toRemove > 0; i--) {
          const cartItem = this.cart.items[i]
          if (cartItem.name === item.name && 
              cartItem.size === item.size && 
              cartItem.price === item.price) {
            this.cart.items.splice(i, 1)
            toRemove--
          }
        }
      }
    },
    removeItem(item) {
      // Remove all items matching this item's properties
      this.cart.items = this.cart.items.filter(cartItem => 
        !(cartItem.name === item.name && 
          cartItem.size === item.size && 
          cartItem.price === item.price)
      )
    }
  }
}
</script>

<style scoped>
.cart-page {
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

.cart-header {
  padding: 60px 0 40px;
  text-align: center;
}

.cart-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--dark-gray);
  margin-bottom: 10px;
}

.cart-empty {
  color: var(--dark-gray);
  opacity: 0.6;
  font-size: 1.1rem;
}

.cart-content {
  flex: 1;
  padding: 0 0 60px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  background-color: #e1dfd7;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--dark-gray);
}

.cart-item-details {
  font-size: 0.9rem;
  color: var(--dark-gray);
  opacity: 0.7;
  margin-bottom: 4px;
}

.cart-item-description {
  font-size: 0.85rem;
  color: var(--dark-gray);
  opacity: 0.6;
  margin-top: 4px;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 4px;
  padding: 4px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  color: var(--dark-gray);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.quantity-btn:hover {
  background-color: rgba(44, 44, 44, 0.1);
}

.quantity-value {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.cart-item-total {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-green);
}

.remove-btn {
  padding: 6px 12px;
  background-color: transparent;
  color: var(--dark-red);
  border: 1px solid var(--dark-red);
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background-color: var(--dark-red);
  color: white;
}

.cart-summary {
  background-color: #e1dfd7;
  padding: 24px;
  position: sticky;
  top: 100px;
}

.summary-title {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: var(--dark-gray);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(44, 44, 44, 0.1);
  font-size: 0.95rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-top: 8px;
  border-top: 2px solid var(--dark-gray);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-green);
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background-color: var(--primary-green);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: var(--dark-red);
}

.continue-shopping {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: var(--dark-gray);
  text-align: center;
  text-decoration: none;
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 4px;
  font-weight: 500;
  margin-top: 12px;
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  border-color: var(--primary-green);
  color: var(--primary-green);
}

.empty-cart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
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

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
  }
  
  .cart-item-controls {
    align-items: flex-start;
    width: 100%;
  }
  
  .cart-summary {
    position: static;
    margin-top: 30px;
  }
}
</style>

