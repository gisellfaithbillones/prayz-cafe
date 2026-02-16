<template>
  <div class="about-page">
    <div class="container container--narrow">
      <!-- About section (landscape, same as home) -->
      <div class="about-section-wrap">
        <section class="about-section">
          <div class="about-section-header">
            <p class="about-label">About</p>
            <span class="about-asterisk">*</span>
          </div>
          <h1 class="about-heading">A cozy corner—<br><span class="about-heading-line2">for good <strong>coffee.</strong></span></h1>
        </section>
      </div>

      <!-- Split block: green + cups (same as home) -->
      <div class="split-block">
        <div class="green-block">
          <p class="green-block-text">Made from heart served with soul.</p>
          <p class="green-block-tagline">Every cup we brew is a quiet invitation to slow down and feel at home.</p>
        </div>
        <div class="cups-block">
          <img src="../assets/coffee.webp" alt="Coffee" class="cups-image" />
        </div>
      </div>

      <!-- Extra copy -->
      <section class="about-copy-section">
        <p class="about-copy">Prayz is a calm space in the middle of the everyday rush. Minimal, warm and thoughtful—every cup is an invitation to pause, breathe, and give thanks.</p>
        <router-link to="/menu" class="about-cta">View our menu</router-link>
      </section>

      <footer class="about-footer">
        <p class="footer-text">&copy; 2024 Prayz. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 24px 0 64px;
  background-color: var(--cream);
}

.container--narrow {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
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

.about-copy-section {
  margin-top: 48px;
}

.about-copy {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--dark-gray);
  margin: 0 0 24px 0;
  max-width: 520px;
}

.about-cta {
  display: inline-block;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 22px;
  border: 1px solid var(--primary-green);
  color: var(--primary-green);
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.about-cta:hover {
  background-color: var(--primary-green);
  color: var(--cream);
}

.about-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(44, 44, 44, 0.08);
}

.about-footer .footer-text {
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
}
</style>
