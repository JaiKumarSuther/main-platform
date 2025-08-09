<script setup>
import img0 from '@/assets/images/included-icon.svg'
import img1 from '@/assets/images/not-included-icon.svg'

defineProps({
  includedItems: {
    type: Array,
    default: () => ['Helmet', 'Box', 'Side Bags', 'Spare Tire']
  },
  notIncludedItems: {
    type: Array,
    default: () => ['Insurance', 'Additional Services', 'Fuel']
  }
})
</script>

<template>
  <div class="whats-included">
    <h2>What's Included</h2>
    <ul class="included-list">
      <li
        v-for="(item, index) in includedItems"
        :key="'included-' + index"
        class="included"
      >
        <img :src="img0" alt="" /> {{ item }}
      </li>
      <li
        v-for="(item, index) in notIncludedItems"
        :key="'not-included-' + index"
        class="not-included"
      >
        <img :src="img1" alt="" /> {{ item }}
      </li>
    </ul>
  </div>
</template>
