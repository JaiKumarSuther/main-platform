<script setup>
defineProps({
  title: {
    type: String,
    default: 'Operating hours',
  },
  hours: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="open-hours-card">
    <h3>{{ title }}</h3>
    <p>{{ hours }}</p>
  </div>
</template>
