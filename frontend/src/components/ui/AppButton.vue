<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disable?: boolean
  fullWidth?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const variantProps = computed(() => ({
  primary: { color: 'primary' },
  outline: { outline: true, color: 'primary' },
  ghost:   { flat: true,    color: 'primary' },
}[props.variant]))
</script>

<template>
  <q-btn
    v-bind="variantProps"
    no-caps
    unelevated
    :loading="loading"
    :disable="disable"
    :full-width="fullWidth"
    :to="to"
    :type="type"
    :class="['app-btn', `app-btn--${variant}`, `app-btn--${size}`]"
  >
    <slot />
  </q-btn>
</template>

<style lang="sass" scoped>
.app-btn
  border-radius: 8px
  font-weight: 500
  letter-spacing: 0

  &--sm
    font-size: 0.8125rem
    padding: 4px 14px

  &--md
    font-size: 0.9375rem
    padding: 8px 20px

  &--lg
    font-size: 1.0625rem
    padding: 12px 28px

  &--primary
    background: linear-gradient(135deg, #1FAD84 0%, #0D7A5A 100%) !important

  &--outline
    border-width: 1.5px

  &--ghost
    &:hover
      background: rgba(26, 158, 120, 0.08) !important
</style>
