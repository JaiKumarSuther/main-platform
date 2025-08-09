<template>
  <div class="supportTicket-cont">
    <h2>What do you need help with?</h2>
    <form @submit.prevent="submitTicket">
      <div class="form-group">
        <label for="title">Write a descriptive title</label>
        <input
          v-model="form.subject"
          type="text"
          id="title"
          placeholder="I'm having trouble with..."
          maxlength="100"
          required
        />
      </div>
      <div class="form-group">
        <label for="related">Related to</label>
        <select v-model="form.related_to" id="related" required>
          <option value="">select</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical Issue</option>
          <option value="account">Account Access</option>
        </select>
      </div>
      <div class="form-group">
        <label for="issue">Explain the issue</label>
        <textarea
          v-model="form.description"
          id="issue"
          rows="5"
          placeholder=""
          required
        ></textarea>
      </div>

      <div class="attach-photo">
        <img :src="img0" alt="" width="20px" />
        attach photo
      </div>
    </form>
    <button class="open-ticket" type="submit" @click="submitTicket">
      open ticket
    </button>
  </div>
</template>

<script setup>
import img0 from '@/assets/images/upload-svgrepo-com.svg'

import { ref } from 'vue'
import api from '../api/axios' // Adjust path if needed

const form = ref({
  subject: '',
  related_to: '',
  description: '',
})

const submitTicket = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await api.post('/support', form.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('Ticket created:', response.data)
    alert('Ticket submitted successfully')
    // Reset form
    form.value.subject = ''
    form.value.related_to = ''
    form.value.description = ''
  } catch (error) {
    console.error('Error creating ticket:', error)
    alert('Failed to submit ticket')
  }
}
</script>
