<script lang="ts" setup>
import { Package } from '@lucide/vue'
import { useAuthUserStore } from 'stores/auth'
import { computed } from 'vue'

const authStore = useAuthUserStore()

const user = computed(() => {
  return authStore.user
})

const ownerInitials = computed(() => {
  return user.value?.displayName.charAt( 0 ).toUpperCase() ?? ''
})
</script>

<template>
  <q-header class="container">
    <div class="wrapper">
      <div class="logo">
        <div class="icon-wrapper">
          <Package/>
        </div>
        <div class="label-wrapper">
          <p class="main text-weight-bold q-mb-none">ShareCircle</p>
          <p class="sub text-weight-bold q-mb-none">Share & Borrow</p>
        </div>
      </div>
      <div class="actions">
        <q-avatar  class="q-mr-xs" color="primary" size="24px" text-color="white">
          <template v-if="user?.avatarUrl">
            <img :src="user.avatarUrl">
          </template>
          <template v-else>
            <h3>{{ ownerInitials }}</h3>
          </template>
        </q-avatar>
        <q-btn
          class="browse-btn bg-primary"
          no-caps
          unelevated
          @click="$router.push('/auth')"
        >
          Get Started
        </q-btn>
      </div>
    </div>
  </q-header>
</template>

<style lang="sass" scoped>
.container
  height: 60px
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  background: white
  opacity: 0.90
  position: sticky

.logo
  display: flex

.wrapper
  width: 100%
  max-width: 1400px
  display: flex
  justify-content: space-between

.icon-wrapper
  display: flex
  justify-content: center
  align-items: center
  height: 40px
  width: 40px
  padding: 10px
  border-radius: 12px
  background: linear-gradient(#34C992, #159B6E)

.browse-btn
  background: linear-gradient(135deg, #1FAD84 0%, #0D7A5A 100%) !important
  border-radius: 8px


.actions
  width: 200px
  height: 30px
  display: flex
  justify-content: space-between


.label-wrapper
  height: 30px
  margin-left: 10px

  .main
    color: black
    font-weight: bold
    font-size: 18px

  .sub
    color: gray
    font-size: 10px
</style>
