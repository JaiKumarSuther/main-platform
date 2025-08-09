<template>
  <div class="signup-container">
    <!-- Header -->

    <div class="signup-header">
      <h2>Sign up</h2>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="#5A6783" stroke-width="4" />
        <line
          x1="35"
          y1="35"
          x2="65"
          y2="65"
          stroke="#5A6783"
          stroke-width="4"
          stroke-linecap="round"
        />
        <line
          x1="65"
          y1="35"
          x2="35"
          y2="65"
          stroke="#5A6783"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- Google Signup -->
    <button class="google-btn">
      <svg
        width="24"
        height="24"
        viewBox="-3 0 262 262"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,
              155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,
              199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,
              133.451"
            fill="#4285F4"
          />
          <path
            d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,
              197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847
              56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798
              79.49,261.1 130.55,261.1"
            fill="#34A853"
          />
          <path
            d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,
              121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,
              71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,
              189.152 L56.281,156.37"
            fill="#FBBC05"
          />
          <path
            d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,
              33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,
              71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
            fill="#EB4335"
          />
        </g>
      </svg>
      Sign up with Google
    </button>

    <p class="or">OR</p>

    <!-- Full Name -->
    <div class="form-group">
      <label>Full name</label>
      <input type="text" v-model="fullName" />
    </div>

    <!-- Email -->
    <div class="form-group">
      <label>Email</label>
      <input type="email" v-model="email" />
    </div>

    <!-- Password -->
    <div class="form-group">
      <label>Password</label>
      <input type="password" v-model="password" />
    </div>

    <!-- Error Display -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Sign Up Button -->
    <button class="btn" @click="signup" :disabled="registerMutation.isPending.value">
      {{ registerMutation.isPending.value ? "Signing up..." : "Sign up" }}
    </button>

    <!-- Promo Checkbox -->
    <div class="checkbox-group">
      <input type="checkbox" id="promo" checked />
      <label for="promo"> Send me discounts & promotional offers </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from '@/composables/useAuth';

const fullName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const error = ref("");

const { registerMutation, loginMutation } = useAuth();

const signup = async () => {
  error.value = "";

  registerMutation.mutate(
    {
      full_name: fullName.value,
      email: email.value,
      password: password.value,
      role: "customer",
    },
    {
      onSuccess: () => {
        // Auto-login after successful registration
        loginMutation.mutate(
          {
            email: email.value,
            password: password.value,
          },
          {
            onSuccess: () => {
              router.push("/profile/account");
            },
            onError: (err: any) => {
              error.value = "Registration successful but login failed. Please try logging in.";
            }
          }
        );
      },
      onError: (err: any) => {
        error.value = err.response?.data?.message || "Signup failed";
      }
    }
  );
};
</script>

<style scoped>
.error-message {
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 8px 0;
  font-size: 14px;
}
</style>
