<template>
  <div class="highlights">
    <h2>Highlights</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <img src="@/assets/images/highlight-icon.svg" alt="Highlight icon" />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>
