import api from './axios';

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  // Get current user profile by ID (using the user ID from localStorage)
  getProfile: async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.get(`/users/${user.user_id}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  // Update bank details
  updateBankDetails: async (userId, bankData) => {
    const response = await api.put(`/users/bank/${userId}`, bankData);
    return response.data;
  },

  // Update profile image
  updateProfileImage: async (userId, imageData) => {
    const response = await api.put(`/users/profile-image/${userId}`, imageData);
    return response.data;
  },

  // Change password (this endpoint might not exist, using update profile for now)
  changePassword: async (userId, passwordData) => {
    const response = await api.put(`/users/${userId}`, passwordData);
    return response.data;
  },

  // Reset password (this endpoint might not exist in the current backend)
  resetPassword: async (email) => {
    // For now, we'll throw an error since this endpoint doesn't exist
    throw new Error('Password reset functionality not implemented in backend');
  }
};
