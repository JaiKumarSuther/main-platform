import { useRouter } from 'vue-router';

// Navigation utility functions
export const useNavigation = () => {
  const router = useRouter();

  // Navigate to search page
  const goToSearch = (query = {}) => {
    router.push({ name: 'Search', query });
  };

  // Navigate to listing details - now using unified component
  const goToListing = (id) => {
    router.push({ name: 'Listing', params: { id } });
  };

  // Legacy navigation methods - redirect to unified component
  const goToActivity = (id) => {
    router.push({ name: 'Activity', params: { id } });
  };

  const goToHotel = (id) => {
    router.push({ name: 'Hotel', params: { id } });
  };

  const goToBike = (id) => {
    router.push({ name: 'Bike', params: { id } });
  };

  const goToCar = (id) => {
    router.push({ name: 'Car', params: { id } });
  };

  const goToTour = (id) => {
    router.push({ name: 'Tour', params: { id } });
  };

  const goToTrek = (id) => {
    router.push({ name: 'Trek', params: { id } });
  };

  const goToExperience = (id) => {
    router.push({ name: 'Experience', params: { id } });
  };

  const goToRental = (id) => {
    router.push({ name: 'Rental', params: { id } });
  };

  const goToStay = (id) => {
    router.push({ name: 'Stay', params: { id } });
  };

  // Backwards compatibility
  const goToGroupTour = (id) => {
    router.push({ name: 'GroupTour', params: { id } });
  };

  const goToPrivateTour = (id) => {
    router.push({ name: 'PrivateTour', params: { id } });
  };

  const goToGuidedExperience = (id) => {
    router.push({ name: 'GuidedExperience', params: { id } });
  };

  // Navigate to supplier/tour guide profiles
  const goToSupplierProfile = (id) => {
    router.push({ name: 'SupplierProfile', params: { id } });
  };

  const goToTourGuideProfile = (id) => {
    router.push({ name: 'TourGuideProfile', params: { id } });
  };

  // Navigate to booking flow
  const goToCheckout = () => {
    router.push({ name: 'Checkout' });
  };

  const goToConfirmRoom = () => {
    router.push({ name: 'ConfirmRoom' });
  };

  const goToBookingConfirm = (id) => {
    router.push({ name: 'BookingConfirm', params: { id } });
  };

  // Navigate to auth pages
  const goToLogin = (redirect = null) => {
    const query = redirect ? { redirect } : {};
    router.push({ name: 'Login', query });
  };

  const goToSignUp = () => {
    router.push({ name: 'SignUp' });
  };

  const goToResetPassword = () => {
    router.push({ name: 'ResetPassword' });
  };

  const goToChangePassword = () => {
    router.push({ name: 'ChangePassword' });
  };

  // Navigate to profile pages
  const goToAccount = () => {
    router.push({ name: 'Account' });
  };

  const goToBookings = () => {
    router.push({ name: 'BookingsList' });
  };

  const goToBookingDetails = (id) => {
    router.push({ name: 'BookingDetails', params: { id } });
  };

  const goToMessages = () => {
    router.push({ name: 'Messages' });
  };

  const goToSaved = () => {
    router.push({ name: 'Saved' });
  };

  const goToSupportRequests = () => {
    router.push({ name: 'SupportRequest' });
  };

  const goToCreateSupportRequest = () => {
    router.push({ name: 'CreateSupportRequest' });
  };

  const goToOpenSupportRequests = () => {
    router.push({ name: 'OpenSupportRequest' });
  };

  const goToClosedSupportRequests = () => {
    router.push({ name: 'CloseSupportRequest' });
  };

  const goToRefunds = () => {
    router.push({ name: 'Refunds' });
  };

  const goToPayments = () => {
    router.push({ name: 'Payments' });
  };

  // Navigate to home/search
  const goToHome = () => {
    router.push({ name: 'Search' });
  };

  // Go back
  const goBack = () => {
    router.back();
  };

  // Go forward
  const goForward = () => {
    router.forward();
  };

  // Navigate with query parameters
  const navigateWithQuery = (name, query = {}) => {
    router.push({ name, query });
  };

  // Navigate with params
  const navigateWithParams = (name, params = {}) => {
    router.push({ name, params });
  };

  // Replace current route
  const replaceRoute = (name, params = {}, query = {}) => {
    router.replace({ name, params, query });
  };

  return {
    // Search and listings
    goToSearch,
    goToListing,
    goToActivity,
    goToHotel,
    goToBike,
    goToCar,
    goToTour,
    goToTrek,
    goToExperience,
    goToRental,
    goToStay,
    goToGroupTour,
    goToPrivateTour,
    goToGuidedExperience,
    goToSupplierProfile,
    goToTourGuideProfile,

    // Booking flow
    goToCheckout,
    goToConfirmRoom,
    goToBookingConfirm,

    // Auth
    goToLogin,
    goToSignUp,
    goToResetPassword,
    goToChangePassword,

    // Profile
    goToAccount,
    goToBookings,
    goToBookingDetails,
    goToMessages,
    goToSaved,
    goToSupportRequests,
    goToCreateSupportRequest,
    goToOpenSupportRequests,
    goToClosedSupportRequests,
    goToRefunds,
    goToPayments,

    // General navigation
    goToHome,
    goBack,
    goForward,
    navigateWithQuery,
    navigateWithParams,
    replaceRoute
  };
};

