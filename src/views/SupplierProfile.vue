<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

// Route param
const route = useRoute();
const supplierId = route.params.id as string;

// State
const supplierData = ref<any | null>(null);
const loading = ref(true);
const error = ref("");

// Fetch Supplier API Data
const fetchSupplierProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found.");

    const res = await api.get(`/suppliers/${supplierId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    supplierData.value = res.data;
    console.log("✅ Supplier Data:", res.data);
  } catch (err: any) {
    error.value =
      err.response?.data?.message || err.message || "Failed to load supplier";
  } finally {
    loading.value = false;
  }
};

// Lifecycle Hook
onMounted(() => {
  fetchSupplierProfile();
});
</script>

<template>
  <main>
    <div v-if="loading" class="text-center py-10">Loading supplier data...</div>
    <div v-else-if="error" class="text-center py-10 text-red-500">
      {{ error }}
    </div>

    <div v-else class="supplier-profile-container">
      <header class="profile-header">
        <img
          src="@/assets/images/eventica-color-logo-final-1536x961.png"
          alt="Logo"
          class="logo"
        />
        <div class="company-info">
          <h1>
            {{ supplierData?.profile_data?.business_name || "Supplier Name" }}
          </h1>
        </div>
      </header>

      <ul class="info-list">
        <li>
          <img src="@/assets/images/location-icon.svg" alt="" />
          Based in
          <span>{{ supplierData?.profile_data?.region || "Unknown" }}</span>
        </li>
        <li>
          <img src="@/assets/images/tour-type-icon.svg" alt="" />
          Tours offered
          <span>{{ supplierData?.profile_data?.tour_types?.length || 0 }}</span>
        </li>
        <li>
          <img src="@/assets/images/pickup-dropoff-time-icon.svg" alt="" />
          Operator since
          <span>{{
            supplierData?.profile_data?.operating_since || "N/A"
          }}</span>
        </li>
        <li>
          <img src="@/assets/images/free-parking-icon.svg" alt="" />
          Expertise
          <span>{{ supplierData?.profile_data?.speciality || "N/A" }}</span>
        </li>
      </ul>

      <!-- Static Introduction Section -->
      <section class="introduction">
        <h2>Introduction</h2>
        <p>
          Eventica Travels, Pakistan's first award-winning travel and tour
          management company, dedicated to crafting unique travel experiences.
        </p>
        <p>
          With a strong network of expert tour managers, trusted hotels,
          comfortable transport, and experienced local guides, we make traveling
          easy and hassle-free.
        </p>
      </section>

      <!-- Static Tours Section -->
      <section class="tours">
        <h2>Tours</h2>
        <div class="tour-list">
          <div class="tour-card">
            <div class="tour-image">
              <img src="@/assets/images/2211.jpg" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img src="@/assets/images/wishlist.svg" alt="Wishlist"
              /></span>
            </div>
            <div class="tour-info">
              <span class="tag">Group</span>
              <span class="tag">For International Tourists</span>
              <h3>9 Days Colors of Hunza Valley Cultural Tour</h3>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/location-icon.svg" alt="" />
                  <p>Starts in</p>
                </div>
                <span>Islamabad</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/duration-icon.svg" alt="" />
                  <p>Duration</p>
                </div>
                <span>14 Days</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/for-ages-icon.svg" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <p class="price">From: <span>$1632</span></p>
            </div>
          </div>
          <div class="tour-card">
            <div class="tour-image">
              <img src="@/assets/images/avatar.png" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img src="@/assets/images/wishlist.svg" alt="Wishlist"
              /></span>
            </div>
            <div class="tour-info">
              <span class="tag">Private</span>
              <span class="tag">For International Tourists</span>
              <span class="tag">Cultural</span>
              <h3>14 Day K2 Base Camp Trekking Expedition</h3>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/location-icon.svg" alt="" />
                  <p>Starts in</p>
                </div>
                <span>Islamabad</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/duration-icon.svg" alt="" />
                  <p>Duration</p>
                </div>
                <span>14 Days</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/for-ages-icon.svg" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <p class="price">From: <span>$1632</span></p>
            </div>
          </div>
          <div class="tour-card">
            <div class="tour-image">
              <img src="@/assets/images/avatar.png" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img src="@/assets/images/wishlist.svg" alt="Wishlist"
              /></span>
            </div>
            <div class="tour-info">
              <span class="tag">Private</span>
              <span class="tag">For International Tourists</span>
              <span class="tag">Cultural</span>
              <h3>14 Day K2 Base Camp Trekking Expedition</h3>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/location-icon.svg" alt="" />
                  <p>Starts in</p>
                </div>
                <span>Islamabad</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/duration-icon.svg" alt="" />
                  <p>Duration</p>
                </div>
                <span>14 Days</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img src="@/assets/images/for-ages-icon.svg" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <p class="price">From: <span>$1632</span></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Static Reviews Section -->
      <div class="review-cont">
        <h2>Reviews</h2>
        <div class="review-summary">
          <div class="review-heading">
            <h2>4.0</h2>
            <div class="review-no">
              <div class="review-stars">
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/boder-star.svg" alt="" />
              </div>
              <small>21 Reviews</small>
            </div>
          </div>
          <div class="progress-bar">
            <div class="bar">
              <div class="fill-container">
                <div class="fill" style="width: 80%"></div>
              </div>
              <span>5.0</span>
              <small>16 Reviews</small>
            </div>
            <div class="bar">
              <div class="fill-container">
                <div class="fill" style="width: 30%"></div>
              </div>
              <span>4.0</span>
              <small>5 Reviews</small>
            </div>
            <div class="bar">
              <div class="fill-container">
                <div class="fill" style="width: 0%"></div>
              </div>
              <span>3.0</span>
              <small>0 Reviews</small>
            </div>
            <div class="bar">
              <div class="fill-container">
                <div class="fill" style="width: 0%"></div>
              </div>
              <span>2.0</span>
              <small>0 Reviews</small>
            </div>
            <div class="bar">
              <div class="fill-container">
                <div class="fill" style="width: 0%"></div>
              </div>
              <span>1.0</span>
              <small>0 Reviews</small>
            </div>
          </div>
        </div>
        <div class="reviews">
          <div class="review-list">
            <div class="avatar">
              <img src="@/assets/images/avatar.png" alt="User Avatar" />
            </div>
            <div>
              <div class="review-info">
                <div class="name">Wamiq Ahmed</div>
                <div class="date">27 July 2025</div>
              </div>
              <div class="stars">
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
              </div>
            </div>
          </div>
          <p>
            Had a great experience with this operator, everything went smoothly.
            From the pickup in Islamabad to the dropoff at the airport, they
            took great care of us. Best value for money. Recommended.
          </p>
          <div class="review-media">
            <img src="@/assets/images/thhunzagalleryimg4.jpg" alt="" />
            <img src="@/assets/images/hunzagalleryimg1.jpg" alt="" />
            <img src="@/assets/images/hunzagalleryimg2.jpg" alt="" />
            <img src="@/assets/images/hunzagalleryimg3.jpg" alt="" />
            <img src="@/assets/images/hunzagalleryimg5.jpg" alt="" />
            <img src="@/assets/images/10927.jpg" alt="" />
          </div>
        </div>
        <div class="reviews">
          <div class="review-list">
            <div class="avatar">
              <img src="@/assets/images/avatar.png" alt="User Avatar" />
            </div>
            <div>
              <div class="review-info">
                <div class="name">Faisal</div>
                <div class="date">8 Jun 2025</div>
              </div>
              <div class="stars">
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
              </div>
            </div>
          </div>
          <p>Book with them, they're probably the best in Pakistan.</p>
          <div class="reply">
            <span><strong>Eventica Travels</strong> Replied</span>
            <p>
              Thank you so much for the kind words We're thrilled to hear that
              you enjoyed the mix of scenery, culture, and city experiences in
              Vietnam. Ensuring a smooth and safe journey for our travelers is
              our top priority
            </p>
          </div>
        </div>
        <div class="no-border reviews">
          <div class="review-list">
            <div class="avatar">
              <img src="@/assets/images/avatar.png" alt="User Avatar" />
            </div>
            <div>
              <div class="review-info">
                <div class="name">Michael</div>
                <div class="date">24 May 2025</div>
              </div>
              <div class="stars">
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
                <img src="@/assets/images/review-icon.svg" alt="" />
              </div>
            </div>
          </div>
          <p>
            A well crafted tour... you get to see everything and also alot of
            activities included in the tour. Satisfied witht the trip.
          </p>
        </div>
        <div class="pagination">
          <a class="active" href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
        </div>
      </div>
    </div>
  </main>
</template>
