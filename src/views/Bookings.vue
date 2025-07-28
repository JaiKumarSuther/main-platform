<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';

const route = useRoute();
const booking = ref(null);
const loading = ref(true);
const error = ref('');

const fetchBooking = async () => {
  const bookingId = route.params.id;
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get(`/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('📦 Booking API Response:', res.data); // ✅ Log the full response
    booking.value = res.data;
  } catch (err) {
    error.value = 'Failed to load booking details.';
    console.error('❌ Booking API Error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBooking();
});
</script>


<template>
  <div class="mybooking-details" v-if="booking">
    <h2>Booking Detail</h2>

    <div class="section">
      <div class="booking-name">
        <span class="label tour">Tour</span>
        <h3>{{ booking.listing?.title || 'Tour Title' }}</h3>
      </div>
      <div class="booking-info">
        <span class="info">Booking ID:</span>
        <a href="#"> {{ booking.booking_id }}</a>
      </div>
      <div class="booking-info">
        <span class="info">Date:</span>
        <span>
          {{ new Date(booking.selected_date).toLocaleDateString() }}
          <small class="time">{{ new Date(booking.selected_date).toLocaleTimeString() }}</small>
        </span>
      </div>
      <div class="booking-info">
        <span class="info">Amount:</span>
        <span>{{ booking.total_price.toLocaleString() }}</span>
      </div>
      <div class="booking-info">
        <span class="info">Status:</span>
        <span class="status pending">{{ booking.booking_status }}</span>
      </div>
      <div class="booking-info">
        <span class="info">Payment Method:</span>
        <span> Credit / Debit Card </span>
      </div>
    </div>

    <div class="section">
      <h2>Booking Information</h2>
      <div class="booking-info">
        <span class="info">Type:</span>
        <span> Group Trek </span>
      </div>
      <div class="booking-info">
        <span class="info">People:</span>
        <span> {{ booking.selected_people }} People</span>
      </div>
      <div class="booking-info">
        <span class="info">Departure Date:</span>
        <span>{{ new Date(booking.selected_date).toLocaleDateString() }}</span>
      </div>
      <div class="booking-info">
        <span class="info">Duration:</span>
        <span> {{ booking.days_nights }} Days</span>
      </div>
      <div class="booking-info">
        <span class="info">Operator:</span>
        <span>{{ booking.partner?.full_name || 'N/A' }}</span>
      </div>
      <div class="booking-info">
        <span class="info">Add Ons:</span>
        <span>{{ (booking.selected_add_ons || []).join(', ') }}</span>
      </div>
    </div>

    <div class="section">
      <h2>Payment Information</h2>
      <div v-for="(addon, index) in booking.selected_add_ons" :key="index" class="booking-info">
        <span class="info">{{ addon }}</span>
        <span>Rs --</span>
      </div>
      <div class="bookingDetails-total">
        <p class="total">Total Payment</p>
        <span>Rs {{ booking.total_price.toLocaleString() }}</span>
      </div>
    </div>

    <div class="actions">
      <button class="btn primary">send a message</button>
      <button id="cancelBtn" class="btn danger">cancel my booking</button>
    </div>
  </div>

  <div v-else-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
</template>
