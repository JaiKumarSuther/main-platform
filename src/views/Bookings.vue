<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookings } from '@/composables/useBookings';

const route = useRoute();
const router = useRouter();
const bookingId = route.params.id;

const { useBookingById, updateBookingStatusMutation } = useBookings();

// Get booking details
const bookingQuery = useBookingById(bookingId);

// Cancel booking (using status update)
const handleCancelBooking = async () => {
  if (!confirm('Are you sure you want to cancel this booking?')) return;
  
  updateBookingStatusMutation.mutate(
    { 
      bookingId, 
      status: 'cancelled'
    },
    {
      onSuccess: () => {
        alert('Booking cancelled successfully');
        router.push('/profile/bookings');
      },
      onError: (error) => {
        alert('Failed to cancel booking: ' + (error.response?.data?.message || 'Unknown error'));
      }
    }
  );
};

// Send message (placeholder)
const sendMessage = () => {
  router.push(`/messages?booking=${bookingId}`);
};
</script>

<template>
  <div class="mybooking-details" v-if="bookingQuery.data">
    <h2>Booking Detail</h2>

    <!-- Loading state -->
    <div v-if="bookingQuery.isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading booking details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="bookingQuery.isError" class="error-state">
      <p>Error loading booking details. Please try again.</p>
      <button @click="bookingQuery.refetch()" class="retry-btn">Retry</button>
    </div>

    <!-- Booking details -->
    <div v-else>
      <div class="section">
        <div class="booking-name">
          <span class="label tour">Tour</span>
          <h3>{{ bookingQuery.data.listing?.title || 'Tour Title' }}</h3>
        </div>
        <div class="booking-info">
          <span class="info">Booking ID:</span>
          <a href="#"> {{ bookingQuery.data.booking_id }}</a>
        </div>
        <div class="booking-info">
          <span class="info">Date:</span>
          <span>
            {{ new Date(bookingQuery.data.selected_date).toLocaleDateString() }}
            <small class="time">{{ new Date(bookingQuery.data.selected_date).toLocaleTimeString() }}</small>
          </span>
        </div>
        <div class="booking-info">
          <span class="info">Amount:</span>
          <span>{{ bookingQuery.data.total_price?.toLocaleString() }}</span>
        </div>
        <div class="booking-info">
          <span class="info">Status:</span>
          <span class="status" :class="bookingQuery.data.booking_status?.toLowerCase()">
            {{ bookingQuery.data.booking_status }}
          </span>
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
          <span> {{ bookingQuery.data.selected_people }} People</span>
        </div>
        <div class="booking-info">
          <span class="info">Departure Date:</span>
          <span>{{ new Date(bookingQuery.data.selected_date).toLocaleDateString() }}</span>
        </div>
        <div class="booking-info">
          <span class="info">Duration:</span>
          <span> {{ bookingQuery.data.days_nights }} Days</span>
        </div>
        <div class="booking-info">
          <span class="info">Operator:</span>
          <span>{{ bookingQuery.data.partner?.full_name || 'N/A' }}</span>
        </div>
        <div class="booking-info">
          <span class="info">Add Ons:</span>
          <span>{{ (bookingQuery.data.selected_add_ons || []).join(', ') }}</span>
        </div>
      </div>

      <div class="section">
        <h2>Payment Information</h2>
        <div v-for="(addon, index) in bookingQuery.data.selected_add_ons" :key="index" class="booking-info">
          <span class="info">{{ addon }}</span>
          <span>Rs --</span>
        </div>
        <div class="bookingDetails-total">
          <p class="total">Total Payment</p>
          <span>Rs {{ bookingQuery.data.total_price?.toLocaleString() }}</span>
        </div>
      </div>

      <div class="actions">
        <button 
          class="btn primary" 
          @click="sendMessage"
          :disabled="updateBookingStatusMutation.isPending.value"
        >
          send a message
        </button>
        <button 
          id="cancelBtn" 
          class="btn danger" 
          @click="handleCancelBooking"
          :disabled="updateBookingStatusMutation.isPending.value"
        >
          {{ updateBookingStatusMutation.isPending.value ? 'Cancelling...' : 'cancel my booking' }}
        </button>
      </div>
    </div>
  </div>

  <div v-else-if="bookingQuery.isLoading" class="loading-state">
    <div class="loading-spinner"></div>
    <p>Loading booking details...</p>
  </div>
  
  <div v-else-if="bookingQuery.isError" class="error-state">
    <p>Error loading booking details. Please try again.</p>
    <button @click="bookingQuery.refetch()" class="retry-btn">Retry</button>
  </div>
</template>

<style scoped>
.loading-state, .error-state {
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

.status.pending {
  color: #f39c12;
}

.status.confirmed {
  color: #27ae60;
}

.status.cancelled {
  color: #e74c3c;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
