<template>
  <div class="loading-container" :class="{ overlay: overlay }">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  overlay: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 200px;
}

.loading-container.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  padding: 0;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.loading-message {
  color: #666;
  font-size: 14px;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Different sizes */
.loading-spinner.small .spinner {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.loading-spinner.large .spinner {
  width: 60px;
  height: 60px;
  border-width: 6px;
}

/* Different colors */
.loading-spinner.primary .spinner {
  border-top-color: #007bff;
}

.loading-spinner.success .spinner {
  border-top-color: #28a745;
}

.loading-spinner.warning .spinner {
  border-top-color: #ffc107;
}

.loading-spinner.danger .spinner {
  border-top-color: #dc3545;
}
</style>

