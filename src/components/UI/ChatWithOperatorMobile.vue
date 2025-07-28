<script setup>
defineProps({
  name: String
})
</script>

<template>
  <div class="chat-with-operator-mobile">
    <div class="chat-with-operator-card">
      <h3>
        <img src="@/assets/images/chat-after-booking.svg" alt="" />
        Chat with {{ name }}
      </h3>
      <p>
        You'll get access to direct chat after booking. Ask anything, confirm
        plans, stay connected.
      </p>
    </div>
  </div>
</template>
