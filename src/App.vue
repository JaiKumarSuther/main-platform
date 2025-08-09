<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/UI/Footer.vue'
import Breadcrumb from './components/UI/Breadcrumb.vue'
import RouteTransition from './components/UI/RouteTransition.vue'

const route = useRoute()
</script>

<template>
  <div>
    <Header v-if="route.name !== 'NotFound'" />
    <Breadcrumb v-if="route.name !== 'NotFound' && route.name !== 'Login' && route.name !== 'SignUp'" />
    <RouteTransition>
      <router-view />
    </RouteTransition>
    <Footer v-if="route.name !== 'NotFound'" />
  </div>
</template>
