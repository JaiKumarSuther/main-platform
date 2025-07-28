<!-- Header.vue -->
<template>
  <header>
    <!-- Desktop Header -->
    <div class="desktop-header">
      <div class="header-left">
        <div class="logo">
          <img src="@/assets/images/ninja-logo.svg" alt="Travel Ninja Logo" />travelninja
        </div>
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
          />
          <div class="searchdropdown-container" style="position: absolute; right: 150px; top: 40px" >
            <div class="searchbar-dropdown" v-show="showSearchDropdown">
              <div class="places" >
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
            <img src="@/assets/images/currency-icon.svg" alt="" /><span
              >US Dollar</span
            >
          </div>
          <div class="menu">
            <img src="@/assets/images/support-icon.svg" alt="" /><span
              >Support</span
            >
          </div>
          <img src="@/assets/images/save-icon-listing-page-header.svg" alt="" />
          <img src="@/assets/images/Profile icon.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header">
      <div class="mobile-header-container">
        <div class="logo-section">
          <img
            src="@/assets/images/travelninja.png"
            alt="Travel Ninja Logo"
            class="logo-icon"
          />
        </div>
        <div class="icon-section">
          <img
            src="@/assets/images/search-bar-icon.svg"
            alt="Search"
            class="header-icon"
          />
          <img
            src="@/assets/images/save-icon-listing-page-header.svg"
            alt="Wishlist"
            class="header-icon"
          />
          <img
            src="@/assets/images/Profile icon.svg"
            alt="Profile"
            class="header-icon"
          />
          <img
            src="@/assets/images/Menu icon.svg"
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
              <img src="@/assets/images/Profile icon.svg" alt="" /> Log in or sign
              up
            </p>
            <p>
              <img
                src="@/assets/images/save-icon-listing-page-header.svg"
                alt=""
              />
              My wishlist
            </p>
            <p>
              <img src="@/assets/images/manage bookings icon.svg" alt="" /> Manage
              bookings
            </p>
          </section>
          <section>
            <h3>Explore</h3>
            <p>
              <img src="@/assets/images/Discover icon in mobile menu.svg" alt="" />
              Discover hotels, tours, activities & more…
              <img
                class="arrow-menu"
                src="@/assets/images/arrow right.svg"
                alt=""
              />
            </p>
            <p>
              <img src="@/assets/images/Places icon in mobile menu.svg" alt="" />
              Places
              <img
                class="arrow-menu"
                src="@/assets/images/arrow right.svg"
                alt=""
              />
            </p>
          </section>
          <div class="border"></div>
          <section>
            <p>
              <img src="@/assets/images/support-icon.svg" alt="" /> Support
              <img
                class="arrow-menu"
                src="@/assets/images/arrow right.svg"
                alt=""
              />
            </p>
            <p>
              <img src="@/assets/images/currency-icon.svg" alt="" /> Currency:
              Pakistani rupees
              <img
                class="arrow-menu"
                src="@/assets/images/arrow right.svg"
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
import { ref } from "vue";

const showSearchDropdown = ref(false);
const showMobileMenu = ref(false);
const showPlaces = ref(false);
const showHotels = ref(false);

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
