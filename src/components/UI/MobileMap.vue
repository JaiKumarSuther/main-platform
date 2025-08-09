<script setup>
const props = defineProps({
  mapSrc: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    default: '600'
  },
  height: {
    type: [String, Number],
    default: '450'
  }
});
</script>

<template>
  <div class="mobile-map">
    <div class="map">
      <iframe
        :src="mapSrc"
        :width="width"
        :height="height"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
