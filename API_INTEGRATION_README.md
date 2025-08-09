# TravelNinja Frontend API Integration with TanStack Query

This document outlines the comprehensive API integration implemented in the TravelNinja frontend using TanStack Query (formerly React Query) for Vue.js.

## 🚀 Overview

The frontend has been completely integrated with the backend APIs using TanStack Query for efficient data fetching, caching, and state management. This provides:

- **Automatic caching** and background refetching
- **Optimistic updates** for better UX
- **Error handling** and retry mechanisms
- **Loading states** management
- **Real-time data synchronization**

## 📦 Dependencies Added

```bash
npm install @tanstack/vue-query
```

## 🏗️ Architecture

### 1. API Layer (`src/api/`)

Organized API services for different modules:

- `auth.js` - Authentication endpoints
- `listings.js` - Tour/Activity listings
- `bookings.js` - Booking management
- `reviews.js` - Review system
- `support.js` - Support tickets
- `messages.js` - Messaging system
- `search.js` - Search functionality

### 2. Composable Layer (`src/composables/`)

TanStack Query hooks organized by feature:

- `useAuth.js` - Authentication state and mutations
- `useListings.js` - Listings queries and mutations
- `useBookings.js` - Booking queries and mutations
- `useReviews.js` - Review queries and mutations
- `useSupport.js` - Support ticket queries and mutations
- `useSearch.js` - Search queries

### 3. Component Integration

Vue components updated to use the composables for:
- Data fetching
- Mutations
- Loading states
- Error handling

## 🔧 Configuration

### TanStack Query Setup (`src/main.js`)

```javascript
import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(router);
app.mount('#app');
```

### Axios Configuration (`src/api/axios.js`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://machine.travelninja.pk/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
```

## 📋 API Integration Details

### Authentication (`useAuth`)

**Features:**
- Login/Register mutations
- User profile management
- Password reset
- Bank details update
- Profile image upload

**Usage:**
```javascript
import { useAuth } from '@/composables/useAuth';

const { 
  user, 
  loginMutation, 
  registerMutation, 
  userProfileQuery,
  updateProfileMutation,
  logout 
} = useAuth();
```

### Listings (`useListings`)

**Features:**
- Fetch all listings with filters
- Get listing details
- Supplier listings
- Availability management
- CRUD operations for suppliers

**Usage:**
```javascript
import { useListings } from '@/composables/useListings';

const { 
  useAllListings, 
  useListingById, 
  createListingMutation,
  updateListingMutation 
} = useListings();
```

### Bookings (`useBookings`)

**Features:**
- Customer bookings
- Partner bookings
- Booking details
- Status updates
- Cancellation

**Usage:**
```javascript
import { useBookings } from '@/composables/useBookings';

const { 
  useCustomerBookings, 
  useBookingById, 
  createBookingMutation,
  cancelBookingMutation 
} = useBookings();
```

### Reviews (`useReviews`)

**Features:**
- Listing reviews
- Supplier reviews
- Review creation/editing
- Reply system

**Usage:**
```javascript
import { useReviews } from '@/composables/useReviews';

const { 
  useListingReviews, 
  createReviewMutation,
  addReplyMutation 
} = useReviews();
```

### Support (`useSupport`)

**Features:**
- User tickets
- Ticket creation
- Status updates
- Admin responses

**Usage:**
```javascript
import { useSupport } from '@/composables/useSupport';

const { 
  useUserTickets, 
  createTicketMutation,
  closeTicketMutation 
} = useSupport();
```

### Search (`useSearch`)

**Features:**
- Advanced search
- Location-based search
- Search suggestions
- Popular searches

**Usage:**
```javascript
import { useSearch } from '@/composables/useSearch';

const { 
  useSearchListings, 
  useSearchByLocation,
  useSearchSuggestions 
} = useSearch();
```

## 🎯 Component Updates

### Updated Components

1. **Login.vue** - Integrated with `useAuth`
2. **SignUp.vue** - Integrated with `useAuth`
3. **Search.vue** - Integrated with `useSearch`
4. **Account.vue** - Integrated with `useAuth`
5. **Bookings.vue** - Integrated with `useBookings`
6. **SupportRequest.vue** - Integrated with `useSupport`

### Key Features Added

- **Loading States**: Spinner animations during data fetching
- **Error Handling**: User-friendly error messages with retry options
- **Optimistic Updates**: Immediate UI updates for better UX
- **Automatic Refetching**: Background data synchronization
- **Cache Management**: Efficient data caching and invalidation

## 🔄 Data Flow

1. **Component** calls composable hook
2. **Composable** uses TanStack Query to manage API calls
3. **API Service** makes HTTP requests to backend
4. **Response** is cached and returned to component
5. **Component** renders data with loading/error states

## 🎨 UI/UX Improvements

### Loading States
```vue
<div v-if="query.isLoading" class="loading-state">
  <div class="loading-spinner"></div>
  <p>Loading...</p>
</div>
```

### Error States
```vue
<div v-else-if="query.isError" class="error-state">
  <p>Error loading data. Please try again.</p>
  <button @click="query.refetch()" class="retry-btn">Retry</button>
</div>
```

### Optimistic Updates
```javascript
const mutation = useMutation({
  mutationFn: updateData,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['data'])
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(['data'])
    
    // Optimistically update
    queryClient.setQueryData(['data'], newData)
    
    return { previousData }
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['data'], context.previousData)
  }
})
```

## 🔐 Authentication Flow

1. **Login/Register** → Store token in localStorage
2. **API Requests** → Automatic token injection via axios interceptor
3. **Token Expiry** → Automatic logout and redirect
4. **Protected Routes** → Check authentication status

## 📱 Responsive Design

All components maintain responsive design while adding:
- Loading spinners
- Error messages
- Success notifications
- Retry buttons

## 🚀 Performance Benefits

- **Reduced API Calls**: Smart caching prevents unnecessary requests
- **Background Updates**: Data stays fresh without user interaction
- **Optimistic UI**: Immediate feedback for user actions
- **Efficient Re-renders**: Only affected components update

## 🔧 Development Guidelines

### Adding New API Endpoints

1. **Add to API service** (`src/api/`)
2. **Create composable hook** (`src/composables/`)
3. **Use in component** with proper error handling

### Best Practices

- Always handle loading and error states
- Use optimistic updates for better UX
- Implement proper error boundaries
- Cache data appropriately with staleTime
- Invalidate queries when data changes

## 🐛 Troubleshooting

### Common Issues

1. **401 Errors**: Check token expiration and refresh logic
2. **Cache Issues**: Verify query keys and invalidation
3. **Loading States**: Ensure proper conditional rendering
4. **Error Handling**: Check error boundaries and fallbacks

### Debug Tools

- Vue DevTools for component state
- Network tab for API calls
- Console for error messages
- TanStack Query DevTools (if available)

## 📈 Future Enhancements

- **Real-time Updates**: WebSocket integration
- **Offline Support**: Service worker caching
- **Advanced Caching**: Persistent cache storage
- **Performance Monitoring**: Query performance metrics

## 📞 Support

For issues or questions about the API integration:
1. Check the component-specific error handling
2. Verify API endpoint availability
3. Review network requests in browser dev tools
4. Check authentication token validity

---

This integration provides a robust, scalable foundation for the TravelNinja platform with excellent user experience and developer productivity.
