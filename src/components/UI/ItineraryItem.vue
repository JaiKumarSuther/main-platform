<template>
  <li class="itinerary-item">
    <span class="dot"></span>
    <strong>{{ label }}</strong>
    {{ content }}
    <img :src="isOpen ? toggleUpIcon : toggleDownIcon" alt="Toggle Icon" class="toggle-icon" @click="isOpen = !isOpen" />
    <div v-if="isOpen" class="answer">
      <p>{{ details }}</p>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  content: String,
  details: String,
  toggleUpIcon: String,
  toggleDownIcon: String,
});

const isOpen = ref(false);
</script>
