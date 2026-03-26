<template>
  <q-page-container>
    <q-page>

      <!-- Hero -->
      <section class="hero-section">
        <div class="section-wrapper">
          <div class="hero-grid">
            <div class="hero__text">
              <h1 class="hero-title">Share Items,<br/>Build Community</h1>
              <p class="hero-subtitle">
                Connect with friends and neighbors to lend and borrow everyday items.
                Save money, reduce waste, and strengthen your community.
              </p>
              <div class="hero-actions">
                <router-link to="/signup">
                  <q-btn color="primary" no-caps unelevated size="lg">
                    Start Sharing <ArrowRight class="q-ml-xs" size="18" />
                  </q-btn>
                </router-link>
                <q-btn outline no-caps size="lg" color="dark">Watch Demo</q-btn>
              </div>
              <div class="hero-stats">
                <div class="stat">
                  <span class="stat-number">10K+</span>
                  <p class="stat-label">Active Users</p>
                </div>
                <div class="stat">
                  <span class="stat-number">50K+</span>
                  <p class="stat-label">Items Shared</p>
                </div>
                <div class="stat">
                  <span class="stat-number">98%</span>
                  <p class="stat-label">Satisfaction</p>
                </div>
              </div>
            </div>
            <div class="hero-images">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" alt="Power tools" class="hero-img hero-img--1" />
              <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop" alt="Camera equipment" class="hero-img hero-img--2" />
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop" alt="Books" class="hero-img hero-img--3" />
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" alt="Garden tools" class="hero-img hero-img--4" />
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features-section">
        <div class="section-wrapper">
          <div class="section-header">
            <h2>Why ShareCircle?</h2>
            <p>A smarter way to access the things you need without buying everything</p>
          </div>
          <div class="features-grid">
            <q-card flat class="feature-card">
              <q-card-section class="text-center">
                <div class="feature-icon feature-icon--blue">
                  <Package size="32" color="#1A9E78" />
                </div>
                <h3>Save Money</h3>
                <p>Borrow items you need occasionally instead of buying them</p>
              </q-card-section>
            </q-card>
            <q-card flat class="feature-card">
              <q-card-section class="text-center">
                <div class="feature-icon feature-icon--green">
                  <Users size="32" color="#34C992" />
                </div>
                <h3>Build Community</h3>
                <p>Connect with neighbors and strengthen local relationships</p>
              </q-card-section>
            </q-card>
            <q-card flat class="feature-card">
              <q-card-section class="text-center">
                <div class="feature-icon feature-icon--purple">
                  <Shield size="32" color="#9333ea" />
                </div>
                <h3>Stay Secure</h3>
                <p>Share only with trusted connections in your network</p>
              </q-card-section>
            </q-card>
            <q-card flat class="feature-card">
              <q-card-section class="text-center">
                <div class="feature-icon feature-icon--amber">
                  <Clock size="32" color="#d97706" />
                </div>
                <h3>Save Time</h3>
                <p>Quick requests and easy tracking of borrowed items</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-section">
        <div class="section-wrapper">
          <div class="section-header">
            <h2>How It Works</h2>
            <p>Get started in three simple steps</p>
          </div>
          <div class="steps-grid">
            <div class="step">
              <div class="step-number">1</div>
              <h3>Connect</h3>
              <p>Invite friends, family, and neighbors to join your sharing circle</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>Share</h3>
              <p>List items you're willing to lend and browse what others offer</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>Borrow</h3>
              <p>Request items, coordinate pickup, and return when done</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="categories-section">
        <div class="section-wrapper">
          <div class="section-header">
            <h2>What Can You Share?</h2>
            <p>From power tools to party supplies, share almost anything</p>
          </div>
          <div class="categories-grid">
            <q-card v-for="category in categories" :key="category" bordered class="category-card">
              <q-card-section class="text-center">
                <p class="text-weight-medium q-mb-none">{{ category }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>

      <!-- Trust & Safety -->
      <section class="trust-section">
        <div class="section-wrapper">
          <div class="trust-grid">
            <div>
              <h2 class="trust-title">Safe & Trustworthy Sharing</h2>
              <p class="trust-subtitle">
                Your peace of mind is our priority. ShareCircle is built on trust and transparency.
              </p>
              <div class="trust-list">
                <div v-for="feature in trustFeatures" :key="feature" class="trust-item">
                  <div class="trust-check">
                    <Check size="16" color="#34C992" />
                  </div>
                  <p>{{ feature }}</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1580849279061-0179c4ebf14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBzaGFyaW5nfGVufDF8fHx8MTc3NDQwNzIyNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Community sharing"
                class="trust-image"
              />
            </div>
          </div>
        </div>
      </section>

    </q-page>
  </q-page-container>
</template>

<script setup lang="ts">
import { ArrowRight, Package, Users, Shield, Clock, Check } from '@lucide/vue'

const categories = ['Power Tools', 'Books', 'Sports Gear', 'Kitchen Items', 'Garden Tools', 'Electronics']

const trustFeatures = [
  'Share only with verified connections',
  'Track item condition before and after',
  'Set your own lending terms',
  'Built-in reminder system',
  'Community ratings and reviews',
]
</script>

<style lang="sass">
.section-wrapper
  max-width: 1400px
  margin: 0 auto
  padding: 0 48px

  @media (max-width: 768px)
    padding: 0 24px

.section-header
  text-align: center
  margin-bottom: 64px

  h2
    font-size: 2.25rem
    font-weight: 700
    margin-bottom: 16px

  p
    font-size: 1.25rem
    color: #6b7280
    max-width: 600px
    margin: 0 auto

// Hero
.hero-section
  padding: 80px 0 120px

.hero-grid
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 48px
  align-items: center

  @media (max-width: 768px)
    grid-template-columns: 1fr

.hero-title
  font-size: 3.5rem
  font-weight: 700
  line-height: 1.1
  margin-bottom: 24px

  @media (max-width: 768px)
    font-size: 2.25rem

.hero-subtitle
  font-size: 1.25rem
  color: #6b7280
  margin-bottom: 32px
  line-height: 1.75

.hero-actions
  display: flex
  gap: 16px
  margin-bottom: 32px

  @media (max-width: 480px)
    flex-direction: column

.hero-stats
  display: flex
  gap: 32px

.stat-number
  font-size: 1.75rem
  font-weight: 700

.stat-label
  font-size: 0.875rem
  color: #6b7280
  margin: 0

.hero-images
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 16px

  @media (max-width: 768px)
    display: none

.hero-img
  width: 100%
  border-radius: 16px
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12)

