<script setup>
import { useRoute } from 'vue-router'
import Header from './components/UI/Header.vue'
import Footer from './components/UI/Footer.vue'

const route = useRoute()
</script>

<template>
  <div>
    <Header v-if="route.name !== 'NotFound'" />
    <router-view />
    <Footer v-if="route.name !== 'NotFound'" />
  </div>
</template>
