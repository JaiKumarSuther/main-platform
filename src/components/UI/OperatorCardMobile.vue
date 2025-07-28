<script setup>
defineProps({
  logo: String,
  name: String,
  rating: String,
  reviewScore: String,
  reviewCount: String
})
</script>

<template>
  <div class="operator-card-mobile">
    <div class="operator-card">
      <div class="operator-info">
        <img :src="logo" :alt="`${name} Logo`" class="operator-logo" />
        <div class="operator-details">
          <p class="operated-by">rental by</p>
          <div class="rating">
            <h2 class="operator-name">{{ name }}</h2>
            <div class="rating-badge">
              <span class="rating-icon">
                <img src="@/assets/images/ninja-face-rating.svg" alt="rating icon" />
              </span>
              <span class="rating-score">{{ rating }}</span>
            </div>
          </div>
          <div class="review-section">
            <span class="star-icon">
              <img src="@/assets/images/review-icon.svg" alt="star icon" />
            </span>
            <span class="review-score">{{ reviewScore }}</span>
            <span class="review-text">{{ reviewCount }} reviews</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
