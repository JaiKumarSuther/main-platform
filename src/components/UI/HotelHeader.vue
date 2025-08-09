<script setup>
import img0 from '@/assets/images/location-icon.svg'

import Map from './Map.vue'

defineProps({
  location: String,
  mapUrl: String,
  amenitiesList1: {
    type: Array,
    default: () => []
  },
  amenitiesList2: {
    type: Array,
    default: () => []
  },
  checkInTime: String,
  checkOutTime: String
})
</script>

<template>
  <div class="header">
    <span class="location">
      <img :src="img0" alt="" />
      {{ location }}
    </span>
  </div>

  <div class="hotel-header">
    <div class="amenities">
      <h2>Amenities <span> at the property</span></h2>
      <div class="amenities-list">
        <ul>
          <li v-for="(item, index) in amenitiesList1" :key="index">
            <img :src="item.icon" alt="" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <ul>
          <li v-for="(item, index) in amenitiesList2" :key="index">
            <img :src="item.icon" alt="" />
            <span>{{ item.label }}</span>
          </li>
          <li><a class="view-all" href="">view all amenities</a></li>
        </ul>
      </div>

      <div class="check-in">
        <ul>
          <li>Check-in time: <span>{{ checkInTime }}</span></li>
          <li>Check-out time: <span>{{ checkOutTime }}</span></li>
        </ul>
      </div>
    </div>

    <Map :map-url="mapUrl" />
  </div>
</template>
