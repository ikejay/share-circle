<script setup lang="ts">
import AppHeader from 'layouts/components/main/AppHeader.vue'
import { ref } from 'vue'


const links1 = ref(
   [
  { icon: 'home', text: 'Home' },
  { icon: 'whatshot', text: 'Trending' },
  { icon: 'subscriptions', text: 'Subscriptions' }
],
)

const leftDrawerOpen = ref(false)
</script>

<template>
  <q-layout>
    <AppHeader />
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="sass">
</style>
