<script setup>
import img0 from '@/assets/images/chat-icon.svg'

defineProps({
  name: String
})
</script>

<template>
  <div class="chat-with-operator-mobile">
    <div class="chat-with-operator-card">
      <h3>
        <img :src="img0" alt="" />
        Chat with {{ name }}
      </h3>
      <p>
        You'll get access to direct chat after booking. Ask anything, confirm
        plans, stay connected.
      </p>
    </div>
  </div>
</template>
