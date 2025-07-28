<script setup>
defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  logoAlt: { type: String, default: 'Operator logo' },
  rating: { type: Number, required: true },
  reviewScore: { type: Number, required: true },
  totalReviews: { type: [Number, String], required: true }
});
</script>

<template>
  <div class="operator-card">
    <div class="operator-info">
      <img :src="image" :alt="logoAlt" class="operator-logo" />
      <div class="operator-details">
        <p class="operated-by">Rental by</p>
        <div class="rating">
          <h2 class="operator-name">{{ name }}</h2>
          <div class="rating-badge">
            <span class="rating-icon">
              <img src="@/assets/images/ninja-face-rating.svg" alt="Rating icon" />
            </span>
            <span class="rating-score">{{ rating }}</span>
          </div>
        </div>
        <div class="review-section">
          <span class="star-icon">
            <img src="@/assets/images/review-icon.svg" alt="Star rating icon" />
          </span>
          <span class="review-score">{{ reviewScore }}</span>
          <span class="review-text">{{ totalReviews }} reviews</span>
        </div>
      </div>
    </div>
  </div>
</template>
