<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  mode: {
    type: String,
    default: 'out-in',
    validator: (value) => ['in-out', 'out-in'].includes(value)
  }
});

const route = useRoute();

const transitionName = computed(() => {
  // Determine transition based on route
  if (route.name === 'Search') {
    return 'fade';
  } else if (['Listing', 'Activity', 'Hotel', 'Stay', 'Bike', 'Car', 'Tour', 'Trek', 'Experience', 'Rental', 'GroupTour', 'PrivateTour', 'GuidedExperience'].includes(route.name)) {
    return 'slide-left';
  } else if (['Account', 'BookingsList', 'Messages', 'Saved', 'SupportRequest', 'Refunds'].includes(route.name)) {
    return 'slide-up';
  } else if (['Checkout', 'BookingConfirm', 'Payments'].includes(route.name)) {
    return 'fade-scale';
  } else {
    return 'fade';
  }
});

const transitionMode = computed(() => props.mode);

// Transition hooks
const beforeEnter = (el) => {
  // Add initial state
  if (transitionName.value === 'slide-left') {
    el.style.transform = 'translateX(100%)';
  } else if (transitionName.value === 'slide-up') {
    el.style.transform = 'translateY(100%)';
  } else if (transitionName.value === 'fade-scale') {
    el.style.transform = 'scale(0.95)';
    el.style.opacity = '0';
  }
};

const enter = (el, done) => {
  // Trigger animation
  requestAnimationFrame(() => {
    if (transitionName.value === 'slide-left') {
      el.style.transition = 'transform 0.3s ease-out';
      el.style.transform = 'translateX(0)';
    } else if (transitionName.value === 'slide-up') {
      el.style.transition = 'transform 0.3s ease-out';
      el.style.transform = 'translateY(0)';
    } else if (transitionName.value === 'fade-scale') {
      el.style.transition = 'all 0.3s ease-out';
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
    }
    
    setTimeout(done, 300);
  });
};

const leave = (el, done) => {
  // Trigger leave animation
  if (transitionName.value === 'slide-left') {
    el.style.transition = 'transform 0.3s ease-in';
    el.style.transform = 'translateX(-100%)';
  } else if (transitionName.value === 'slide-up') {
    el.style.transition = 'transform 0.3s ease-in';
    el.style.transform = 'translateY(-100%)';
  } else if (transitionName.value === 'fade-scale') {
    el.style.transition = 'all 0.3s ease-in';
    el.style.transform = 'scale(0.95)';
    el.style.opacity = '0';
  }
  
  setTimeout(done, 300);
};

const afterLeave = (el) => {
  // Clean up styles
  el.style.transform = '';
  el.style.transition = '';
  el.style.opacity = '';
};
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide left transition */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Slide up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

/* Fade scale transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

