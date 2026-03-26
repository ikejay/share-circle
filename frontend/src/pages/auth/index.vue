<script setup lang="ts">
</script>

<template>
  <div class="auth-card">
    <div class="auth-card__header">
      <h3>Welcome to ShareCircle</h3>
      <p>Sign in or create an account in seconds</p>
    </div>

    <div class="auth-card__actions">
      <button class="social-btn social-btn--google">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
        <span>Continue with Google</span>
      </button>

      <button class="social-btn social-btn--apple">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <span>Continue with Apple</span>
      </button>
    </div>

    <p class="auth-card__terms">
      By continuing, you agree to our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
    </p>
  </div>
</template>

<style scoped lang="sass">
.auth-card
  width: 100%
  max-width: 380px

.auth-card__header
  margin-bottom: 32px

  h3
    font-size: 1.625rem
    font-weight: 700
    margin-bottom: 8px
    color: #1D1D1D

  p
    color: #6b7280
    font-size: 0.9375rem

.auth-card__actions
  display: flex
  flex-direction: column
  gap: 12px
  margin-bottom: 24px

.social-btn
  display: flex
  align-items: center
  justify-content: center
  gap: 12px
  width: 100%
  padding: 12px 20px
  border-radius: 10px
  font-size: 0.9375rem
  font-weight: 500
  cursor: pointer
  transition: background 0.15s, box-shadow 0.15s
  border: none

  &--google
    background: white
    color: #1D1D1D
    border: 1.5px solid #e5e7eb
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06)

    &:hover
      background: #f9fafb
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

  &--apple
    background: #1D1D1D
    color: white

    &:hover
      background: #111

.auth-card__terms
  text-align: center
  font-size: 0.8125rem
  color: #9ca3af
  line-height: 1.5

  a
    color: #1A9E78
    text-decoration: none

    &:hover
      text-decoration: underline
</style>
