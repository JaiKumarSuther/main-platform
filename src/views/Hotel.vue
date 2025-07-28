<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

const route = useRoute();
const listingId = route.params.id as string;

const listingData = ref<any>(null);
const loading = ref(false);
const error = ref("");

const fetchListing = async () => {
  loading.value = true;
  error.value = "";

  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found.");

    const res = await api.get(`/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    listingData.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to load listing";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchListing();
});
</script>

<template>
  <main v-if="listingData">
    <div class="slider-mobile">
      <img
        class="slide"
        :src="listingData.meta_data?.photos?.[0] || '@/assets/images/northview.png'"
        alt="Slide 1"
      />
      <div class="arrow left">&#10094;</div>
      <div class="arrow right">&#10095;</div>
      <div class="dots">
        <div
          v-for="(photo, index) in listingData.meta_data?.photos?.slice(0, 5) ||
          []"
          :key="index"
          :class="['dot', index === 0 ? 'active' : '']"
        ></div>
      </div>
    </div>

    <div class="listing-details">
      <div class="listing-header">
        <section class="listing-header-details listing-hotel-details">
          <div class="reviews">
            <img src="@/assets/images/review-icon.svg" alt="" />
            <span class="review-score">{{
              listingData.reviews_avg || "4.0"
            }}</span>
            <span>{{ listingData.reviews_count || "15" }} reviews</span>
          </div>
          <h1>{{ listingData.title }}</h1>
          <p>
            From <span class="price">PKR {{ listingData.price }}</span>
          </p>
        </section>
        <span class="location-mobile">
          <img src="@/assets/images/location-icon.svg" alt="" />
          {{ listingData.location || "Hunza, Gilgit Baltistan" }}
        </span>
        <section class="listing-header-icons">
          <div class="icon">
            <img
              src="@/assets/images/save-icon-listing-page-header.svg"
              alt=""
            />
          </div>
          <div class="icon">
            <img src="@/assets/images/share-icon.svg" alt="" />
          </div>
        </section>
      </div>

      <section class="gallery">
        <div class="main-image">
          <img
            v-for="(photo, index) in listingData.meta_data?.photos || []"
            :key="index"
            :src="photo"
            alt="Hotel Image"
            style="width: 100px; height: auto; margin: 5px"
          />
        </div>
        <div class="side-images">
          <img
            v-for="(photo, index) in listingData.meta_data?.photos?.slice(
              1,
              5
            ) || []"
            :key="index"
            :src="photo"
            alt="Side Image"
            style="width: 60px; height: auto; margin: 3px"
          />
        </div>
      </section>
    </div>

    <div class="hotel-info-details">
      <div class="hotel-info">
        <div class="header">
          <span class="location">
            <img src="@/assets/images/location-icon.svg" alt="" />
            {{ listingData.location || "Hunza" }}
          </span>
        </div>

        <div class="hotel-header">
          <div class="amenities">
            <h2>Amenities at the property</h2>
            <ul v-if="listingData.meta_data?.amenities">
              <li
                v-for="(item, index) in listingData.meta_data.amenities"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
            <div class="check-in">
              <ul>
                <li>
                  Check-in time:
                  {{ listingData.meta_data?.check_in || "12PM - Anytime" }}
                </li>
                <li>
                  Check-out time:
                  {{ listingData.meta_data?.check_out || "11AM" }}
                </li>
              </ul>
            </div>
          </div>
          <div class="map">
            <iframe
              class="map"
              :src="
                listingData.meta_data?.mapUrl ||
                'https://www.google.com/maps/embed?...'
              "
              width="600"
              height="450"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div class="select-room">
          <h2>Choose your room</h2>
          <div class="select-room-dropdown">
            <div class="left-dropdown">
              <div class="dropdown check">
                <img
                  src="@/assets/images/date-icon-select-details.svg"
                  alt="People Icon"
                  class="icon"
                />
                <div class="dropdown-content">
                  <label>Dates</label>
                  <span>29 Aug - 2 Sep</span>
                </div>
              </div>
            </div>
            <div class="sort-container">
              <div v-if="listingData.meta_data?.rooms">
                <h2>Rooms Available: {{ listingData.meta_data.rooms }}</h2>
              </div>
              <button id="sortBtn" class="border-button">
                <img src="@/assets/images/sort-by-icon.svg" alt="" />Sort by
              </button>
            </div>
          </div>

          <div class="room-list">
            <div
              v-for="room in listingData.meta_data?.room_details || []"
              :key="room.id"
              class="room-card"
            >
              <div class="image-slider">
                <img :src="room.imageUrl" alt="Room Image" />
              </div>
              <div class="room-info">
                <h3>{{ room.name }}</h3>
                <div class="info">
                  <div class="info-content">
                    <img
                      src="@/assets/images/people-icon-select-details.svg"
                      alt=""
                    />
                    <p>{{ room.sleeps }}</p>
                  </div>
                </div>
                <div class="info">
                  <div class="info-content">
                    <img src="@/assets/images/bed-icon.svg" alt="" />
                    <p>{{ room.beds }}</p>
                  </div>
                </div>
                <div class="info">
                  <div class="info-content">
                    <img src="@/assets/images/room-size-icon.svg" alt="" />
                    <p>{{ room.size }}</p>
                  </div>
                </div>
                <p class="cancellation">
                  <img src="@/assets/images/free-cancellation-icon.svg" alt="" />
                  {{ room.cancellationPolicy }}
                </p>
                <p class="price">
                  PKR {{ room.price }} <span>({{ room.nights }} nights)</span>
                </p>
                <p class="note">{{ room.note }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- More Details Section -->
        <div class="more-details">
          <h2>More details</h2>
          <ul class="more-details-list">
            <li>
              <div class="more-details-item">
                <img
                  src="@/assets/images/important-information-icon.svg"
                  alt=""
                  width="16"
                />
                <div class="more-detail-text">
                  <p>Important Information</p>
                  <p>
                    Guests are required to show a photo ID and credit card upon
                    check-in. Special requests are subject to availability and
                    additional charges may apply.
                  </p>
                </div>
                <img
                  src="@/assets/images/dropdown-toggle.svg"
                  alt="Toggle Icon"
                  class="toggle-icon"
                />
              </div>
            </li>
          </ul>
        </div>

        <!-- Questions Section -->
        <div class="questions">
          <h2>Questions you may have</h2>
          <ul class="question-list">
            <li>
              <div class="question-list-item">
                <img src="@/assets/images/faq-icon.svg" alt="" />
                <div class="question-list-text">
                  <h3>Is breakfast included in the booking?</h3>
                  <p>
                    Yes, complimentary breakfast is provided for all guests.
                  </p>
                </div>
                <img
                  src="@/assets/images/toggle-up.svg"
                  alt="Toggle Icon"
                  class="toggle-icon"
                />
              </div>
            </li>
            <li>
              <div class="question-list-item">
                <img src="@/assets/images/faq-icon.svg" alt="" />
                <div class="question-list-text">
                  <h3>Do you offer airport shuttle service?</h3>
                  <p>Yes, we offer paid shuttle services upon request.</p>
                </div>
                <img
                  src="@/assets/images/toggle-up.svg"
                  alt="Toggle Icon"
                  class="toggle-icon"
                />
              </div>
            </li>
          </ul>
        </div>

        <!-- Reviews Section -->
        <div class="review-cont">
          <h2>Reviews</h2>
          <div class="review-summary">
            <div class="review-heading">
              <h2>{{ listingData.reviews_avg || "4.0" }}</h2>
              <div class="review-no">
                <div class="review-stars">
                  <img src="@/assets/images/review-icon.svg" alt="" />
                  <img src="@/assets/images/review-icon.svg" alt="" />
                  <img src="@/assets/images/review-icon.svg" alt="" />
                  <img src="@/assets/images/review-icon.svg" alt="" />
                  <img src="@/assets/images/boder-star.svg" alt="" />
                </div>
                <small>{{ listingData.reviews_count || "0" }} Reviews</small>
              </div>
            </div>
          </div>

          <div
            v-for="(review, index) in listingData.reviews || []"
            :key="index"
            class="reviews"
          >
            <div class="review-list">
              <div class="avatar">
                <img
                  :src="review.avatar || '@/assets/images/avatar.png'"
                  alt="User Avatar"
                />
              </div>
              <div>
                <div class="review-info">
                  <div class="name">
                    {{ review.reviewer_name || "Anonymous" }}
                  </div>
                  <div class="date">{{ review.date || "N/A" }}</div>
                </div>
                <div class="stars">
                  <img
                    v-for="i in review.rating"
                    :key="i"
                    src="@/assets/images/review-icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p>{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
</template>
