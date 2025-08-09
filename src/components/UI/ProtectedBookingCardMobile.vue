<script setup>
import img0 from '@/assets/images/protec.svg'

defineProps({
  title: {
    type: String,
    default: 'Protected booking'
  },
  description: {
    type: String,
    default:
      "In case of issues, we've got your back. We'll intervene and protect your money."
  }
})
</script>

<template>
  <div class="protected-bookings-mobile">
    <div class="protected-bookings-card">
      <h3><img :src="img0" alt="" /> {{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
