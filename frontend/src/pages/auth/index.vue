<script lang="ts" setup>
import amazonLogo from 'src/assets/svg/amazon.svg'
import facebookLogo from 'src/assets/svg/facebook.svg'
import googleLogo from 'src/assets/svg/google.svg'
import microsoftLogo from 'src/assets/svg/microsoft.svg'


const onContinueWithGoogle = () => {
  window.location.href = 'http://localhost:3000/api/auth/google'
}
</script>

<template>
  <div class="auth-card">
    <div class="auth-card__header">
      <h3>Welcome to ShareCircle</h3>
      <p>Sign in or create an account in seconds</p>
    </div>

    <div class="auth-card__actions">

      <button
        class="social-btn social-btn--google"
        @click="onContinueWithGoogle"
      >
        <img :src="googleLogo" alt="Google" height="20" width="20"/>
        <span>Continue with Google</span>
      </button>

      <button class="social-btn social-btn--microsoft">
        <img :src="microsoftLogo" alt="Microsoft" height="20" width="20"/>
        <span>Continue with Microsoft</span>
      </button>

      <button class="social-btn social-btn--amazon">
        <img :src="amazonLogo" alt="Amazon" height="20" width="20"/>
        <span>Continue with Amazon</span>
      </button>

      <button class="social-btn social-btn--facebook">
        <img :src="facebookLogo" alt="Facebook" height="20" width="20"/>
        <span>Continue with Facebook</span>
      </button>

    </div>

    <p class="auth-card__terms">
      By continuing, you agree to our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
    </p>
  </div>
</template>

<style lang="sass" scoped>
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

  &--microsoft
    background: white
    color: #1D1D1D
    border: 1.5px solid #e5e7eb
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06)

    &:hover
      background: #f9fafb
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

  &--amazon
    background: #FF9900
    color: #1D1D1D

    &:hover
      background: #e68a00

  &--facebook
    background: #1877F2
    color: white

    &:hover
      background: #1464d4

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
