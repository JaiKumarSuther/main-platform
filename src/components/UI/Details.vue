<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // Each item: { label: 'Model', value: '2017', icon: '@/assets/images/vehicmode.svg' }
  }
})
</script>

<template>
  <div class="details">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="detail-item"
    >
      <img :src="item.icon" :alt="item.label" width="16" />
      <div class="detail-text">
        <strong>{{ item.label }}</strong>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
