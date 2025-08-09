<script setup>
import RoomCard from "./RoomCard.vue";

const rooms = [
  { title: "Deluxe Room", image: "@/assets/images/hotel1.jpg" },
  { title: "Deluxe Room", image: "@/assets/images/avatar.png" },
  { title: "Deluxe Room", image: "@/assets/images/avatar.png" },
  { title: "Deluxe Room", image: "@/assets/images/avatar.png" }
];
</script>

<template>
  <div class="room-list">
    <RoomCard v-for="(room, index) in rooms" :key="index" :title="room.title" :image="room.image" />
  </div>
</template>
