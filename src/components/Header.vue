<!-- Header.vue -->
<template>
  <header>
    <!-- Desktop Header -->
    <div class="desktop-header">
      <div class="header-left">
        <router-link to="/search" class="logo">
          <img :src="img0" alt="Travel Ninja Logo" />travelninja
        </router-link>
        <div id="searchTrigger" class="input-container" @click="toggleSearchDropdown"
        style="display: flex; margin: 10px">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30.82948 30.82344"
          >
            <path
              class="cls-1"
              d="M23.13941,24.55719A13.9922,13.9922,0,0,1,4.06979,4.10223,13.99292,13.99292,0,0,1,24.58562,23.10991c.274.254.56082.50388.82982.77168q2.48991,2.4788,4.97429,4.96312a1.211,1.211,0,0,1,.43948.90628,1.02261,1.02261,0,0,1-.5568.93152,1.00561,1.00561,0,0,1-1.11136-.05626,2.51018,2.51018,0,0,1-.34993-.31245q-2.72425-2.71977-5.44436-5.44369A2.5105,2.5105,0,0,1,23.13941,24.55719Zm2.68047-10.58433A11.8358,11.8358,0,1,0,13.95741,25.7928,11.83954,11.83954,0,0,0,25.81988,13.97286Z"
              fill="#283456"
            />
          </svg>
          <input
            type="text"
            placeholder="Discover hotels, places & experiences..."
            v-model="searchQuery"
            @keyup.enter="performSearch"
          />
          <div class="searchdropdown-container" style="position: absolute; right: 150px; top: 40px" >
            <div class="searchbar-dropdown" v-show="showSearchDropdown">
              <div class="places" >
                <h2>Places</h2>
                <ul>
                  <li @click="searchPlace('Hingol National Park')">Hingol National Park</li>
                  <li @click="searchPlace('Hunza')">Hunza</li>
                </ul>
              </div>
              <div class="hotels">
                <h2>Hotels</h2>
                <ul>
                  <li @click="searchByType('hotel', 'Hiraya Resort')">Hiraya Resort</li>
                  <li @click="searchByType('hotel', 'Hilton Hotel')">Hilton Hotel</li>
                  <li @click="searchByType('hotel', 'Hotel Cherry Garden')">Hotel Cherry Garden</li>
                </ul>
              </div>
              <div class="car-rentals">
                <h2>Car Rentals</h2>
                <ul>
                  <li @click="searchByType('car_rental', 'Hiraya Rent a car')">Hiraya Rent a car</li>
                  <li @click="searchByType('car_rental', 'car for rent')">car for rent</li>
                  <li @click="searchByType('car_rental', 'car rental')">Car rentals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="header-right">
        <nav>
          <ul>
            <li @click="toggleHotels">Explore</li>
            <li :class="{ active: showPlaces }" @click="togglePlaces">
              Places
            </li>
            <li @click="searchByType('trek')">Trekking</li>
          </ul>
        </nav>
        <div class="header-icons">
          <div class="menu">
            <img :src="img1" alt="" /><span
              >US Dollar</span
            >
          </div>
          <div class="menu" @click="mobileGoToSupportRequests">
            <img :src="img2" alt="" /><span
              >Support</span
            >
          </div>
          <router-link to="/profile/saved" v-if="isAuthenticated">
            <img :src="img3" alt="Wishlist" />
          </router-link>
          <img :src="img3" alt="Wishlist" v-else @click="goToLogin" />
          
          <router-link to="/profile/account" v-if="isAuthenticated">
            <img :src="img4" alt="Profile" />
          </router-link>
          <img :src="img4" alt="Profile" v-else @click="goToLogin" />
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header">
      <div class="mobile-header-container">
        <div class="logo-section">
          <img
            :src="img5"
            alt="Travel Ninja Logo"
            class="logo-icon"
          />
        </div>
        <div class="icon-section">
          <img
            :src="img6"
            alt="Search"
            class="header-icon"
            @click="mobileGoToSearch"
          />
          <img
            :src="img3"
            alt="Wishlist"
            class="header-icon"
            @click="isAuthenticated ? mobileGoToSaved() : mobileGoToLogin()"
          />
          <img
            :src="img4"
            alt="Profile"
            class="header-icon"
            @click="isAuthenticated ? mobileGoToAccount() : mobileGoToLogin()"
          />
          <img
            :src="img7"
            alt="Menu"
            class="header-icon"
            @click="toggleMobileMenu"
          />
        </div>
      </div>

      <div class="mobile-menu" v-show="showMobileMenu">
        <div class="menu-header">
          <button class="close-btn" @click="toggleMobileMenu">
            <svg
              width="30"
              height="30"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#5A6783"
                stroke-width="4"
              />
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
          </button>
        </div>

        <div class="menu-content">
          <section>
            <h3>Profile</h3>
            <p @click="isAuthenticated ? mobileGoToAccount() : mobileGoToLogin()">
              <img :src="img4" alt="" /> 
              {{ isAuthenticated ? 'My Account' : 'Log in or sign up' }}
            </p>
            <p @click="isAuthenticated ? mobileGoToSaved() : mobileGoToLogin()">
              <img
                :src="img3"
                alt=""
              />
              My wishlist
            </p>
            <p @click="isAuthenticated ? mobileGoToBookings() : mobileGoToLogin()">
              <img :src="img8" alt="" /> Manage
              bookings
            </p>
          </section>
          <section>
            <h3>Explore</h3>
            <p @click="mobileGoToSearch">
              <img :src="img9" alt="" />
              Discover hotels, tours, activities & more…
              <img
                class="arrow-menu"
                :src="img10"
                alt=""
              />
            </p>
            <p>
              <img :src="img11" alt="" />
              Places
              <img
                class="arrow-menu"
                :src="img10"
                alt=""
              />
            </p>
          </section>
          <div class="border"></div>
          <section>
            <p @click="mobileGoToSupportRequests">
              <img :src="img2" alt="" /> Support
              <img
                class="arrow-menu"
                :src="img10"
                alt=""
              />
            </p>
            <p>
              <img :src="img1" alt="" /> Currency:
              Pakistani rupees
              <img
                class="arrow-menu"
                :src="img10"
                alt=""
              />
            </p>
          </section>
        </div>
      </div>
    </div>
  </header>

  <!-- Section Toggles -->
  <div class="places-container">
    <div id="locationSection" class="section" v-show="showPlaces">
      <div class="column">
        <h3>Gilgit Baltistan</h3>
        <ul>
          <li @click="searchPlace('Hunza Valley')">Hunza Valley</li>
          <li @click="searchPlace('Skardu')">Skardu</li>
          <li @click="searchPlace('Gilgit')">Gilgit</li>
          <li @click="searchPlace('Khaplu')">Khaplu</li>
          <li @click="searchPlace('Shigar Valley')">Shigar Valley</li>
          <li @click="searchPlace('Astore Valley')">Astore Valley</li>
          <li @click="searchPlace('Fairy Meadows')">Fairy Meadows</li>
          <li @click="searchPlace('Deosai National Park')">Deosai National Park</li>
          <li @click="searchPlace('Khunjerab National Park')">Khunjerab National Park</li>
          <li @click="searchPlace('Nagar Valley')">Nagar Valley</li>
          <li @click="searchPlace('Chunda Valley')">Chunda Valley</li>
          <li @click="searchPlace('Nangma Valley')">Nangma Valley</li>
        </ul>
      </div>
      <div class="column">
        <h3>Khyber Pakhtunkhwa</h3>
        <ul>
          <li @click="searchPlace('Swat Valley')">Swat Valley</li>
          <li @click="searchPlace('Kumrat Valley')">Kumrat Valley</li>
          <li @click="searchPlace('Chitral & Kalash')">Chitral & Kalash</li>
          <li @click="searchPlace('Shandur Pass')">Shandur Pass</li>
          <li @click="searchPlace('Kaghan Valley')">Kaghan Valley</li>
          <li @click="searchPlace('Naran Valley')">Naran Valley</li>
          <li @click="searchPlace('Thandiani')">Thandiani</li>
          <li @click="searchPlace('Balakot')">Balakot</li>
          <li @click="searchPlace('Shogran & Siri Paye')">Shogran & Siri Paye</li>
          <li @click="searchPlace('Galiyat')">Galiyat</li>
        </ul>
      </div>
      <div class="column">
        <h3>Punjab</h3>
        <ul>
          <li @click="searchPlace('Islamabad')">Islamabad</li>
          <li @click="searchPlace('Murree')">Murree</li>
          <li @click="searchPlace('Chakwal')">Chakwal</li>
          <li @click="searchPlace('Lahore')">Lahore</li>
        </ul>
      </div>
      <div class="column">
        <h3>Balochistan</h3>
        <ul>
          <li @click="searchPlace('Ziarat')">Ziarat</li>
          <li @click="searchPlace('Hingol National Park')">Hingol National Park</li>
          <li @click="searchPlace('Moola Chotok Waterfalls')">Moola Chotok Waterfalls</li>
          <li @click="searchPlace('Astola Island')">Astola Island</li>
          <li @click="searchPlace('Ormara Beach')">Ormara Beach</li>
        </ul>
      </div>
      <div class="column">
        <h3>Sindh</h3>
        <ul>
          <li @click="searchPlace('Karachi')">Karachi</li>
          <li @click="searchPlace('Kund Malir')">Kund Malir</li>
          <li @click="searchPlace('Ranikot Fort')">Ranikot Fort</li>
          <li @click="searchPlace('Gorakh Hill')">Gorakh Hill</li>
          <li @click="searchPlace('Keenjhar Lake')">Keenjhar Lake</li>
          <li @click="searchPlace('Manchar Lake')">Manchar Lake</li>
          <li @click="searchPlace('That')">That</li>
        </ul>
      </div>
      <div class="column">
        <h3>Kashmir</h3>
        <ul>
          <li @click="searchPlace('Neelum Valley')">Neelum Valley</li>
          <li @click="searchPlace('Leepa Valley')">Leepa Valley</li>
          <li @click="searchPlace('Ganga Choti')">Ganga Choti</li>
          <li @click="searchPlace('Muzaffarabad')">Muzaffarabad</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="places-container">
    <div id="hotelsSection" class="section" v-show="showHotels">
        <div class="column">
          <h3>Hotels</h3>
          <ul>
            <li @click="searchByType('hotel', 'Hotels in Skardu')">Hotels in Skardu</li>
            <li @click="searchByType('hotel', 'Hotels in Hunza')">Hotels in Hunza</li>
            <li @click="searchByType('hotel', 'Hotels in Khaplu')">Hotels in Khaplu</li>
            <li @click="searchByType('hotel', 'Hotels in Gilgit')">Hotels in Gilgit</li>
            <li @click="searchByType('hotel', 'Hotels in Naran')">Hotels in Naran</li>
            <li @click="searchByType('hotel', 'Hotels in Kaghan')">Hotels in Kaghan</li>
            <li @click="searchByType('hotel', 'Hotels in Swat')">Hotels in Swat</li>
            <li @click="searchByType('hotel', 'Hotels in Kalam')">Hotels in Kalam</li>
            <li @click="searchByType('hotel', 'Hotels in Deosai')">Hotels in Deosai</li>
            <li @click="searchByType('hotel', 'Hotels in Balakot')">Hotels in Balakot</li>
            <li @click="searchByType('hotel', 'Hotels in Murree')">Hotels in Murree</li>
            <li @click="searchByType('hotel', 'Hotels in Kashmir')">Hotels in Kashmir</li>
          </ul>
        </div>
        <div class="column">
          <h3>Tours</h3>
          <ul>
            <li @click="searchByType('tour', 'Cultural Tours')">Cultural Tours</li>
            <li @click="searchByType('tour', 'Adventure Tours')">Adventure Tours</li>
            <li @click="searchByType('tour', 'City Tours')">City Tours</li>
            <li @click="searchByType('tour', 'Food Tours')">Food Tours</li>
            <li @click="searchByType('tour', 'Safari Tours')">Safari Tours</li>
            <li @click="searchByType('tour', 'Wildlife & Nature Tours')">Wildlife & Nature Tours</li>
            <li @click="searchByType('tour', 'Festival Tours')">Festival Tours</li>
            <li @click="searchByType('tour', 'Photography Tours')">Photography Tours</li>
            <li @click="searchByType('tour', 'Luxury Tours')">Luxury Tours</li>
          </ul>
        </div>
        <div class="column">
          <h3>Treks</h3>
          <ul>
            <li @click="searchByType('trek', 'K2 Base Camp Trek')">K2 Base Camp Trek</li>
            <li @click="searchByType('trek', 'Nanga Parbat Trek')">Nanga Parbat Trek</li>
            <li @click="searchByType('trek', 'Rush Lake Trek')">Rush Lake Trek</li>
            <li @click="searchByType('trek', 'Patundas Trek')">Patundas Trek</li>
            <li @click="searchByType('trek', 'Dudipatsar Lake Trek')">Dudipatsar Lake Trek</li>
            <li @click="searchByType('trek', 'Ratti Gali Lake Trek')">Ratti Gali Lake Trek</li>
          </ul>
        </div>
        <div class="column">
          <h3>Tour Guides</h3>
          <ul>
            <li @click="searchByType('guide', 'Trekking Guide')">Hire a Trekking Guide</li>
            <li @click="searchByType('guide', 'Cultural Guide')">Hire a Cultural Guide</li>
            <li @click="searchByType('guide', 'Wildlife Guide')">Hire a Wildlife Guide</li>
            <li @click="searchByType('guide', 'City Tour Guide')">Hire a City Tour Guide</li>
          </ul>
        </div>
        <div class="column">
          <h3>Activities</h3>
          <ul>
            <li @click="searchByType('activity', 'Rafting')">Rafting</li>
            <li @click="searchByType('activity', 'Paragliding')">Paragliding</li>
            <li @click="searchByType('activity', 'Skiing')">Skiing</li>
            <li @click="searchByType('activity', 'Rock Climbing')">Rock Climbing</li>
            <li @click="searchByType('activity', 'Camping')">Camping</li>
            <li @click="searchByType('activity', 'Boat Ride')">Boat Ride</li>
            <li @click="searchByType('activity', 'Jeep Ride')">Jeep Ride</li>
            <li @click="searchByType('activity', 'Zip Lining')">Zip Lining</li>
            <li @click="searchByType('activity', 'Scuba Diving')">Scuba Diving</li>
          </ul>
        </div>
        <div class="column">
          <h3>Car Rentals</h3>
          <ul>
            <li @click="searchByType('car_rental', 'Car Rentals in Gilgit')">Rentals in Gilgit</li>
            <li @click="searchByType('car_rental', 'Car Rentals in Skardu')">Rentals in Skardu</li>
            <li @click="searchByType('car_rental', 'Car Rentals in Islamabad')">Rentals in Islamabad</li>
            <li @click="searchByType('car_rental', 'Car Rentals in Lahore')">Rentals in Lahore</li>
            <li @click="searchByType('car_rental', 'Car Rentals in Karachi')">Rentals in Karachi</li>
            <li @click="searchByType('car_rental', 'Car Rentals in Hunza')">Rentals in Hunza</li>
          </ul>
          <h3>Bike Rentals</h3>
          <ul>
            <li @click="searchByType('bike_rental', 'Bike Rentals in Gilgit')">Rentals in Gilgit</li>
            <li @click="searchByType('bike_rental', 'Bike Rentals in Islamabad')">Rentals in Islamabad</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import img0 from '@/assets/images/ninja-logo.svg'
