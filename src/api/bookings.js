import api from './axios';

export const bookingsAPI = {
  // Get all bookings (admin)
  getAllBookings: async () => {
    const response = await api.get('/bookings/all');
    console.log('📋 All Bookings API Response:', response.data);
    return response.data;
  },

  // Get customer bookings
  getCustomerBookings: async () => {
    const response = await api.get('/bookings/customer');
    console.log('👤 Customer Bookings API Response:', response.data);
    return response.data;
  },

  // Get partner/supplier bookings
  getPartnerBookings: async () => {
    const response = await api.get('/bookings/partner');
    console.log('🤝 Partner Bookings API Response:', response.data);
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}`);
    console.log(`📋 Booking ${bookingId} API Response:`, response.data);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    console.log('➕ Create Booking API Response:', response.data);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (bookingId, statusData) => {
    const response = await api.patch(`/bookings/${bookingId}/status`, statusData);
    console.log(`🔄 Update Booking Status ${bookingId} API Response:`, response.data);
    return response.data;
  },

  // Get cancelled bookings
  getCancelledBookings: async () => {
    const response = await api.get('/bookings/cancelled');
    console.log('❌ Cancelled Bookings API Response:', response.data);
    return response.data;
  }
};
