<template>
  <div class="itinerary">
    <h2>{{ title }}</h2>
    <ul class="itinerary-list">
      <ItineraryItem
        v-for="(item, i) in items"
        :key="i"
        :label="item.label"
        :content="item.content"
        :details="item.details"
        toggleUpIcon="@/assets/images/toggle-up.svg"
        toggleDownIcon="@/assets/images/dropdown-toggle.svg"
      />
    </ul>
  </div>
</template>

<script setup>
import ItineraryItem from './ItineraryItem.vue';

const props = defineProps({
  title: String,
  items: Array,
});
</script>