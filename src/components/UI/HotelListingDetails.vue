<template>
  <div class="listing-details">
    <div class="listing-header">
      <section class="listing-header-details listing-hotel-details">
        <h1>{{ title }}</h1>
        <p>From <span class="price">{{ price }}</span></p>
      </section>
      <span class="location-mobile">
        <img :src="img0" alt="" />
        {{ location }}
      </span>
      <section class="listing-header-icons">
        <div class="icon">
          <img :src="img1" alt="" />
        </div>
        <div class="icon">
          <img :src="img2" alt="" />
        </div>
      </section>
    </div>

    <section class="gallery">
      <div class="main-image">
        <img :src="mainImage" alt="Main Image" />
      </div>
      <div class="side-images">
        <img
          v-for="(img, index) in galleryImages"
          :key="index"
          :src="img"
          :alt="`Image ${index + 1}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import img0 from '@/assets/images/location-icon.svg'
import img1 from '@/assets/images/save-icon-listing-page-header.svg'
import img2 from '@/assets/images/share-icon.svg'

defineProps({
  title: String,
  price: String,
  location: String,
  mainImage: String,
  galleryImages: {
    type: Array,
    default: () => [],
  },
});
</script>
