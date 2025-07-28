import { createRouter, createWebHistory } from "vue-router";

// Main views
import Activity from "../views/Activity.vue";
import Bike from "../views/Bike.vue";
import BookingConfirm from "../views/BookingConfirm.vue";
import Car from "../views/Car.vue";
import Checkout from "../views/Checkout.vue";
import ConfirmRoom from "../views/ConfirmRoom.vue";
import GroupTour from "../views/GroupTour.vue";
import GuidedExperience from "../views/GuidedExperience.vue";
import Hotel from "../views/Hotel.vue";
import PrivateTour from "../views/PrivateTour.vue";
import Search from "../views/Search.vue";
import SmartSearch from "../views/SmartSearch.vue";
import SupplierProfile from "../views/SupplierProfile.vue";
import TourGuideProfile from "../views/TourGuideProfile.vue";
import Trek from "../views/Trek.vue";

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
import Bookings from "../views/Bookings.vue";
import Messages from "../views/Messages.vue";
import SupportRequest from "../views/SupportRequest.vue";
import OpenSupportRequest from "../views/OpenSupportRequest.vue";
import CreateSupportRequest from "../views/CreateSupportRequest.vue";
import CloseSupportRequest from "../views/CloseSupportRequest.vue";
import Payments from "../views/Payments.vue";

const routes = [
  // Public pages
  { path: "/activity", component: Activity },
  { path: "/bike", component: Bike },
  { path: "/booking-confirm", component: BookingConfirm },
  { path: "/car", component: Car },
  { path: "/checkout", component: Checkout },
  { path: "/confirm-room", component: ConfirmRoom },
  { path: "/group-tour", component: GroupTour },
  { path: "/guided-experience", component: GuidedExperience },
  { path: "/hotel", component: Hotel },
  { path: "/private-tour", component: PrivateTour },
  { path: "/search", component: Search },
  { path: "/smart-search", component: SmartSearch },
  { path: "/supplier-profile", component: SupplierProfile },
  { path: "/tour-guide-profile", component: TourGuideProfile },
  { path: "/trek", component: Trek },
  // Auth nested routes
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "", redirect: "/auth/login" },
      { path: "login", component: Login },
      { path: "signup", component: SignUp },
      { path: "reset-password", component: ResetPassword },
      { path: "change-password", component: ChangePassword },
    ],
  },

  // Profile layout with nested pages
  {
    path: "/profile",
    component: Profile,
    children: [
      { path: "", redirect: "/profile/account" },
      { path: "account", component: Account },
      { path: "bookings", component: Bookings },
      { path: "messages", component: Messages },
      { path: "saved", component: Saved },
      { path: "support-requests", component: SupportRequest },
      { path: "support-requests/create", component: CreateSupportRequest },
      { path: "support-requests/open", component: OpenSupportRequest },
      { path: "support-requests/closed", component: CloseSupportRequest },
      { path: "refunds", component: Refunds },
    ],
  },

  // Optional top-level utilities
  { path: "/payments", component: Payments },

  // Catch-all 404 page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ----------------------
// |                    |
// |    Route Guard     |
// |                    |
// ----------------------

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/auth/change-password",
    "/auth/reset-password",
    "/tour-guide-profile",
    "/guided-experience",
    "/supplier-profile",
    "/booking-confirm",
    "/private-tour",
    "/confirm-room",
    "/smart-search",
    "/auth/signup",
    "/group-tour",
    "/auth/login",
    "/checkout",
    "/activity",
    "/search",
    "/hotel",
    "/bike",
    "/trek",
    "/car",
  ];

  const isAuthPage = to.path.startsWith("/auth");
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = isAuthenticated();
  
  // If navigating to root path
  if (to.path === "/") {
    return next(loggedIn ? "/profile" : "/auth/login");
  }

  // Prevent logged-in users from accessing auth pages
  if (loggedIn && isAuthPage) {
    return next("/profile");
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!loggedIn && authRequired) {
    return next("/auth/login");
  }

  return next();
});

export default router;