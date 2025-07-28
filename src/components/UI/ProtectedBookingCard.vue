<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '/images/protec.svg' // ensure this path is correct (from /public)
  },
  title: {
    type: String,
    default: 'Protected booking'
  },
  message: {
    type: String,
    default:
      "In case of issues, we've got your back. We'll intervene and protect your money."
  }
});
</script>

<template>
  <div class="protected-bookings-card">
    <h3>
      <img :src="icon" alt="Protection Icon" />
      {{ title }}
    </h3>
    <p>{{ message }}</p>
  </div>
</template>
