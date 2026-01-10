<template>
  <div class="home-page">
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

    <!-- Hero + Image Section -->
    <section class="hero">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7 hero-text-block">
            <p class="hero-kicker">About</p>
            <h1 class="hero-title">PRAYZ</h1>
            <p class="hero-tagline">serving daily gratitude and grace</p>
          </div>
          <div class="col-lg-5 hero-image-block">
            <div class="hero-image-placeholder">
              <span class="hero-image-label">Your corner for slow coffee moments.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lower Grid Section -->
    <section class="lower-grid">
      <div class="container">
        <div class="row g-3 align-items-stretch">
          <div class="col-lg-7 lower-about">
            <h2 class="lower-about-heading">A cozy corner<br>for mindful coffee.</h2>
            <p class="lower-about-copy">
              Prayz is a calm space in the middle of the everyday rush.
              Minimal, warm and thoughtful—every cup is an invitation to pause,
              breathe, and give thanks.
            </p>
          </div>
          <div class="col-lg-5 lower-green-panel">
            <p class="panel-eyebrow">From heart</p>
            <p class="panel-main">served with soul.</p>
            <router-link to="/menu" class="panel-cta">View our menu</router-link>
          </div>
          <div class="col-lg-7 lower-art-block mt-3 mt-lg-4">
            <div class="cups-shadow"></div>
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
import { useCart } from '../composables/useCart'

export default {
  name: 'Home',
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
.home-page {
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
  gap: 2.5rem; /* space between Menu and Contact */
  margin-left: 3rem; /* space between Prayz logo and first link */
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

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-green);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
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

.hero {
  padding: 80px 0 60px;
}

.hero-text-block {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-kicker {
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dark-gray);
}

.hero-title {
  font-family: var(--font-display);
  font-size: 6.2rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: var(--dark-gray);
  margin: 0;
  line-height: 1.1;
}

.hero-tagline {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--dark-gray);
  text-transform: none;
  opacity: 0.8;
  font-style: normal;
}

.hero-image-block {
  height: 260px;
}

.hero-image-placeholder {
  background-image: url('../assets/prayz-front.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  background-color: #e1dfd7;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 18px 20px;
}

.hero-image-label {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cream);
  background-color: rgba(44, 44, 44, 0.8);
  padding: 6px 12px;
  border-radius: 999px;
  opacity: 0.95;
}

.lower-grid {
  padding: 40px 0 90px;
}

.lower-about {
  padding-right: 20px;
}

.lower-about-heading {
  font-family: var(--font-sans);
  font-size: 2rem;
  font-weight: 500;
  color: var(--dark-gray);
  margin-bottom: 18px;
}

.lower-about-copy {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--dark-gray);
  max-width: 420px;
}

.lower-green-panel {
  background-color: var(--primary-green);
  color: var(--cream);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.panel-eyebrow {
  font-size: 0.9rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.8;
}

.panel-main {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1.2;
}

.panel-cta {
  align-self: flex-start;
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 10px 22px;
  border: 1px solid var(--cream);
  color: var(--cream);
  transition: background-color 0.25s ease, color 0.25s ease;
}

.panel-cta:hover {
  background-color: var(--cream);
  color: var(--primary-green);
}

.lower-art-block {
  background-color: #d6d3c9;
  position: relative;
  overflow: hidden;
}

.cups-shadow {
  position: absolute;
  inset: 15%;
  border-radius: 999px;
  box-shadow: 0 0 0 80px rgba(0, 0, 0, 0.07);
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
  .hero-title {
    font-size: 3.4rem;
    letter-spacing: 0.1em;
  }
  
  .hero-tagline {
    font-size: 0.9rem;
    letter-spacing: 0.12em;
  }

  .navbar {
    padding: 20px 0;
  }
}
</style>

