<script setup>
import img0 from '@/assets/images/people-icon-select-details.svg'
import img1 from '@/assets/images/bed-icon.svg'
import img2 from '@/assets/images/room-size-icon.svg'
import img3 from '@/assets/images/free-cancellation-icon.svg'

defineProps({
  image: String,
  title: String,
  sleeps: String,
  bedType: String,
  roomSize: String,
  cancellationDate: String,
  price: String,
  nights: String,
  note: String
})
</script>

<template>
  <div class="room-card">
    <div class="image-slider">
      <img :src="image" :alt="title" />
    </div>
    <div class="room-info">
      <h3>{{ title }}</h3>

      <div class="info">
        <div class="info-content">
          <img :src="img0" alt="" />
          <p>{{ sleeps }}</p>
        </div>
      </div>

      <div class="info">
        <div class="info-content">
          <img :src="img1" alt="" />
          <p>{{ bedType }}</p>
        </div>
      </div>

      <div class="info">
        <div class="info-content">
          <img :src="img2" alt="" />
          <p>{{ roomSize }}</p>
        </div>
      </div>

      <p class="cancellation">
        <img :src="img3" alt="" />
        Free cancellation until <span class="highlight">{{ cancellationDate }}</span>
      </p>

      <p class="price">{{ price }} <span>({{ nights }} nights)</span></p>
      <p class="note">{{ note }}</p>
    </div>
  </div>
</template>
