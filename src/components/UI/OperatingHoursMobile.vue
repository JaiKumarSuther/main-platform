<script setup>
defineProps({
  name: String,
  hours: String
})
</script>

<template>
  <div class="open-hours-mobile">
    <div class="open-hours-card">
      <h3>Operating hours for <strong>{{ name }}</strong></h3>
      <p>{{ hours }}</p>
    </div>
  </div>
</template>
