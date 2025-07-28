<script setup>
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
      <h3><img src="@/assets/images/protec.svg" alt="" /> {{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
