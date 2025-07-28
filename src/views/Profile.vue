<script setup>
import Sidebar from "../components/UI/Sidebar.vue";
</script>

<template>
  <div class="profile-container">
    <h1 class="title">My Profile</h1>
    <div class="profile-wrapper">
      <Sidebar />
      <router-view /> <!-- Shows nested route content -->
    </div>
  </div>
</template>