// Route constants for easy reference
export const ROUTES = {
  SEARCH: 'Search',
  LISTING: 'Listing',
  ACTIVITY: 'Activity',
  HOTEL: 'Hotel',
  BIKE: 'Bike',
  CAR: 'Car',
  TOUR: 'Tour',
  TREK: 'Trek',
  EXPERIENCE: 'Experience',
  RENTAL: 'Rental',
  STAY: 'Stay',
  GROUP_TOUR: 'GroupTour',
  PRIVATE_TOUR: 'PrivateTour',
  GUIDED_EXPERIENCE: 'GuidedExperience',
  SUPPLIER_PROFILE: 'SupplierProfile',
  TOUR_GUIDE_PROFILE: 'TourGuideProfile',
  CHECKOUT: 'Checkout',
  CONFIRM_ROOM: 'ConfirmRoom',
  BOOKING_CONFIRM: 'BookingConfirm',
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
  RESET_PASSWORD: 'ResetPassword',
  CHANGE_PASSWORD: 'ChangePassword',
  ACCOUNT: 'Account',
  BOOKINGS_LIST: 'BookingsList',
  BOOKING_DETAILS: 'BookingDetails',
  MESSAGES: 'Messages',
  SAVED: 'Saved',
  SUPPORT_REQUEST: 'SupportRequest',
  CREATE_SUPPORT_REQUEST: 'CreateSupportRequest',
  OPEN_SUPPORT_REQUEST: 'OpenSupportRequest',
  CLOSE_SUPPORT_REQUEST: 'CloseSupportRequest',
  REFUNDS: 'Refunds',
  PAYMENTS: 'Payments'
};

// Route path constants
export const PATHS = {
  HOME: '/',
  SEARCH: '/search',
  SMART_SEARCH: '/smart-search',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  PROFILE: '/profile',
  ACCOUNT: '/profile/account',
  BOOKINGS: '/profile/bookings',
  MESSAGES: '/profile/messages',
  SAVED: '/profile/saved',
  SUPPORT_REQUESTS: '/profile/support-requests',
  CREATE_SUPPORT_REQUEST: '/profile/support-requests/create',
  OPEN_SUPPORT_REQUESTS: '/profile/support-requests/open',
  CLOSED_SUPPORT_REQUESTS: '/profile/support-requests/closed',
  REFUNDS: '/profile/refunds',
  PAYMENTS: '/payments',
  CHECKOUT: '/checkout',
  CONFIRM_ROOM: '/confirm-room'
};

// Helper function to build listing URLs - updated for unified system
export const buildListingUrl = (type, id) => {
  // Mapping for database listing types to route names
  const routeMap = {
    // Database types -> Route names
    'activity': 'Activity',
    'hotel': 'Hotel', 
    'stay': 'Stay',
    'car_rental': 'Car',
    'bike_rental': 'Bike',
    'rental': 'Rental',
    'tour': 'Tour',
    'trek': 'Trek',
    'experience': 'Experience',
    
    // Legacy support
    'bike': 'Bike',
    'car': 'Car',
    'groupTour': 'GroupTour',
    'privateTour': 'PrivateTour',
    'guidedExperience': 'GuidedExperience'
  };

  const routeName = routeMap[type];
  if (!routeName) {
    console.warn(`Unknown listing type: ${type}, using generic listing route`);
    return { name: 'Listing', params: { id } };
  }

  return { name: routeName, params: { id } };
};

// Helper function to get the appropriate route for a listing based on its type
export const getListingRoute = (listingType, id) => {
  switch (listingType) {
    case 'car_rental':
      return { name: 'Car', params: { id } };
    case 'bike_rental':
      return { name: 'Bike', params: { id } };
    case 'hotel':
      return { name: 'Hotel', params: { id } };
    case 'stay':
      return { name: 'Stay', params: { id } };
    case 'tour':
      return { name: 'Tour', params: { id } };
    case 'trek':
      return { name: 'Trek', params: { id } };
    case 'activity':
      return { name: 'Activity', params: { id } };
    case 'experience':
      return { name: 'Experience', params: { id } };
    case 'rental':
      return { name: 'Rental', params: { id } };
    default:
      // Fallback to generic listing route
      return { name: 'Listing', params: { id } };
  }
};

// Helper function to check if current route requires auth
export const isAuthRequired = (route) => {
  return route?.meta?.requiresAuth === true;
};

// Helper function to get current route layout
export const getCurrentLayout = (route) => {
  return route?.meta?.layout || 'default';
};