import img1 from '@/assets/images/currency-icon.svg'
import img2 from '@/assets/images/support-icon.svg'
import img3 from '@/assets/images/save-icon-listing-page-header.svg'
import img4 from '@/assets/images/profile-icon.svg'
import img5 from '@/assets/images/travelninja.png'
import img6 from '@/assets/images/search-bar-icon.svg'
import img7 from '@/assets/images/menu-icon.svg'
import img8 from '@/assets/images/manage-bookings-icon.svg'
import img9 from '@/assets/images/discover-icon-in-mobile-menu.svg'
import img10 from '@/assets/images/arrow-right.svg'
import img11 from '@/assets/images/places-icon-in-mobile-menu.svg'

import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNavigation } from '@/utils/navigation';

const router = useRouter();
const route = useRoute();
const {
  goToSearch,
  goToLogin,
  goToSignUp,
  goToAccount,
  goToBookings,
  goToSaved,
  goToSupportRequests
} = useNavigation();

const showSearchDropdown = ref(false);
const showMobileMenu = ref(false);
const showPlaces = ref(false);
const showHotels = ref(false);
const searchQuery = ref('');

// Authentication state
const isAuthenticated = computed(() => {
  try {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
});

// Helper function to hide all dropdowns
function hideAllDropdowns() {
  showSearchDropdown.value = false;
  showPlaces.value = false;
  showHotels.value = false;
  showMobileMenu.value = false;
}

// Mobile menu navigation helpers (with dropdown hiding)
function mobileGoToSearch() {
  goToSearch();
  hideAllDropdowns();
}

function mobileGoToLogin() {
  goToLogin();
  hideAllDropdowns();
}

function mobileGoToAccount() {
  goToAccount();
  hideAllDropdowns();
}

function mobileGoToBookings() {
  goToBookings();
  hideAllDropdowns();
}

function mobileGoToSupportRequests() {
  goToSupportRequests();
  hideAllDropdowns();
}

function mobileGoToSaved() {
  router.push('/profile/saved');
  hideAllDropdowns();
}

// Search functions
function performSearch() {
  if (searchQuery.value.trim()) {
    goToSearch({ q: searchQuery.value.trim() });
    hideAllDropdowns();
    // Don't clear searchQuery - let it remain for better UX
    // User can see what they searched for
  }
}

function searchPlace(place) {
  goToSearch({ q: place, type: 'place' });
  hideAllDropdowns();
}

function searchByType(type, query = '') {
  const searchParams = { type };
  if (query) {
    searchParams.q = query;
  }
  goToSearch(searchParams);
  hideAllDropdowns();
}

// Sync header search input with current route query
onMounted(() => {
  if (route.name === 'Search' && route.query.q) {
    searchQuery.value = String(route.query.q);
  }
});

// Watch for route changes to keep header search input in sync
watch(() => route.query.q, (newQuery) => {
  if (route.name === 'Search' && newQuery && newQuery !== searchQuery.value) {
    searchQuery.value = String(newQuery);
  }
});

// Toggle functions
function toggleSearchDropdown() {
  showSearchDropdown.value = !showSearchDropdown.value;
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

function togglePlaces() {
  showPlaces.value = !showPlaces.value;
  if (showPlaces.value) showHotels.value = false;
}

function toggleHotels() {
  showHotels.value = !showHotels.value;
  if (showHotels.value) showPlaces.value = false;
}
</script>
