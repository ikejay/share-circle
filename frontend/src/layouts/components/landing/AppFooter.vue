<script lang="ts" setup>

import { Package } from '@lucide/vue'
</script>

<template>
  <div class="container">
    <div class="pre-footer">
      <div class="wrapper flex column items-center">
        <h3 class="text-white">Ready to Start Sharing?</h3>
        <p class="text-white">Join thousands of community members already saving money and building connections</p>
        <q-btn
          color="white"
          no-caps
          text-color="primary"
          unelevated
        >
          Create Your Free Account
        </q-btn>
      </div>
    </div>
    <div class="post-footer text-white">
      <div class="q-pa-lg">
        <div class="logo">
          <div class="icon-wrapper">
            <Package/>
          </div>
          <div class="label-wrapper">
            <p class="q-ml-xs text-weight-bold q-mb-none">ShareCircle</p>
          </div>
        </div>
        <p>
          Building stronger communities through trusted sharing.
        </p>
      </div>
      <div class="q-pa-lg">
        <div class="logo">
          <div class="label-wrapper">
            <p class="text-weight-bold q-mb-none">Product</p>
          </div>
        </div>
        <p>
          Features
        </p>
        <p>
          How it works
        </p>
        <p>
          Pricing
        </p>
      </div>
      <div class="q-pa-lg">
        <div class="logo">
          <div class="label-wrapper">
            <p class="text-weight-bold q-mb-none">Product</p>
          </div>
        </div>
        <p>
          About Us
        </p>
        <p>
          Blog
        </p>
        <p>
          Contact
        </p>
      </div>
      <div class="q-pa-lg">
        <div class="logo">
          <div class="label-wrapper">
            <p class="text-weight-bold q-mb-none">Product</p>
          </div>
        </div>
        <p>
          Privacy
        </p>
        <p>
          Terms of Service
        </p>
        <p>
          Cookie Policy
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.container
  height: 500px
  width: 100%

.pre-footer
  display: flex
  width: 100%
  justify-content: center
  align-items: center
  height: 300px
  background-color: var(--q-primary)

.wrapper
  width: 100%
  max-width: 1400px


.post-footer
  height: 200px
  background-color: var(--q-accent)
  display: grid
  grid-template-columns: repeat(4, 1fr)


.logo
  display: flex
  margin-bottom: 10px
</style>