.hero-img--2
  margin-top: 32px

.hero-img--3
  margin-top: -32px

// Features
.features-section
  background: #f9fafb
  padding: 80px 0

.features-grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 32px

  @media (max-width: 1024px)
    grid-template-columns: repeat(2, 1fr)

  @media (max-width: 480px)
    grid-template-columns: 1fr

.feature-card
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08) !important
  border-radius: 12px !important

  h3
    font-size: 1.125rem
    font-weight: 600
    margin-bottom: 8px

  p
    color: #6b7280
    margin: 0

.feature-icon
  width: 64px
  height: 64px
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  margin: 0 auto 16px

  &--blue
    background: #d1fae5

  &--green
    background: #dcfce7

  &--purple
    background: #f3e8ff

  &--amber
    background: #fef3c7

// How It Works
.how-section
  padding: 80px 0

.steps-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 48px
  text-align: center

  @media (max-width: 768px)
    grid-template-columns: 1fr

.step-number
  width: 64px
  height: 64px
  background: var(--q-primary)
  color: white
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  font-size: 1.5rem
  font-weight: 700
  margin: 0 auto 16px

.step
  h3
    font-size: 1.25rem
    font-weight: 600
    margin-bottom: 12px

  p
    color: #6b7280

// Categories
.categories-section
  background: #f9fafb
  padding: 80px 0

.categories-grid
  display: grid
  grid-template-columns: repeat(6, 1fr)
  gap: 16px

  @media (max-width: 1024px)
    grid-template-columns: repeat(3, 1fr)

  @media (max-width: 480px)
    grid-template-columns: repeat(2, 1fr)

.category-card
  cursor: pointer
  transition: border-color 0.2s

  &:hover
    border-color: var(--q-primary) !important

// Trust & Safety
.trust-section
  padding: 80px 0

.trust-grid
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 48px
  align-items: center

  @media (max-width: 768px)
    grid-template-columns: 1fr

.trust-title
  font-size: 2.25rem
  font-weight: 700
  margin-bottom: 24px

.trust-subtitle
  font-size: 1.25rem
  color: #6b7280
  margin-bottom: 32px

.trust-list
  display: flex
  flex-direction: column
  gap: 16px

.trust-item
  display: flex
  align-items: flex-start
  gap: 12px

  p
    color: #374151
    margin: 0

.trust-check
  width: 24px
  height: 24px
  min-width: 24px
  background: #dcfce7
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center

.trust-image
  width: 100%
  border-radius: 16px
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16)
</style>
