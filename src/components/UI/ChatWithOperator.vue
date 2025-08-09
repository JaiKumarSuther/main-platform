<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '/images/chat-after-booking.svg'
  },
  title: {
    type: String,
    default: 'Chat with Pakistan Bikers'
  },
  message: {
    type: String,
    default:
      "You'll get access to direct chat after booking. Ask anything, confirm plans, stay connected."
  }
});
</script>

<template>
  <div class="chat-with-operator-card">
    <h3>
      <img :src="icon" alt="Chat Icon" />
      {{ title }}
    </h3>
    <p>{{ message }}</p>
  </div>
</template>
