<template>
  <div v-if="showModal" id="review-popup" class="leave-review-popup-overlay">
    <div class="popup-content">
      <div class="review-header">
        <h2>Leave a review</h2>
        <svg
          class="close-btn"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="closeModal"
        >
          <circle cx="50" cy="50" r="45" stroke="#5A6783" stroke-width="4" />
          <line
            x1="35"
            y1="35"
            x2="65"
            y2="65"
            stroke="#5A6783"
            stroke-width="4"
            stroke-linecap="round"
          />
          <line
            x1="65"
            y1="35"
            x2="35"
            y2="65"
            stroke="#5A6783"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="thankyou-message">
        <img
          :src="img0"
          alt=""
        />
        <h3>Thank you for sharing your experience!</h3>
        <p>
          Your review helps fellow travelers and strengthens our global travel
          community.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import img0 from '@/assets/images/celebration-party-winter-svgrepo-com.svg'

export default {
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
