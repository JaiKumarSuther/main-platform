# Travel Ninja - Complete Routing Guide

## Overview

This guide covers the comprehensive routing system implemented throughout the Travel Ninja application, including the header navigation, search functionality, authentication-aware routing, and the unified listing system.

## Navigation Architecture

### 1. **Header Navigation** (`src/components/Header.vue`)

#### Desktop Header Features:
- **Logo**: Routes to `/search` (home page)
- **Search Bar**: 
  - Real-time search with dropdown suggestions
  - Enter key search functionality
  - Clickable suggestions route to filtered search results
- **Navigation Menu**:
  - "Explore" - toggles hotels/tours dropdown
  - "Places" - toggles places dropdown
  - "Trekking" - routes to `/search?type=trek`
- **User Icons**:
  - Currency selector (static)
  - Support - routes to support requests
  - Wishlist - routes to `/profile/saved` (auth required)
  - Profile - routes to `/profile/account` (auth required)

#### Mobile Header Features:
- **Logo**: Routes to `/search`
- **Search Icon**: Routes to `/search`
- **Wishlist Icon**: Routes to `/profile/saved` (auth required)
- **Profile Icon**: Routes to `/profile/account` (auth required)
- **Menu Icon**: Opens mobile menu with navigation options

#### Dropdown Navigation:

**Places Dropdown**: All location clicks route to search with location filter
- Gilgit Baltistan locations (Hunza Valley, Skardu, etc.)
- Khyber Pakhtunkhwa locations (Swat Valley, Kumrat Valley, etc.)
- Punjab locations (Islamabad, Murree, etc.)
- Balochistan locations (Ziarat, Hingol National Park, etc.)
- Sindh locations (Karachi, Kund Malir, etc.)
- Kashmir locations (Neelum Valley, Leepa Valley, etc.)

**Hotels/Explore Dropdown**: All clicks route to search with type filters
- Hotels by location (`/search?type=hotel&q=location`)
- Tours by type (`/search?type=tour&q=category`)
- Treks (`/search?type=trek&q=trek_name`)
- Activities (`/search?type=activity&q=activity_name`)
- Car/Bike Rentals (`/search?type=car_rental` or `bike_rental`)

### 2. **Authentication-Aware Routing**

The header automatically detects authentication state and adjusts behavior:

```javascript
// Authentication check
const isAuthenticated = computed(() => {
  try {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  } catch (error) {
    return false;
  }
});
```

**For Authenticated Users**:
- Wishlist icon → `/profile/saved`
- Profile icon → `/profile/account`
- "My Account" text in mobile menu
- "Manage bookings" → `/profile/bookings`

**For Unauthenticated Users**:
- Wishlist icon → `/auth/login`
- Profile icon → `/auth/login`
- "Log in or sign up" text in mobile menu

### 3. **Search Navigation**

#### Search Bar Functionality:
```javascript
// Search functions
function performSearch() {
  if (searchQuery.value.trim()) {
    goToSearch({ q: searchQuery.value.trim() });
  }
}

function searchPlace(place) {
  goToSearch({ q: place, type: 'place' });
}

function searchByType(type, query = '') {
  const searchParams = { type };
  if (query) searchParams.q = query;
  goToSearch(searchParams);
}
```

#### Search URL Examples:
- General search: `/search?q=hunza`
- Type-specific: `/search?type=hotel&q=skardu`
- Place search: `/search?type=place&q=hunza valley`
- Activity search: `/search?type=activity&q=paragliding`

## Unified Listing System

### **Route Structure**

All listing types now use the unified `ListingPage` component but maintain SEO-friendly URLs:

```javascript
// Available Routes
/activity/:id     → Activity listings
/hotel/:id        → Hotel listings
/stay/:id         → Stay/accommodation listings
/car/:id          → Car rental listings
/bike/:id         → Bike rental listings
/rental/:id       → Generic rental listings
/tour/:id         → Tour listings
/trek/:id         → Trek listings
/experience/:id   → Experience listings
/listing/:id      → Generic listing route
```

### **Navigation Utility** (`src/utils/navigation.js`)

#### Core Navigation Functions:
```javascript
// Unified listing navigation
const goToListing = (id) => router.push({ name: 'Listing', params: { id } });

// Type-specific navigation (all use unified component)
const goToActivity = (id) => router.push({ name: 'Activity', params: { id } });
const goToHotel = (id) => router.push({ name: 'Hotel', params: { id } });
const goToTour = (id) => router.push({ name: 'Tour', params: { id } });
// ... etc for all types

// Search navigation
const goToSearch = (query = {}) => router.push({ name: 'Search', query });
```

#### Helper Functions:
```javascript
// Get appropriate route for a listing type
export const getListingRoute = (listingType, id) => {
  switch (listingType) {
    case 'car_rental': return { name: 'Car', params: { id } };
    case 'bike_rental': return { name: 'Bike', params: { id } };
    case 'hotel': return { name: 'Hotel', params: { id } };
    // ... etc
    default: return { name: 'Listing', params: { id } };
  }
};

// Build listing URL from type and ID
export const buildListingUrl = (type, id) => {
  // Returns appropriate route object
};
```

### **Breadcrumb Navigation** (`src/components/UI/Breadcrumb.vue`)

Automatically generates breadcrumbs based on current route:

```javascript
// Examples
/ → Search Results
/search → Home / Search Results
/activity/123 → Home / Activities / Activity Details
/hotel/456 → Home / Hotels / Hotel Details
/profile/bookings → Home / My Bookings
```

## Route Configuration (`src/router/index.js`)

