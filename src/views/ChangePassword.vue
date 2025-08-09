<script setup lang="ts">
import { ref } from 'vue';
import { useUserProfile } from '@/composables/useUserProfile';

const { changePassword } = useUserProfile();

const newPassword = ref('');
const confirmPassword = ref('');

const handleChangePassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    alert('Please fill in all fields');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }

  if (newPassword.value.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  try {
    await changePassword({ password: newPassword.value });
    alert('Password changed successfully!');
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (error) {
    console.error('Password change failed:', error);
    alert('Failed to change password. Please try again.');
  }
};
</script>

<template>
  <div class="change-pass-container">
    <h2>Change your password</h2>
    <p>Enter a new password below</p>
    <div class="form-group">
      <label>New password</label>
      <input 
        v-model="newPassword" 
        type="password" 
        placeholder="Enter new password"
      />
    </div>

    <div class="form-group">
      <label>Confirm password</label>
      <input 
        v-model="confirmPassword" 
        type="password" 
        placeholder="Confirm new password"
      />
    </div>
    <button class="btn" @click="handleChangePassword">Change password</button>
  </div>
</template>
