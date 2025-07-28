<template>
  <div class="summary">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  text: String
});
</script>