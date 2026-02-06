<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            aria-label="Menu"
            dense
            flat
            icon="menu"
            round
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
            Base Shop
          </q-toolbar-title>
          <div>v1.0.0</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        :breakpoint="500"
        bordered
        class="bg-grey-1"
        show-if-above
      >
        <q-list>
          <q-item-label header>Mitarbeiter Dashboard</q-item-label>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item v-ripple :to="menuItem.route" active-class="text-primary" clickable>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ menuItem.label }}</q-item-label>
              </q-item-section>
              <q-item-section v-if="menuItem.label==='Products'" id="save"></q-item-section>
            </q-item>
            <q-separator v-if="menuItem.seperator" :key="'sep' + index"/>
          </template>

        </q-list>
      </q-drawer>
      <q-page-container class="no-padding">
        <q-page padding>
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TRouteMenuItem } from '../types'
import { menuItems } from './menu-items'

type IData = {
  leftDrawerOpen: boolean,
  menuList: TRouteMenuItem[]
}

export default defineComponent( {
  name: 'MainLayout',

  data(): IData {
    return {
      leftDrawerOpen: false,
      menuList: menuItems,
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = ! this.leftDrawerOpen
    },
  },
} )
</script>
