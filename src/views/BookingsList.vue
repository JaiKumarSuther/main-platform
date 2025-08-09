<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBookings } from '@/composables/useBookings';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { useCustomerBookings } = useBookings();
const { isAuthenticated } = useAuth();

// Get customer bookings
const customerBookingsQuery = useCustomerBookings();

// Add error handling for the query
const handleQueryError = (error) => {
  console.error('Bookings query error:', error);
  // You can add additional error handling here if needed
};

// Safe localStorage access
const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const getUserData = () => {
  try {
    return localStorage.getItem('user');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!getAuthToken() && !!getUserData();
});

// Check if bookings are empty
const hasBookings = computed(() => {
  return customerBookingsQuery.data.value && customerBookingsQuery.data.value.length > 0;
});

// Check if we should show empty state
const showEmptyState = computed(() => {
  return (customerBookingsQuery.isSuccess.value || customerBookingsQuery.data.value) && 
         !customerBookingsQuery.isError.value && 
         !hasBookings.value;
});

const viewBooking = (bookingId) => {
  router.push(`/profile/bookings/${bookingId}`);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const formatPrice = (price) => {
  return price ? `Rs ${price.toLocaleString()}` : 'N/A';
};

onMounted(() => {
  // Check if user is logged in, if not redirect to login
  if (!isLoggedIn.value) {
    router.push('/auth/login');
    return;
  }
});
</script>

<template>
  <div class="bookings-list">
    <h2>My Bookings</h2>
    

    
    <!-- Not logged in state -->
    <div v-if="!isLoggedIn" class="not-logged-in">
      <div class="empty-state-icon">🔐</div>
      <h3>Authentication Required</h3>
      <p>You need to be logged in to view your bookings.</p>
      <button @click="router.push('/auth/login')" class="login-btn">Go to Login</button>
    </div>

    <!-- Loading state -->
    <div v-else-if="customerBookingsQuery.isLoading && !customerBookingsQuery.data" class="loading-state">
      <div class="loading-spinner"></div>
      <h3>Loading Your Bookings</h3>
      <p>Please wait while we fetch your booking information...</p>
    </div>

    <!-- Error state - Show as empty state instead -->
    <div v-else-if="customerBookingsQuery.isError" class="empty-state">
      <div class="empty-state-icon">📋</div>
      <h3>No Bookings Found</h3>
      <p>You haven't made any bookings yet. Start exploring amazing tours and experiences!</p>
    </div>

    <!-- Bookings list -->
    <div v-else-if="customerBookingsQuery.isSuccess || customerBookingsQuery.data">
      <!-- Empty state -->
      <div v-if="showEmptyState" class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No Bookings Found</h3>
        <p>You haven't made any bookings yet. Start exploring amazing tours and experiences!</p>
      </div>

      <!-- Bookings grid -->
      <div v-else-if="hasBookings" class="bookings-grid">
        <div 
          v-for="booking in (customerBookingsQuery.data || [])" 
          :key="booking.booking_id"
          class="booking-card"
          @click="viewBooking(booking.booking_id)"
        >
          <div class="booking-header">
            <h3>{{ booking.listing?.title || 'Tour Title' }}</h3>
            <span class="status" :class="booking.booking_status?.toLowerCase()">
              {{ booking.booking_status }}
            </span>
          </div>
          
          <div class="booking-details">
            <div class="detail-row">
              <span class="label">Booking ID:</span>
              <span class="value">{{ booking.booking_id }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">{{ formatDate(booking.selected_date) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">People:</span>
              <span class="value">{{ booking.selected_people }} People</span>
            </div>
            <div class="detail-row">
              <span class="label">Total:</span>
              <span class="value price">{{ formatPrice(booking.total_price) }}</span>
            </div>
          </div>
          
          <div class="booking-actions">
            <button class="btn primary" @click.stop="viewBooking(booking.booking_id)">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookings-list {
  padding: 20px;
}

.bookings-list h2 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.not-logged-in, .loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 60px 40px;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

.empty-state-icon, .error-state-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.not-logged-in h3, .loading-state h3, .error-state h3, .empty-state h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
}

.not-logged-in p, .loading-state p, .error-state p, .empty-state p {
  margin-bottom: 25px;
  font-size: 16px;
  line-height: 1.5;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn, .login-btn, .browse-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-btn:hover, .login-btn:hover, .browse-btn:hover {
  background: #2980b9;
}

.error-details {
  color: #e74c3c;
  font-size: 14px;
  margin: 15px 0;
  padding: 10px;
  background: #fdf2f2;
  border-radius: 4px;
  border-left: 4px solid #e74c3c;
}

.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.booking-card {
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.booking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.booking-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
  flex: 1;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.status.confirmed {
  background: #d4edda;
  color: #155724;
}

.status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.booking-details {
  margin-bottom: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-row .label {
  color: #666;
  font-weight: 500;
}

.detail-row .value {
  color: #2c3e50;
}

.detail-row .value.price {
  font-weight: bold;
  color: #27ae60;
}

.booking-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn.primary {
  background: #3498db;
  color: white;
}

.btn.primary:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .bookings-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-card {
    margin-bottom: 15px;
  }
  
  .not-logged-in, .loading-state, .error-state, .empty-state {
    padding: 40px 20px;
  }
}
</style>
