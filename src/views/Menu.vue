<template>
  <div class="menu-page">
    <!-- Menu Header -->
    <section class="menu-header">
      <div class="container">
        <p class="menu-kicker">Category</p>
        <h1 class="menu-title">Ready to serve you<br><span class="menu-title-accent">something good.</span></h1>
      </div>
    </section>

    <!-- Menu Content -->
    <section class="menu-content">
      <div class="container">
        <div class="row g-3">
          <div
            class="col-12 col-md-6 d-flex"
            v-for="category in categories"
            :key="category.label"
          >
            <div class="menu-card flex-grow-1 h-100">
              <div class="menu-card-header">
                <p class="menu-card-code">{{ category.code }}</p>
                <p class="menu-card-label">{{ category.label }}</p>
              </div>
              <div class="menu-card-body">
                <ul class="menu-card-list">
                  <li
                    v-for="(item, index) in category.items"
                    :key="`${item.name}-${index}`"
                    class="menu-card-item"
                  >
                    <div class="menu-item-content">
                      <span class="menu-card-item-name">
                        {{ item.name }}
                        <span
                          v-if="item.description"
                          class="menu-card-item-description"
                        >
                          · {{ item.description }}
                        </span>
                      </span>
                      <span class="menu-card-item-price">
                        <span
                          v-for="size in item.sizes"
                          :key="`${item.name}-${size.label}`"
                          class="menu-size"
                        >
                          <span class="menu-size-label">{{ size.label }}</span>
                          <span class="menu-size-value">₱{{ size.price }}</span>
                        </span>
                      </span>
                    </div>
                    <div class="menu-item-actions">
                      <select 
                        v-model="selectedSizes[`${category.label}-${item.name}`]"
                        class="size-select"
                        :disabled="item.sizes.length === 1"
                      >
                        <option 
                          v-for="size in item.sizes" 
                          :key="size.label"
                          :value="size.label"
                        >
                          {{ size.label }} - ₱{{ size.price }}
                        </option>
                      </select>
                      <button 
                        @click="addItemToCart(item, selectedSizes[`${category.label}-${item.name}`])"
                        class="add-to-cart-btn"
                        :disabled="!selectedSizes[`${category.label}-${item.name}`]"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
import menuItems from '../data/menuItems'
import { useCart } from '../composables/useCart'

export default {
  name: 'Menu',
  setup() {
    const { addToCart } = useCart()
    return { addToCart }
  },
  data() {
    return {
      menuItems,
      selectedSizes: {},
    }
  },
  computed: {
    categories() {
      const groups = {}
      this.menuItems.forEach((item, index) => {
        const category = item.category || 'Other'
        if (!groups[category]) {
          groups[category] = []
        }
        // ensure each item has an id for v-for keys
        groups[category].push({
          id: item.id ?? `${category}-${index}`,
          ...item,
        })
      })

      return Object.keys(groups).map((label, index) => ({
        code: String(index + 1).padStart(3, '0'),
        label,
        items: groups[label],
      }))
    }
  },
  mounted() {
    // Initialize default size selections
    this.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.sizes && item.sizes.length > 0) {
          const key = `${category.label}-${item.name}`
          if (!this.selectedSizes[key]) {
            this.selectedSizes[key] = item.sizes[0].label
          }
        }
      })
    })
  },
  methods: {
    addItemToCart(item, selectedSizeLabel) {
      if (!selectedSizeLabel) return
      
      const selectedSize = item.sizes.find(s => s.label === selectedSizeLabel)
      if (selectedSize) {
        this.addToCart(item, selectedSize)
        // Show feedback (you could add a toast notification here)
        this.$nextTick(() => {
          // Optional: scroll to cart icon or show notification
        })
      }
    }
  }
}
</script>

<style scoped>
.menu-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.menu-header {
  padding: 80px 0 20px;
  text-align: center;
}

.menu-kicker {
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dark-gray);
  margin-bottom: 10px;
}

.menu-title {
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--dark-gray);
  text-transform: none;
}

.menu-title-accent {
  color: var(--primary-green);
}

.menu-content {
  flex: 1;
  padding: 10px 0 100px;
}

.menu-card {
  background-color: #e1dfd7;
  padding: 18px 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-card-header {
  margin-bottom: 14px;
}

.menu-card-code {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 4px;
}

.menu-card-label {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.menu-card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-card-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(44, 44, 44, 0.1);
}

.menu-card-item:last-child {
  border-bottom: none;
}

.menu-item-content {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.menu-item-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.size-select {
  padding: 6px 10px;
  border: 1px solid rgba(44, 44, 44, 0.2);
  background-color: white;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  flex: 1;
  max-width: 150px;
}

.size-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-to-cart-btn {
  padding: 6px 16px;
  background-color: var(--primary-green);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: var(--dark-red);
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-card-item-name {
  max-width: 70%;
}

.menu-card-item-price {
  font-weight: 500;
  color: var(--primary-green);
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px 10px;
}

.menu-card-item-description {
  display: block;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0;
  opacity: 0.7;
}

.menu-size {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  font-size: 0.8rem;
}

.menu-size-label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
}

.menu-size-value {
  font-weight: 500;
  color: var(--primary-green);
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
  .menu-title {
    font-size: 2rem;
    letter-spacing: 0.12em;
  }
}
</style>