### **Public Routes** (No Authentication Required)
```javascript
// Search and discovery
/search          → Search page
/smart-search    → Smart search page

// Listings (all use ListingPage component)
/activity/:id    → Activity details
/hotel/:id       → Hotel details
/stay/:id        → Stay details
/car/:id         → Car rental details
/bike/:id        → Bike rental details
/tour/:id        → Tour details
/trek/:id        → Trek details
/experience/:id  → Experience details
/rental/:id      → Rental details
/listing/:id     → Generic listing details

// Profiles
/supplier-profile/:id    → Supplier profile
/tour-guide-profile/:id  → Tour guide profile
```

### **Authentication Routes**
```javascript
/auth/login              → Login page
/auth/signup             → Sign up page
/auth/reset-password     → Password reset
/auth/change-password    → Change password
```

### **Protected Routes** (Authentication Required)
```javascript
// Booking flow
/checkout               → Checkout page
/confirm-room          → Room confirmation
/booking-confirm/:id   → Booking confirmation

// User profile (nested routes)
/profile/account       → Account settings
/profile/bookings      → My bookings
/profile/bookings/:id  → Booking details
/profile/messages      → Messages
/profile/saved         → Saved items
/profile/support-requests → Support tickets
/profile/refunds       → Refunds

// Payments
/payments              → Payment page
```

## Navigation Guards

### **Authentication Guard**
```javascript
router.beforeEach((to, from, next) => {
  const isLoggedIn = isAuthenticated();
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: '/auth/login', query: { redirect: to.fullPath } });
    return;
  }
  
  if (isLoggedIn && to.path.startsWith('/auth')) {
    next('/profile/account');
    return;
  }
  
  next();
});
```

### **Route Meta Properties**
```javascript
{
  path: '/profile/account',
  meta: { 
    title: 'My Account',
    requiresAuth: true,
    layout: 'profile'
  }
}
```

## App Structure (`src/App.vue`)

```vue
<template>
  <div>
    <!-- Header on all pages except 404 -->
    <Header v-if="route.name !== 'NotFound'" />
    
    <!-- Breadcrumb on most pages -->
    <Breadcrumb v-if="route.name !== 'NotFound' && 
                      route.name !== 'Login' && 
                      route.name !== 'SignUp'" />
    
    <!-- Route content with transitions -->
    <RouteTransition>
      <router-view />
    </RouteTransition>
    
    <!-- Footer on all pages except 404 -->
    <Footer v-if="route.name !== 'NotFound'" />
  </div>
</template>
```

## Route Transitions (`src/components/UI/RouteTransition.vue`)

Different animations based on route types:
- **Search pages**: Fade transition
- **Listing pages**: Slide left transition  
- **Profile pages**: Slide up transition
- **Booking flow**: Fade scale transition

## Usage Examples

### **Programmatic Navigation**
```javascript
import { useNavigation } from '@/utils/navigation';

const { goToSearch, goToListing, goToLogin } = useNavigation();

// Search with filters
goToSearch({ type: 'hotel', q: 'Hunza' });

// Navigate to specific listing
goToListing('listing-id-123');

// Conditional navigation based on auth
if (isAuthenticated.value) {
  goToAccount();
} else {
  goToLogin();
}
```

### **Template Navigation**
```vue
<!-- Router links -->
<router-link to="/search">Search</router-link>
<router-link :to="{ name: 'Hotel', params: { id: hotelId } }">
  View Hotel
</router-link>

<!-- Dynamic navigation -->
<button @click="goToSearch({ type: 'activity' })">
  Find Activities
</button>

<!-- Conditional auth navigation -->
<button @click="isAuthenticated ? goToSaved() : goToLogin()">
  My Wishlist
</button>
```

## SEO and Meta Tags

Each route automatically updates:
- Page title: `${route.meta.title} - Travel Ninja`
- Meta description based on content
- Canonical URLs
- Open Graph tags for social sharing

## Mobile Considerations

- Touch-friendly navigation targets
- Collapsible mobile menu
- Swipe gestures for route transitions
- Responsive breadcrumb sizing
- Mobile-specific layout adjustments

## Performance Optimizations

- Lazy loading of route components
- Route-based code splitting
- Navigation guards for authentication checks
- Cached route data where appropriate
- Optimized transition animations

## Error Handling

- 404 page for unknown routes
- Fallback routes for invalid listing IDs
- Error boundaries for failed navigation
- User-friendly error messages
- Automatic retry mechanisms

## Testing Navigation

### **Manual Testing Checklist**
1. ✅ Header logo navigates to search
2. ✅ Search bar performs searches on Enter
3. ✅ Dropdown items navigate to filtered results
4. ✅ Auth-aware navigation works correctly
5. ✅ Mobile menu navigation functions
6. ✅ Breadcrumbs generate correctly
7. ✅ All listing routes load unified component
8. ✅ Protected routes redirect to login
9. ✅ Route transitions animate smoothly
10. ✅ Back/forward navigation works

### **Automated Testing**
```javascript
// Route navigation tests
describe('Navigation', () => {
  test('navigates to search from header logo', () => {
    // Test implementation
  });
  
  test('redirects unauthenticated users to login', () => {
    // Test implementation  
  });
  
  test('search navigation with filters', () => {
    // Test implementation
  });
});
```

This comprehensive routing system provides:
- **Unified Experience**: Consistent navigation across all pages
- **SEO Friendly**: Clean URLs for all content types
- **User Friendly**: Intuitive navigation patterns
- **Developer Friendly**: Easy to extend and maintain
- **Performance Optimized**: Efficient loading and transitions
