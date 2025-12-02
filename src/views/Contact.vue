<template>
  <div class="contact-page">
    <!-- Navigation (same as Home) -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <router-link to="/" class="logo">Prayz</router-link>
          <div class="nav-links ms-auto">
            <router-link to="/menu" class="nav-link">Menu</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="row justify-content-between align-items-center g-4">
          <div class="col-lg-6">
            <p class="hero-kicker">Connect</p>
            <h1 class="hero-title">Stay in touch<br>with Prayz.</h1>
            <p class="hero-copy">
              For menu questions, collaborations, or just to say hi,
              reach out through any of our channels below.
            </p>
          </div>
          <div class="col-lg-5">
            <div class="hero-card">
              <p class="hero-card-title">Visit our socials</p>
              <p class="hero-card-text">
                Follow along for daily pours, soft moments, and
                small reminders of gratitude.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links -->
    <section class="social-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <a
              href="https://www.instagram.com/prayz.cafe"
              target="_blank"
              rel="noopener noreferrer"
              class="social-card"
            >
              <p class="social-label">Instagram</p>
              <p class="social-handle">@prayz.cafe</p>
            </a>
          </div>
          <div class="col-md-4">
            <a
              href="https://www.tiktok.com/@prayz.cafe"
              target="_blank"
              rel="noopener noreferrer"
              class="social-card"
            >
              <p class="social-label">TikTok</p>
              <p class="social-handle">@prayz.cafe</p>
            </a>
          </div>
          <div class="col-md-4">
            <a
              href="https://www.facebook.com/profile.php?id=61553373681599"
              target="_blank"
              rel="noopener noreferrer"
              class="social-card"
            >
              <p class="social-label">Facebook</p>
              <p class="social-handle">Prayz</p>
            </a>
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
export default {
  name: 'Contact'
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--cream);
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

.hero {
  padding: 80px 0 40px;
}

.hero-kicker {
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dark-gray);
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.2rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: var(--dark-gray);
  margin: 10px 0 18px;
  line-height: 1.2;
}

.hero-copy {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--dark-gray);
  max-width: 420px;
}

.hero-card {
  background-color: var(--primary-green);
  color: var(--cream);
  padding: 28px 24px;
}

.hero-card-title {
  font-size: 0.9rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 10px;
}

.hero-card-text {
  font-size: 0.95rem;
  line-height: 1.7;
}

.social-section {
  padding: 10px 0 90px;
}

.social-card {
  display: block;
  border: 1px solid rgba(44, 44, 44, 0.12);
  padding: 18px 20px;
  background-color: #f3f0e7;
  text-decoration: none;
  color: var(--dark-gray);
  transition: background-color 0.25s ease, transform 0.18s ease,
    box-shadow 0.18s ease;
}

.social-card:hover {
  background-color: #e2dfd5;
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
}

.social-label {
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.7;
}

.social-handle {
  margin-top: 6px;
  font-family: var(--font-display);
  font-size: 1.4rem;
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
  .hero {
    padding-top: 60px;
  }

  .hero-title {
    font-size: 2.4rem;
  }
}
</style>


