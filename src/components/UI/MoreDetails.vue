<script setup>
import { ref } from 'vue'

// === Import static icons ===
import infoIcon from '@/assets/images/important-information-icon.svg'
import toggleUpIcon from '@/assets/images/toggle-up.svg'
import toggleDownIcon from '@/assets/images/dropdown-toggle.svg'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="more-details">
    <h2>More details</h2>
    <ul class="more-details-list">
      <li v-for="(item, index) in items" :key="index">
        <div class="more-details-item" @click="toggle(index)">
          <img :src="infoIcon" alt="Info" width="16" />
          <div class="more-detail-text">
            <p>{{ item.title }}</p>
          </div>
          <img
            :src="openIndex === index ? toggleUpIcon : toggleDownIcon"
            alt="Toggle Icon"
            class="toggle-icon"
          />
        </div>
        <div v-if="openIndex === index" class="more-details-description">
          <p>{{ item.text }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.more-details-description {
  padding: 0.5rem 2rem;
  font-size: 0.95rem;
  color: #444;
}
.more-details-item {
  cursor: pointer;
}
</style>
