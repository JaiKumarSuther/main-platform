<!-- Header.vue -->
<template>
  <header>
    <!-- Desktop Header -->
    <div class="desktop-header">
      <div class="header-left">
        <div class="logo" @click="goToHome" style="cursor: pointer;">
          <img
            :src="img0"
            alt="Travel Ninja Logo"
          />travelninja
        </div>
        <div
          id="searchTrigger"
          class="input-container"
          @click="toggleSearchDropdown"
          style="display: flex; margin: 10px"
        >
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
          />
          <div
            class="searchdropdown-container"
            style="position: absolute; right: 150px; top: 40px"
          >
            <div class="searchbar-dropdown" v-show="showSearchDropdown">
              <div class="places">
                <h2>Places</h2>
                <ul>
                  <li>Hingol National Park</li>
                  <li>Hunza</li>
                </ul>
              </div>
              <div class="hotels">
                <h2>Hotels</h2>
                <ul>
                  <li>Hiraya Resort</li>
                  <li>Hilton Hotel</li>
                  <li>Hotel Cherry Garden</li>
                </ul>
              </div>
              <div class="car-rentals">
                <h2>Car Rentals</h2>
                <ul>
                  <li>Hiraya Rent a car</li>
                  <li>car for rent</li>
                  <li>Hotel Cherry Garden</li>
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
            <li>Trekking</li>
          </ul>
        </nav>
        <div class="header-icons">
          <div class="menu">
            <img :src="img1" alt="Currency" /><span
              >US Dollar</span
            >
          </div>
          <div class="menu">
            <img :src="img2" alt="Support" /><span
              >Support</span
            >
          </div>
          <img
            :src="img3"
            alt="Saved Items"
          />
          <img :src="img4" alt="Profile" />
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header">
      <div class="mobile-header-container">
        <div class="logo-section" @click="goToHome" style="cursor: pointer;">
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
          />
          <img
            :src="img3"
            alt="Wishlist"
            class="header-icon"
          />
          <img
            :src="img4"
            alt="Profile"
            class="header-icon"
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
            <p>
              <img :src="img4" alt="Profile" /> Log
              in or sign up
            </p>
            <p>
              <img
                :src="img3"
                alt="Wishlist"
              />
              My wishlist
            </p>
            <p>
              <img
                :src="img8"
                alt="Bookings"
              />
              Manage bookings
            </p>
          </section>
          <section>
            <h3>Explore</h3>
            <p>
              <img
                :src="img9"
                alt="Discover"
              />
              Discover hotels, tours, activities & more…
              <img
                class="arrow-menu"
                :src="img10"
                alt="Arrow"
              />
            </p>
            <p>
              <img
                :src="img11"
                alt="Places"
              />
              Places
              <img
                class="arrow-menu"
                :src="img10"
                alt="Arrow"
              />
            </p>
          </section>
          <div class="border"></div>
          <section>
            <p>
              <img :src="img2" alt="Support" />
              Support
              <img
                class="arrow-menu"
                :src="img10"
                alt="Arrow"
              />
            </p>
            <p>
              <img :src="img1" alt="Currency" />
              Currency: Pakistani rupees
              <img
                class="arrow-menu"
                :src="img10"
                alt="Arrow"
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
          <li>Hunza Valley</li>
          <li>Skardu</li>
          <li>Gilgit</li>
          <li>Khaplu</li>
          <li>Shigar Valley</li>
          <li>Astore Valley</li>
          <li>Fairy Meadows</li>
          <li>Deosai National Park</li>
          <li>Khunjerab National Park</li>
          <li>Nagar Valley</li>
          <li>Chunda Valley</li>
          <li>Nangma Valley</li>
        </ul>
      </div>
      <div class="column">
        <h3>Khyber Pakhtunkhwa</h3>
        <ul>
          <li>Swat Valley</li>
          <li>Kumrat Valley</li>
          <li>Chitral & Kalash</li>
          <li>Shandur Pass</li>
          <li>Kaghan Valley</li>
          <li>Naran Valley</li>
          <li>Thandiani</li>
          <li>Balakot</li>
          <li>Shogran & Siri Paye</li>
          <li>Galiyat</li>
        </ul>
      </div>
      <div class="column">
        <h3>Punjab</h3>
        <ul>
          <li>Islamabad</li>
          <li>Murree</li>
          <li>Chakwal</li>
          <li>Lahore</li>
        </ul>
      </div>
      <div class="column">
        <h3>Balochistan</h3>
        <ul>
          <li>Ziarat</li>
          <li>Hingol National Park</li>
          <li>Moola Chotok Waterfalls</li>
          <li>Astola Island</li>
          <li>Ormara Beach</li>
        </ul>
      </div>
      <div class="column">
        <h3>Sindh</h3>
        <ul>
          <li>Karachi</li>
          <li>Kund Malir</li>
          <li>Ranikot Fort</li>
          <li>Gorakh Hill</li>
          <li>Keenjhar Lake</li>
          <li>Manchar Lake</li>
          <li>That</li>
        </ul>
      </div>
      <div class="column">
        <h3>Kashmir</h3>
        <ul>
          <li>Neelum Valley</li>
          <li>Leepa Valley</li>
          <li>Ganga Choti</li>
          <li>Muzaffarabad</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="places-container">
    <div id="hotelsSection" class="section" v-show="showHotels">
      <div class="column">
        <h3>Hotels</h3>
        <ul>
          <li>Hotels in Skardu</li>
          <li>Hotels in Hunza</li>
          <li>Hotels in Khaplu</li>
          <li>Hotels in Gilgit</li>
          <li>Hotels in Naran</li>
          <li>Hotels in Kaghan</li>
          <li>Hotels in Swat</li>
          <li>Hotels in Kalam</li>
          <li>Hotels in Deosai</li>
          <li>Hotels in Balakot</li>
          <li>Hotels in Murree</li>
          <li>Hotels in Kashmir</li>
        </ul>
      </div>
      <div class="column">
        <h3>Tours</h3>
        <ul>
          <li>Cultural Tours</li>
          <li>Adventure Tours</li>
          <li>City Tours</li>
          <li>Food Tours</li>
          <li>Safari Tours</li>
          <li>Wildlife & Nature Tours</li>
          <li>Festival Tours</li>
          <li>Photography Tours</li>
          <li>Luxury Tours</li>
        </ul>
      </div>
      <div class="column">
        <h3>Treks</h3>
        <ul>
          <li>K2 Base Camp Trek</li>
          <li>Nanga Parbat Trek</li>
          <li>Rush Lake Trek</li>
          <li>Patundas Trek</li>
          <li>Dudipatsar Lake Trek</li>
          <li>Ratti Gali Lake Trek</li>
        </ul>
      </div>
      <div class="column">
        <h3>Tour Guides</h3>
        <ul>
          <li>Hire a Trekking Guide</li>
          <li>Hire a Cultural Guide</li>
          <li>Hire a Wildlife Guide</li>
          <li>Hire a City Tour Guide</li>
        </ul>
      </div>
      <div class="column">
        <h3>Activities</h3>
        <ul>
          <li>Rafting</li>
          <li>Paragliding</li>
          <li>Skiing</li>
          <li>Rock Climbing</li>
          <li>Camping</li>
          <li>Boat Ride</li>
          <li>Jeep Ride</li>
          <li>Zip Lining</li>
          <li>Scuba Diving</li>
        </ul>
      </div>
      <div class="column">
        <h3>Car Rentals</h3>
        <ul>
          <li>Rentals in Gilgit</li>
          <li>Rentals in Skardu</li>
          <li>Rentals in Islamabad</li>
          <li>Rentals in Lahore</li>
          <li>Rentals in Karachi</li>
          <li>Rentals in Hunza</li>
        </ul>
        <h3>Bike Rentals</h3>
        <ul>
          <li>Rentals in Gilgit</li>
          <li>Rentals in Islamabad</li>
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

import { ref } from "vue";
import { useNavigation } from '@/utils/navigation';

const showSearchDropdown = ref(false);
const showMobileMenu = ref(false);
const showPlaces = ref(false);
const showHotels = ref(false);

// Navigation utilities
const { goToSearch, goToHome } = useNavigation();

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
