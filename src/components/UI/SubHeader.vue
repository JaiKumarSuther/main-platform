<script setup>
import img0 from '@/assets/images/location-icon.svg'

defineProps({
  location: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header">
    <span class="location">
      <img :src="img0" alt="" /> {{ location }}
    </span>
  </div>
</template>
