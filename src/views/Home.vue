<template>
  <div class="home-page">
    <div class="container container--narrow">
      <!-- Brand -->
      <h1 class="brand">Prayz</h1>

      <!-- Hero -->
      <div class="hero-wrap">
        <div class="hero-image">
          <img src="../assets/prayz-front.jpg" alt="Prayz cafe" />
        </div>
        <router-link to="/contact" class="visit-btn">Visit Us</router-link>
      </div>

      <!-- About section (landscape) -->
      <div class="about-section-wrap">
        <section class="about-section">
          <div class="about-section-header">
            <p class="about-label">About</p>
            <span class="about-asterisk">*</span>
          </div>
          <h2 class="about-heading">A cozy corner—<br><span class="about-heading-line2">for good <strong>coffee.</strong></span></h2>
        </section>
      </div>

      <!-- Split block: green + cups -->
      <div class="split-block">
        <div class="green-block">
          <p class="green-block-text">Made from heart served with soul.</p>
          <p class="green-block-tagline">Every cup we brew is a quiet invitation to slow down and feel at home.</p>
        </div>
        <div class="cups-block">
          <img src="../assets/coffee.webp" alt="Coffee" class="cups-image" />
        </div>
      </div>

      <!-- Categories -->
      <section class="category-section">
        <p class="section-label">Category</p>
        <div class="category-grid">
          <router-link to="/menu" class="category-card">
            <span class="card-num">01</span>
            <div class="card-image card-coffee"></div>
            <span class="card-title">Coffee</span>
            <span class="card-link">view more →</span>
          </router-link>
          <router-link to="/menu" class="category-card">
            <span class="card-num">02</span>
            <div class="card-image card-non-coffee"></div>
            <span class="card-title">Non Coffee</span>
            <span class="card-link">view more →</span>
          </router-link>
          <router-link to="/menu" class="category-card">
            <span class="card-num">03</span>
            <div class="card-image card-icecream"></div>
            <span class="card-title">Ice cream</span>
            <span class="card-link">view more →</span>
          </router-link>
          <router-link to="/menu" class="category-card">
            <span class="card-num">04</span>
            <div class="card-image card-meals"></div>
            <span class="card-title">Meals</span>
            <span class="card-link">view more →</span>
          </router-link>
        </div>
      </section>

      <!-- Gallery -->
      <section class="gallery-section">
        <p class="section-label">Gallery</p>
        <p class="gallery-desc">A glimpse of our space.</p>
        <div class="gallery-grid">
          <div class="gallery-main">
            <div class="countertop-placeholder">Countertop image</div>
          </div>
          <div class="gallery-side">
            <span class="gallery-arc">)</span>
            <div class="gallery-small gallery-small-1"></div>
            <div class="gallery-small gallery-small-2"></div>
          </div>
        </div>
      </section>

      <footer class="page-footer">
        <p class="footer-text">&copy; 2024 Prayz. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: var(--cream);
  padding-bottom: 48px;
}

.container--narrow {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.brand {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--primary-green);
  margin: 0;
  padding: 24px 0 20px;
  line-height: 1;
}

.hero-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  margin-bottom: 32px;
}

.hero-image {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #e1dfd7;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.visit-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--dark-gray);
  border: 1px solid rgba(44, 44, 44, 0.25);
  padding: 10px 22px;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.visit-btn:hover {
  background-color: #fff;
  border-color: var(--dark-gray);
}

.about-section-wrap {
  aspect-ratio: 16 / 9;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--beige);
}

.about-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 0;
  padding: 32px 24px;
  text-align: center;
}

.about-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.about-label {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dark-gray);
  margin: 0;
}

.about-asterisk {
  color: var(--primary-green);
  font-size: 1.2rem;
}

.about-heading {
  font-family: var(--font-sans);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 600;
  color: var(--dark-gray);
  margin: 0;
  line-height: 1.35;
  max-width: 100%;
}

.about-heading-line2 {
  display: inline-block;
  margin-top: 0.15em;
  padding-left: 0.15em;
}

.about-heading strong {
  color: var(--primary-green);
  font-weight: 600;
}

.split-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 180px;
  margin-top: 24px;
}

.green-block {
  background-color: var(--primary-green);
  color: var(--cream);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.green-block-text {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.green-block-tagline {
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  opacity: 0.95;
}

.cups-block {
  position: relative;
  overflow: hidden;
  background-color: #d6d3c9;
  aspect-ratio: 16 / 9;
}

.cups-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.category-section {
  margin-top: 56px;
}

.section-label {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--light-gray);
  margin: 0 0 12px 0;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.category-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--dark-gray);
  transition: opacity 0.2s ease;
}

.category-card:hover {
  opacity: 0.85;
}

.card-num {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--light-gray);
  margin-bottom: 8px;
}

.card-image {
  aspect-ratio: 4/3;
  border-radius: 4px;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center;
}

.card-coffee { background-color: #c4a77d; }
.card-non-coffee { background-color: #a8c5b5; }
.card-icecream { background-color: #e8d5c4; }
.card-meals { background-color: #d4b896; }

.card-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
}

.card-link {
  font-size: 0.8rem;
  color: var(--primary-green);
  letter-spacing: 0.02em;
}

.gallery-section {
  margin-top: 40px;
}

.gallery-desc {
  font-size: 0.9rem;
  color: var(--dark-gray);
  margin: 0 0 16px 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 12px;
  align-items: start;
}

.gallery-main {
  min-height: 180px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #e1dfd7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.countertop-placeholder {
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  color: var(--light-gray);
  text-transform: lowercase;
}

.gallery-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.gallery-arc {
  color: var(--primary-green);
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 4px;
}

.gallery-small {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background-color: #d6d3c9;
}

.page-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(44, 44, 44, 0.08);
}

.footer-text {
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: var(--light-gray);
  margin: 0;
}

@media (max-width: 768px) {
  .split-block {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .green-block {
    min-height: 140px;
  }
  .cups-block {
    min-height: 160px;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  .gallery-side {
    flex-direction: row;
    justify-content: flex-start;
  }
  .gallery-small {
    max-width: 120px;
  }
}

@media (max-width: 576px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
