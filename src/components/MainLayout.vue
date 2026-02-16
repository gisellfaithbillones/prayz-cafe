<template>
  <div class="main-layout">
    <nav class="site-nav">
      <div class="container">
        <div class="site-nav-inner">
          <router-link to="/" class="site-nav-logo">Prayz</router-link>
          <div class="site-nav-links">
            <router-link to="/about" class="site-nav-link">About</router-link>
            <router-link to="/menu" class="site-nav-link">Menu</router-link>
            <router-link to="/contact" class="site-nav-link">Contact</router-link>
            <router-link to="/cart" class="site-nav-cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span v-if="cartCount > 0" class="site-nav-cart-badge">{{ cartCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="layout-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'

export default {
  name: 'MainLayout',
  setup() {
    const { getItemCount } = useCart()
    return { getItemCount }
  },
  computed: {
    cartCount() {
      return this.getItemCount()
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--cream);
}

.site-nav {
  padding: 20px 0;
  border-bottom: 1px solid rgba(44, 44, 44, 0.08);
  background-color: var(--cream);
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-nav-logo {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--primary-green);
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-nav-logo:hover {
  color: var(--dark-gray);
}

.site-nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.site-nav-link {
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  color: var(--dark-gray);
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-nav-link:hover,
.site-nav-link.router-link-active {
  color: var(--primary-green);
}

.site-nav-cart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-gray);
  transition: color 0.2s ease;
}

.site-nav-cart:hover {
  color: var(--primary-green);
}

.site-nav-cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: var(--dark-red);
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-content {
  flex: 1;
}

@media print {
  .site-nav {
    display: none;
  }
}
</style>
