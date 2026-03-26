<script setup lang="ts">
import { Package } from '@lucide/vue'
</script>

<template>
  <q-layout>
    <q-page-container>
      <div class="auth-layout">

        <!-- Left Side -->
        <div class="auth-brand">
          <div class="auth-brand__inner">
            <div class="auth-brand__logo">
              <div class="logo-icon">
                <Package color="white" :size="24" />
              </div>
              <span class="logo-label">ShareCircle</span>
            </div>

            <div class="auth-brand__copy">
              <h2>Borrow more.<br/>Buy less.<br/>Connect more.</h2>
              <p>Join a community of neighbours sharing everyday items — from power drills to camping gear.</p>
            </div>

            <div class="auth-brand__stats">
              <div class="stat">
                <span class="stat__number">10K+</span>
                <span class="stat__label">Active Members</span>
              </div>
              <div class="stat">
                <span class="stat__number">50K+</span>
                <span class="stat__label">Items Shared</span>
              </div>
              <div class="stat">
                <span class="stat__number">98%</span>
                <span class="stat__label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: page content -->
        <div class="auth-content">
          <router-view />
        </div>

      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="sass">
.auth-layout
  display: grid
  grid-template-columns: 1fr 1fr
  min-height: 100vh

  @media (max-width: 768px)
    grid-template-columns: 1fr

// Brand panel
.auth-brand
  background: linear-gradient(160deg, #1FAD84 0%, #0D7A5A 100%)
  display: flex
  align-items: center
  justify-content: center
  padding: 48px

  @media (max-width: 768px)
    display: none

.auth-brand__inner
  max-width: 420px
  color: white

.auth-brand__logo
  display: flex
  align-items: center
  gap: 10px
  margin-bottom: 64px

.logo-icon
  width: 40px
  height: 40px
  background: rgba(255, 255, 255, 0.2)
  border-radius: 10px
  display: flex
  align-items: center
  justify-content: center

.logo-label
  font-size: 1.25rem
  font-weight: 700

.auth-brand__copy
  margin-bottom: 48px

  h2
    font-size: 2.25rem
    font-weight: 700
    line-height: 1.2
    margin-bottom: 16px
    color: white

  p
    font-size: 1.0625rem
    color: rgba(255, 255, 255, 0.8)
    line-height: 1.65

.auth-brand__stats
  display: flex
  gap: 32px
  padding-top: 32px
  border-top: 1px solid rgba(255, 255, 255, 0.2)

.stat
  display: flex
  flex-direction: column
  gap: 2px

  &__number
    font-size: 1.5rem
    font-weight: 700
    color: white

  &__label
    font-size: 0.8125rem
    color: rgba(255, 255, 255, 0.7)

// Right slot
.auth-content
  display: flex
  align-items: center
  justify-content: center
  padding: 48px
  background: white
</style>
