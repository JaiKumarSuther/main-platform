<template>
  <div class="not-found-container">
    <h1 class="not-found-title">404 - Page Not Found</h1>
    <p class="not-found-message">
      Sorry, the page you're looking for doesn't exist.
    </p>
    <router-link to="/" class="home-link">
      Go back to Home
    </router-link>
  </div>
</template>

<script setup>
// No logic needed
</script>

<style>
.not-found-container {
  text-align: center;
  padding: 100px 20px;
}

.not-found-title {
  font-size: 32px;
  font-weight: bold;
  color: red;
}

.not-found-message {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}

.home-link {
  display: inline-block;
  margin-top: 30px;
  color: #007bff;
  text-decoration: underline;
  font-size: 16px;
}
</style>
