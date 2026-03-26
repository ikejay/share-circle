<script lang="ts" setup>
import { Package } from '@lucide/vue'
import { ref } from 'vue'

const leftDrawerOpen = ref<boolean>( false )

function toggleLeftDrawer() {
  leftDrawerOpen.value = ! leftDrawerOpen.value
}

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
        <q-btn
          outline
          rounded
          no-caps
          unelevated
          class="text-primary"
        >
          Login
        </q-btn>
        <q-btn
          class="browse-btn bg-primary"
          @click="$router.push('/auth')"
          no-caps
          unelevated
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
