import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { authAPI } from '@/api/auth';
import { ref } from 'vue';

export function useAuth() {
  const queryClient = useQueryClient();
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      user.value = data.user;
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      // Optionally auto-login after registration
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });

  // Get user profile query
  const userProfileQuery = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: authAPI.getProfile,
    enabled: !!localStorage.getItem('authToken'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once
    retryDelay: 1000, // Wait 1 second before retry
    onError: (error) => {
      console.error('Failed to fetch user profile:', error);
      // If the profile fetch fails, we can still use localStorage data
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: ({ userId, userData }) => authAPI.updateProfile(userId, userData),
    onSuccess: (data) => {
      user.value = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  // Update bank details mutation
  const updateBankDetailsMutation = useMutation({
    mutationFn: ({ userId, bankData }) => authAPI.updateBankDetails(userId, bankData),
    onSuccess: (data) => {
      user.value = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  // Update profile image mutation
  const updateProfileImageMutation = useMutation({
    mutationFn: ({ userId, imageData }) => authAPI.updateProfileImage(userId, imageData),
    onSuccess: (data) => {
      user.value = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: ({ userId, passwordData }) => authAPI.changePassword(userId, passwordData),
    onSuccess: () => {
      console.log('Password changed successfully');
    }
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: authAPI.resetPassword,
    onSuccess: () => {
      console.log('Password reset email sent');
    }
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    user.value = null;
    queryClient.clear();
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken') && !!user.value;
  };

  return {
    user,
    loginMutation,
    registerMutation,
    userProfileQuery,
    updateProfileMutation,
    updateBankDetailsMutation,
    updateProfileImageMutation,
    changePasswordMutation,
    resetPasswordMutation,
    logout,
    isAuthenticated
  };
}
