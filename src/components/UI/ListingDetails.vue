<script setup>
import locationIcon from '@/assets/images/location-icon.svg'
import saveIcon from '@/assets/images/save-icon-listing-page-header.svg'
import shareIcon from '@/assets/images/share-icon.svg'

defineProps({
  title: String,
  price: String,
  location: String,
  mainImage: String,
  galleryImages: Array,
  priceSuffix: {
    type: String,
    default: '/day'
  }
})
</script>

<template>
  <div class="listing-details">
    <div class="listing-header">
      <section class="listing-header-details">
        <h1>{{ title }}</h1>
        <p>
          From <span class="price">{{ price }}</span>
          <small>{{ priceSuffix }}</small>
        </p>
      </section>
      <span class="location-mobile">
        <img :src="locationIcon" alt="Location" />
        {{ location }}
      </span>
      <section class="listing-header-icons">
        <div class="icon">
          <img :src="saveIcon" alt="Save" />
        </div>
        <div class="icon">
          <img :src="shareIcon" alt="Share" />
        </div>
      </section>
    </div>

    <section class="gallery">
      <div class="main-image">
        <img :src="mainImage" alt="Main Tour Image" />
      </div>
      <div class="side-images">
        <img
          v-for="(img, index) in galleryImages"
          :key="index"
          :src="img"
          :alt="'Image ' + (index + 1)"
        />
      </div>
    </section>
  </div>
</template>
