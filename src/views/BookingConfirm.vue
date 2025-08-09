<script setup>
import ninjaLogo from '@/assets/images/ninja-logo.svg'
import checkboxIcon from '@/assets/images/checkbox-icon.svg'
import messagesIcon from '@/assets/images/messages-icon.svg'
import needHelpIcon from '@/assets/images/need-help.svg'
import hunzaGalleryImg1 from '@/assets/images/hunzagalleryimg1.jpg'
import locationIcon from '@/assets/images/location-icon.svg'
import freeCancellationIcon from '@/assets/images/free-cancellation-icon.svg'

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';

const route = useRoute();
const booking = ref(null);
const loading = ref(true);
const error = ref('');

const fetchBooking = async () => {
  const bookingId = route.params.id;
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get(`/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('✅ Booking confirmation:', res.data);
    booking.value = res.data;
  } catch (err) {
    error.value = 'Unable to load booking details.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBooking);
</script>

<template>
  <main>
    <LoadingSpinner v-if="loading" message="Loading booking details..." />
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchBooking" class="retry-btn">Retry</button>
    </div>
    
    <div v-else class="booking-confirm-container">
      <div class="booking-confirm-card">
        <div class="ninja-icon">
          <img :src="ninjaLogo" alt="" />
        </div>
        <div class="confirmation">
          <i class="fa-solid fa-circle-check"></i>
          <span class="confirmation-text">Your booking is confirmed</span>
        </div>

        <p class="whats-next">What's next?</p>
        <div class="instructions">
          <div>
            <img :src="checkboxIcon" alt="" />
            <span>Check your email for booking confirmation</span>
          </div>
          <div>
            <img :src="messagesIcon" alt="" />
            <span> Message your operator anytime</span>
          </div>
          <div>
            <img :src="needHelpIcon" alt="" />
            <span> Need help? We're always here for you</span>
          </div>
        </div>

        <div v-if="booking" class="tour-info">
          <div class="tour-image">
            <img :src="booking.listing?.meta_data?.photos?.[0] || hunzaGalleryImg1" alt="Tour Image" />
          </div>
          <div>
            <div class="tour-title">
              {{ booking.listing?.title || '9 Day Colors of Hunza Valley Cultural Tour' }}
            </div>
            <div class="tour-location">
              <img :src="locationIcon" alt="" /> From
              <span>{{ booking.listing?.meta_data?.location || 'Islamabad' }}</span>
            </div>
          </div>
        </div>

        <div v-if="booking" class="confirm-details">
          <p>Duration <span class="value">{{ booking.listing?.meta_data?.duration || '14 Days' }}</span></p>
          <p>Date <span class="value">{{ new Date(booking.booking_date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) }}</span></p>
          <p>People <span class="value">{{ booking.number_of_people || '2 Adults, 1 Infant' }}</span></p>
          <p>Operator <span class="value">{{ booking.listing?.supplier?.name || 'Apricot Tours' }}</span></p>
          <p>Total <span class="total">{{ booking.total_amount?.toLocaleString() || '960,000' }}</span></p>
        </div>

        <p class="cancellation">
          <img :src="freeCancellationIcon" alt="" /> Free
          cancellation until <span class="highlight">1 Aug 23:59</span>
        </p>

        <div class="button">
          <button>Message operator</button>
        </div>

        <div class="footer">
          Need to check your booking later? Just log in to travelninja and go to
          <router-link to="/profile/bookings">My bookings</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.error-state {
  text-align: center;
  padding: 40px;
}

.retry-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #2980b9;
}
</style>
