<template>
  <div class="highlights">
    <h2>Highlights</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <img :src="img0" alt="Highlight icon" />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import img0 from '@/assets/images/highlight-icon.svg'

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>
