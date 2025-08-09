import { createRouter, createWebHistory } from "vue-router";

// Main views
import ListingPage from "../components/ListingPage.vue";
import BookingConfirm from "../views/BookingConfirm.vue";
import Checkout from "../views/Checkout.vue";
import ConfirmRoom from "../views/ConfirmRoom.vue";
import Search from "../views/Search.vue";
import SmartSearch from "../views/SmartSearch.vue";
import SupplierProfile from "../views/SupplierProfile.vue";
import TourGuideProfile from "../views/TourGuideProfile.vue";

// Auth views
import Auth from "../views/Auth.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ChangePassword from "../views/ChangePassword.vue";

// Profile layout + nested views
import Saved from "../views/Saved.vue";
import Refunds from "../views/Refunds.vue";
import Profile from "../views/Profile.vue";
import Account from "../views/Account.vue";
import BookingsList from "../views/BookingsList.vue";
import Bookings from "../views/Bookings.vue";
import Messages from "../views/Messages.vue";
import SupportRequest from "../views/SupportRequest.vue";
import OpenSupportRequest from "../views/OpenSupportRequest.vue";
import CreateSupportRequest from "../views/CreateSupportRequest.vue";
import CloseSupportRequest from "../views/CloseSupportRequest.vue";
import Payments from "../views/Payments.vue";

