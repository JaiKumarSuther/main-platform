# Travel Ninja - Routing Documentation

## Overview

This document describes the routing structure and navigation system for the Travel Ninja Vue application.

## Route Structure

### Public Routes (No Authentication Required)

| Route | Name | Component | Description |
|-------|------|-----------|-------------|
| `/` | - | Redirect | Redirects to `/search` |
| `/search` | `Search` | Search.vue | Main search page |
| `/smart-search` | `SmartSearch` | SmartSearch.vue | Advanced search |
| `/activity/:id` | `Activity` | Activity.vue | Activity details |
| `/hotel/:id` | `Hotel` | Hotel.vue | Hotel details |
| `/bike/:id` | `Bike` | Bike.vue | Bike rental details |
| `/car/:id` | `Car` | Car.vue | Car rental details |
| `/group-tour/:id` | `GroupTour` | GroupTour.vue | Group tour details |
| `/private-tour/:id` | `PrivateTour` | PrivateTour.vue | Private tour details |
| `/guided-experience/:id` | `GuidedExperience` | GuidedExperience.vue | Guided experience details |
| `/trek/:id` | `Trek` | Trek.vue | Trek details |
| `/supplier-profile/:id` | `SupplierProfile` | SupplierProfile.vue | Supplier profile |
| `/tour-guide-profile/:id` | `TourGuideProfile` | TourGuideProfile.vue | Tour guide profile |

### Authentication Routes

| Route | Name | Component | Description |
|-------|------|-----------|-------------|
| `/auth/login` | `Login` | Login.vue | User login |
| `/auth/signup` | `SignUp` | SignUp.vue | User registration |
| `/auth/reset-password` | `ResetPassword` | ResetPassword.vue | Password reset |
| `/auth/change-password` | `ChangePassword` | ChangePassword.vue | Change password |

### Protected Routes (Authentication Required)

#### Booking Flow
| Route | Name | Component | Description |
|-------|------|-----------|-------------|
| `/checkout` | `Checkout` | Checkout.vue | Payment checkout |
| `/confirm-room` | `ConfirmRoom` | ConfirmRoom.vue | Room confirmation |
| `/booking-confirm/:id` | `BookingConfirm` | BookingConfirm.vue | Booking confirmation |
| `/payments` | `Payments` | Payments.vue | Payment management |

#### Profile Routes
| Route | Name | Component | Description |
|-------|------|-----------|-------------|
| `/profile/account` | `Account` | Account.vue | User account settings |
| `/profile/bookings` | `BookingsList` | BookingsList.vue | User bookings list |
| `/profile/bookings/:id` | `BookingDetails` | Bookings.vue | Individual booking details |
| `/profile/messages` | `Messages` | Messages.vue | User messages |
| `/profile/saved` | `Saved` | Saved.vue | Saved items |
| `/profile/support-requests` | `SupportRequest` | SupportRequest.vue | Support requests list |
| `/profile/support-requests/create` | `CreateSupportRequest` | CreateSupportRequest.vue | Create support request |
| `/profile/support-requests/open` | `OpenSupportRequest` | OpenSupportRequest.vue | Open support requests |
| `/profile/support-requests/closed` | `CloseSupportRequest` | CloseSupportRequest.vue | Closed support requests |
| `/profile/refunds` | `Refunds` | Refunds.vue | Refund management |

### Error Routes

| Route | Name | Component | Description |
|-------|------|-----------|-------------|
| `/:pathMatch(.*)*` | `NotFound` | NotFound.vue | 404 page |

## Navigation Utilities

### Using the Navigation Composable

```javascript
import { useNavigation } from '@/utils/navigation';

const { 
  goToSearch, 
  goToHotel, 
  goToLogin, 
  goToAccount,
  goBack 
} = useNavigation();

// Navigate to search with query parameters
goToSearch({ location: 'Hunza', type: 'hotel' });

// Navigate to hotel details
goToHotel('hotel-123');

// Navigate to login with redirect
goToLogin('/profile/account');

// Navigate to account
goToAccount();

// Go back
goBack();
```

