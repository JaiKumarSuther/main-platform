<script setup lang="ts">
import img0 from '@/assets/images/my-account-icon.svg'
import img1 from '@/assets/images/my-bookings-icon.svg'
import img2 from '@/assets/images/messages-icon.svg'
import img3 from '@/assets/images/save-icon-listing-page-header.svg'
import img4 from '@/assets/images/support-icon.svg'

import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path: string) => route.path.startsWith(path);
</script>

<template>
  <aside class="sidebar">
    <ul>
      <router-link
        to="/profile/account"
        class="sidebar-link"
        :class="{ active: isActive('/profile/account') }"
      >
        <li>
          <span class="icon">
            <img :src="img0" alt="My Account" />
          </span>
          My account
        </li>
      </router-link>

      <router-link
        to="/profile/bookings"
        class="sidebar-link"
        :class="{ active: isActive('/profile/bookings') }"
      >
        <li>
          <span class="icon">
            <img :src="img1" alt="My Bookings" />
          </span>
          My bookings
        </li>
      </router-link>

      <router-link
        to="/profile/messages"
        class="sidebar-link"
        :class="{ active: isActive('/profile/messages') }"
      >
        <li>
          <span class="icon">
            <img :src="img2" alt="Messages" />
          </span>
          Messages <span class="badge">2</span>
        </li>
      </router-link>

      <router-link
        to="/profile/saved"
        class="sidebar-link"
        :class="{ active: isActive('/profile/saved') }"
      >
        <li>
          <span class="icon">
            <img :src="img3" alt="My Saved" />
          </span>
          My saved
        </li>
      </router-link>

      <router-link
        to="/profile/support-requests"
        class="sidebar-link"
        :class="{ active: isActive('/profile/support-requests') }"
      >
        <li>
          <span class="icon">
            <img :src="img4" alt="Support Requests" />
          </span>
          My support requests
        </li>
      </router-link>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: background 0.3s;
  border-radius: 8px;
}

.sidebar-link li {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-link.active {
  background-color: #f0f4ff;
  font-weight: bold;
}

.icon img {
  width: 20px;
  height: 20px;
}

.badge {
  background-color: #8761ff;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 6px;
}
</style>