const routes = [
  // Root redirect
  {
    path: "/",
    redirect: "/search",
    meta: { title: "Travel Ninja - Home" }
  },

  // Public listing pages (no auth required) - All use unified ListingPage component
  {
    path: "/activity/:id",
    name: "Activity",
    component: ListingPage,
    meta: { 
      title: "Activity Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/bike/:id",
    name: "Bike",
    component: ListingPage,
    meta: { 
      title: "Bike Rental",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/car/:id",
    name: "Car",
    component: ListingPage,
    meta: { 
      title: "Car Rental",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/hotel/:id",
    name: "Hotel",
    component: ListingPage,
    meta: { 
      title: "Hotel Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/stay/:id",
    name: "Stay",
    component: ListingPage,
    meta: { 
      title: "Stay Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/tour/:id",
    name: "Tour",
    component: ListingPage,
    meta: { 
      title: "Tour Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/group-tour/:id",
    name: "GroupTour",
    component: ListingPage,
    meta: { 
      title: "Group Tour",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/private-tour/:id",
    name: "PrivateTour",
    component: ListingPage,
    meta: { 
      title: "Private Tour",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/guided-experience/:id",
    name: "GuidedExperience",
    component: ListingPage,
    meta: { 
      title: "Guided Experience",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/experience/:id",
    name: "Experience",
    component: ListingPage,
    meta: { 
      title: "Experience Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/trek/:id",
    name: "Trek",
    component: ListingPage,
    meta: { 
      title: "Trek Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/rental/:id",
    name: "Rental",
    component: ListingPage,
    meta: { 
      title: "Rental Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  // Generic listing route for any listing type
  {
    path: "/listing/:id",
    name: "Listing",
    component: ListingPage,
    meta: { 
      title: "Listing Details",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/supplier-profile/:id",
    name: "SupplierProfile",
    component: SupplierProfile,
    meta: { 
      title: "Supplier Profile",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/tour-guide-profile/:id",
    name: "TourGuideProfile",
    component: TourGuideProfile,
    meta: { 
      title: "Tour Guide Profile",
      requiresAuth: false,
      layout: "default"
    }
  },

  // Search pages
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { 
      title: "Search Results",
      requiresAuth: false,
      layout: "default"
    }
  },
  {
    path: "/smart-search",
    name: "SmartSearch",
    component: SmartSearch,
    meta: { 
      title: "Smart Search",
      requiresAuth: false,
      layout: "default"
    }
  },

  // Booking flow (requires auth)
  {
    path: "/booking-confirm/:id",
    name: "BookingConfirm",
    component: BookingConfirm,
    meta: { 
      title: "Booking Confirmed",
      requiresAuth: true,
      layout: "minimal"
    }
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { 
      title: "Checkout",
      requiresAuth: true,
      layout: "minimal"
    }
  },
  {
    path: "/confirm-room",
    name: "ConfirmRoom",
    component: ConfirmRoom,
    meta: { 
      title: "Confirm Room",
      requiresAuth: true,
      layout: "minimal"
    }
  },

  // Auth routes
  {
    path: "/auth",
    component: Auth,
    meta: { 
      title: "Authentication",
      requiresAuth: false,
      layout: "auth"
    },
    children: [
      { 
        path: "", 
        redirect: "/auth/login",
        meta: { title: "Login" }
      },
      { 
        path: "login", 
        name: "Login",
        component: Login,
        meta: { title: "Login" }
      },
      { 
        path: "signup", 
        name: "SignUp",
        component: SignUp,
        meta: { title: "Sign Up" }
      },
      { 
        path: "reset-password", 
        name: "ResetPassword",
        component: ResetPassword,
        meta: { title: "Reset Password" }
      },
      { 
        path: "change-password", 
        name: "ChangePassword",
        component: ChangePassword,
        meta: { title: "Change Password" }
      },
    ],
  },

  // Profile routes (requires auth)
  {
    path: "/profile",
    component: Profile,
    meta: { 
      title: "My Profile",
      requiresAuth: true,
      layout: "profile"
    },
    children: [
      { 
        path: "", 
        redirect: "/profile/account",
        meta: { title: "My Account" }
      },
      { 
        path: "account", 
        name: "Account",
        component: Account,
        meta: { title: "My Account" }
      },
      { 
        path: "bookings", 
        name: "BookingsList",
        component: BookingsList,
        meta: { title: "My Bookings" }
      },
      { 
        path: "bookings/:id", 
        name: "BookingDetails",
        component: Bookings,
        meta: { title: "Booking Details" }
      },
      { 
        path: "messages", 
        name: "Messages",
        component: Messages,
        meta: { title: "Messages" }
      },
      { 
        path: "saved", 
        name: "Saved",
        component: Saved,
        meta: { title: "Saved Items" }
      },
      { 
        path: "support-requests", 
        name: "SupportRequest",
        component: SupportRequest,
        meta: { title: "Support Requests" }
      },
      { 
        path: "support-requests/create", 
        name: "CreateSupportRequest",
        component: CreateSupportRequest,
        meta: { title: "Create Support Request" }
      },
      { 
        path: "support-requests/open", 
        name: "OpenSupportRequest",
        component: OpenSupportRequest,
        meta: { title: "Open Support Requests" }
      },
      { 
        path: "support-requests/closed", 
        name: "CloseSupportRequest",
        component: CloseSupportRequest,
        meta: { title: "Closed Support Requests" }
      },
      { 
        path: "refunds", 
        name: "Refunds",
        component: Refunds,
        meta: { title: "Refunds" }
      },
    ],
  },

  // Payment routes (requires auth)
  {
    path: "/payments",
    name: "Payments",
    component: Payments,
    meta: { 
      title: "Payments",
      requiresAuth: true,
      layout: "minimal"
    }
  },

  // 404 page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: { 
      title: "Page Not Found",
      requiresAuth: false,
      layout: "minimal"
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top for new routes
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// ----------------------
// |                    |
// |  Navigation Guards |
// |                    |
// ----------------------

// Check if user is authenticated
const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

// Get user role
const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role || "customer";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "customer";
  }
};

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Update page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Travel Ninja`;
  } else {
    document.title = "Travel Ninja - Discover Hotels, Places & Experiences";
  }

  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  // Handle authentication requirements
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Save the intended destination
    next({
      path: "/auth/login",
      query: { redirect: to.fullPath }
    });
    return;
  }

  // Prevent authenticated users from accessing auth pages
  if (isLoggedIn && to.path.startsWith("/auth")) {
    next("/profile/account");
    return;
  }

  // Handle role-based access (if needed in the future)
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next("/profile/account");
    return;
  }

  // Continue to the route
  next();
});

// After navigation guard
router.afterEach((to, from) => {
  // Log navigation for analytics
  console.log(`🚀 Navigation: ${from.path} → ${to.path}`);
  
  // Track page views (you can integrate with analytics here)
  if (to.name) {
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: to.path });
  }
});

// Error handling
router.onError((error) => {
  console.error("Router error:", error);
  // You can redirect to an error page here
  router.push("/");
});

export default router;