### Route Constants

```javascript
import { ROUTES, PATHS } from '@/utils/navigation';

// Use route names
router.push({ name: ROUTES.SEARCH });

// Use route paths
router.push(PATHS.LOGIN);
```

## Route Meta Information

Each route includes meta information for better control:

```javascript
{
  path: "/hotel/:id",
  name: "Hotel",
  component: Hotel,
  meta: { 
    title: "Hotel Details",        // Page title
    requiresAuth: false,           // Authentication requirement
    layout: "default"              // Layout type
  }
}
```

### Meta Properties

- **title**: Page title for browser tab
- **requiresAuth**: Whether authentication is required
- **layout**: Layout type (default, minimal, auth, profile)

## Navigation Guards

### Authentication Guard

The router automatically:
- Redirects unauthenticated users to login for protected routes
- Saves the intended destination for post-login redirect
- Prevents authenticated users from accessing auth pages

### Role-Based Access (Future)

```javascript
meta: { 
  roles: ['customer', 'supplier']  // Allowed user roles
}
```

## Page Transitions

The app includes smooth page transitions:

- **Fade**: Default transition for most pages
- **Slide Left**: For listing detail pages
- **Slide Up**: For profile pages
- **Fade Scale**: For checkout and payment pages

## Breadcrumb Navigation

Breadcrumbs are automatically generated based on the current route:

- Home → Search Results
- Home → Hotels → Hotel Details
- Home → My Account
- Home → My Bookings → Booking Details

## URL Structure Examples

```
/search?location=Hunza&type=hotel
/hotel/hotel-123
/activity/activity-456
/profile/bookings
/profile/bookings/booking-789
/auth/login?redirect=/profile/account
```

## Best Practices

### 1. Use Named Routes

```javascript
// ✅ Good
router.push({ name: 'Hotel', params: { id: 'hotel-123' } });

// ❌ Avoid
router.push('/hotel/hotel-123');
```

### 2. Handle Query Parameters

```javascript
// Navigate with query
goToSearch({ location: 'Hunza', type: 'hotel' });

// Read query parameters
const route = useRoute();
const location = route.query.location;
```

### 3. Use Navigation Utilities

```javascript
// ✅ Good
const { goToHotel } = useNavigation();
goToHotel(id);

// ❌ Avoid
router.push(`/hotel/${id}`);
```

### 4. Handle Loading States

```javascript
// Show loading during navigation
const loading = ref(false);

const navigateToHotel = async (id) => {
  loading.value = true;
  await goToHotel(id);
  loading.value = false;
};
```

## Error Handling

### Route Errors

The router includes error handling:

```javascript
router.onError((error) => {
  console.error("Router error:", error);
  router.push("/");
});
```

### 404 Handling

Invalid routes automatically redirect to the NotFound component.

## Testing Routes

### Unit Testing

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Test route navigation
await router.push('/hotel/test-id');
expect(router.currentRoute.value.name).toBe('Hotel');
expect(router.currentRoute.value.params.id).toBe('test-id');
```

### E2E Testing

```javascript
// Test navigation flow
cy.visit('/search');
cy.get('[data-testid="hotel-card"]').first().click();
cy.url().should('include', '/hotel/');
cy.get('[data-testid="book-now"]').click();
cy.url().should('include', '/checkout');
```

## Performance Considerations

### Lazy Loading

Some routes use lazy loading for better performance:

```javascript
{
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("../views/NotFound.vue")
}
```

### Scroll Behavior

The router automatically scrolls to top on navigation:

```javascript
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
}
```

## Future Enhancements

1. **Route Analytics**: Track page views and user navigation patterns
2. **Deep Linking**: Support for direct links to specific content
3. **Route Caching**: Cache frequently accessed routes
4. **Progressive Loading**: Load route data progressively
5. **Offline Support**: Handle navigation when offline

