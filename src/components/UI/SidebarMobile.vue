<script setup>
import slide1 from '@/assets/images/bike.png'
</script>

<template>
  <div class="slider-mobile">
    <img class="slide" :src="slide1" alt="Slide 1" />

    <!-- Arrows -->
    <div class="arrow left">&#10094;</div>
    <div class="arrow right">&#10095;</div>

    <!-- Dots -->
    <div class="dots">
      <div class="dot active"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>
