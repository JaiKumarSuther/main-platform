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
    <div class="booking-confirm-container">
      <div class="booking-confirm-card">
        <div class="ninja-icon">
          <img src="@/assets/images/ninja-logo.svg" alt="" />
        </div>
        <div class="confirmation">
          <i class="fa-solid fa-circle-check"></i>
          <span class="confirmation-text">Your booking is confirmed</span>
        </div>

        <p class="whats-next">What's next?</p>
        <div class="instructions">
          <div>
            <img src="@/assets/images/check-em.svg" alt="" />
            <span>Check your email for booking confirmation</span>
          </div>
          <div>
            <img src="@/assets/images/messages-icon.svg" alt="" />
            <span> Message your operator anytime</span>
          </div>
          <div>
            <img src="@/assets/images/need-help.svg" alt="" />
            <span> Need help? We're always here for you</span>
          </div>
        </div>

        <div class="tour-info">
          <div class="tour-image">
            <img src="@/assets/images/hunzagalleryimg1.jpg" alt="Tour Image" />
          </div>
          <div>
            <div class="tour-title">
              9 Day Colors of Hunza Valley Cultural Tour
            </div>
            <div class="tour-location">
              <img src="@/assets/images/location-icon.svg" alt="" /> From
              <span>Islamabad</span>
            </div>
          </div>
        </div>

        <div class="confirm-details">
          <p>Duration <span class="value">14 Days</span></p>
          <p>Date <span class="value">Wed 6 Aug 2025</span></p>
          <p>People <span class="value">2 Adults, 1 Infant</span></p>
          <p>Operator <span class="value">Apricot Tours</span></p>
          <p>Total <span class="total">960,000</span></p>
        </div>

        <p class="cancellation">
          <img src="@/assets/images/free-cancellation-icon.svg" alt="" /> Free
          cancellation until <span class="highlight">1 Aug 23:59</span>
        </p>

        <div class="button">
          <button>Message operator</button>
        </div>

        <div class="footer">
          Need to check your booking later? Just log in to travelninja and go to
          <a href="#">My bookings</a>
        </div>
      </div>
    </div>
  </main>
</template>
