<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length > 0">
    <ol class="breadcrumb-list">
      <li 
        v-for="(breadcrumb, index) in breadcrumbs" 
        :key="index"
        class="breadcrumb-item"
      >
        <router-link 
          v-if="breadcrumb.path && index < breadcrumbs.length - 1"
          :to="breadcrumb.path"
          class="breadcrumb-link"
        >
          {{ breadcrumb.name }}
        </router-link>
        <span 
          v-else 
          class="breadcrumb-current"
        >
          {{ breadcrumb.name }}
        </span>
        <span 
          v-if="index < breadcrumbs.length - 1" 
          class="breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const crumbs = [];
  
  // Add home
  crumbs.push({
    name: 'Home',
    path: '/'
  });

  // Add route-specific breadcrumbs
  if (route.name === 'Search') {
    crumbs.push({
      name: 'Search Results',
      path: null
    });
  } else if (route.name === 'Listing') {
    crumbs.push(
      { name: 'Search', path: '/search' },
      { name: 'Listing Details', path: null }
    );
  } else if (route.name === 'Activity') {
    crumbs.push(
      { name: 'Activities', path: '/search?type=activity' },
      { name: 'Activity Details', path: null }
    );
  } else if (route.name === 'Hotel') {
    crumbs.push(
      { name: 'Hotels', path: '/search?type=hotel' },
      { name: 'Hotel Details', path: null }
    );
  } else if (route.name === 'Stay') {
    crumbs.push(
      { name: 'Accommodations', path: '/search?type=stay' },
      { name: 'Stay Details', path: null }
    );
  } else if (route.name === 'Bike') {
    crumbs.push(
      { name: 'Bike Rentals', path: '/search?type=bike_rental' },
      { name: 'Bike Details', path: null }
    );
  } else if (route.name === 'Car') {
    crumbs.push(
      { name: 'Car Rentals', path: '/search?type=car_rental' },
      { name: 'Car Details', path: null }
    );
  } else if (route.name === 'Rental') {
    crumbs.push(
      { name: 'Rentals', path: '/search?type=rental' },
      { name: 'Rental Details', path: null }
    );
  } else if (route.name === 'Tour') {
    crumbs.push(
      { name: 'Tours', path: '/search?type=tour' },
      { name: 'Tour Details', path: null }
    );
  } else if (route.name === 'GroupTour') {
    crumbs.push(
      { name: 'Group Tours', path: '/search?type=tour' },
      { name: 'Tour Details', path: null }
    );
  } else if (route.name === 'PrivateTour') {
    crumbs.push(
      { name: 'Private Tours', path: '/search?type=tour' },
      { name: 'Tour Details', path: null }
    );
  } else if (route.name === 'Experience') {
    crumbs.push(
      { name: 'Experiences', path: '/search?type=experience' },
      { name: 'Experience Details', path: null }
    );
  } else if (route.name === 'GuidedExperience') {
    crumbs.push(
      { name: 'Guided Experiences', path: '/search?type=experience' },
      { name: 'Experience Details', path: null }
    );
  } else if (route.name === 'Trek') {
    crumbs.push(
      { name: 'Trekking', path: '/search?type=trek' },
      { name: 'Trek Details', path: null }
    );
  } else if (route.name === 'Checkout') {
    crumbs.push({ name: 'Checkout', path: null });
  } else if (route.name === 'BookingConfirm') {
    crumbs.push({ name: 'Booking Confirmed', path: null });
  } else if (route.name === 'Account') {
    crumbs.push({ name: 'My Account', path: null });
  } else if (route.name === 'BookingsList') {
    crumbs.push({ name: 'My Bookings', path: null });
  } else if (route.name === 'Messages') {
    crumbs.push({ name: 'Messages', path: null });
  } else if (route.name === 'Saved') {
    crumbs.push({ name: 'Saved Items', path: null });
  } else if (route.name === 'SupportRequest') {
    crumbs.push({ name: 'Support Requests', path: null });
  } else if (route.name === 'Refunds') {
    crumbs.push({ name: 'Refunds', path: null });
  } else if (route.name === 'Payments') {
    crumbs.push({ name: 'Payments', path: null });
  }

  return crumbs;
});
</script>

<style scoped>
.breadcrumb {
  padding: 12px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.breadcrumb-current {
  color: #6c757d;
  font-weight: 500;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #6c757d;
}

@media (max-width: 768px) {
  .breadcrumb {
    padding: 8px 16px;
  }
  
  .breadcrumb-list {
    font-size: 12px;
  }
  
  .breadcrumb-separator {
    margin: 0 4px;
  }
}
</style>

