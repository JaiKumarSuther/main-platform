<script setup lang="ts">
import img0 from '@/assets/images/location-icon.svg'
import img1 from '@/assets/images/language-icon.svg'
import img2 from '@/assets/images/pickup-dropoff-time-icon.svg'
import img3 from '@/assets/images/free-parking-icon.svg'
import img4 from '@/assets/images/17940.jpg'
import img5 from '@/assets/images/wishlist.svg'
import img6 from '@/assets/images/duration-icon.svg'
import img7 from '@/assets/images/for-ages-icon.svg'
import img8 from '@/assets/images/avatar.png'
import img9 from '@/assets/images/review-icon.svg'
import img10 from '@/assets/images/border-star.svg'
import img11 from '@/assets/images/thhunzagalleryimg4.jpg'
import img12 from '@/assets/images/hunzagalleryimg1.jpg'
import img13 from '@/assets/images/hunzagalleryimg2.jpg'
import img14 from '@/assets/images/hunzagalleryimg3.jpg'
import img15 from '@/assets/images/hunzagalleryimg5.jpg'
import img16 from '@/assets/images/10927.jpg'

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';

const route = useRoute();
const tourGuideId = route.params.id as string;

const guideData = ref<any | null>(null);
const loading = ref(true);
const error = ref('');

const fetchTourGuideProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found.');

    const res = await api.get(`/suppliers/${tourGuideId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    guideData.value = res.data;
    console.log('✅ Tour Guide Data:', res.data);

  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Failed to load tour guide';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTourGuideProfile();
});
</script>

<template>
  <div class="tourguide-profile-container">
    <div v-if="loading" class="text-center py-10">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>

    <div v-else>
      <div class="slider">
        <img :src="guideData?.profile_data?.photos?.[0] || '@/assets/images/26240.jpg'" alt="Tour Guide Image" />
        <div class="arrow left">&#10094;</div>
        <div class="arrow right">&#10095;</div>
        <div class="dots">
          <div class="dot active"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>

      <header class="profile-header">
        <div class="company-info">
          <div class="company-name">
            <h1>{{ guideData?.profile_data?.name || 'Tour Guide Name' }}</h1>
          </div>
        </div>
      </header>

      <ul class="info-list">
        <li>
          <img :src="img0" alt="" />
          Lives in
          <span>{{ guideData?.profile_data?.city || 'Unknown' }}</span>
        </li>
        <li>
          <img :src="img1" alt="" />
          Speaks
          <span>{{ (guideData?.profile_data?.languages || ['English', 'Urdu']).join(', ') }}</span>
        </li>
        <li>
          <img :src="img2" alt="" />
          Guide since
          <span>{{ guideData?.profile_data?.guide_since || 'N/A' }}</span>
        </li>
        <li>
          <img :src="img3" alt="" />
          Expertise
          <span>{{ guideData?.profile_data?.specialise_in?.join(', ') || 'N/A' }}</span>
        </li>
      </ul>

      <!-- Static Sections -->
      <section class="introduction">
        <h2>Introduction</h2>
        <p>
          Eventica Travels, Pakistan's first award-winning travel and tour
          management company, dedicated to crafting unique travel experiences...
        </p>
        <p>
          With a strong network of expert tour managers, trusted hotels...
        </p>
      </section>

    <section class="tours">
      <h2>Experiences</h2>
      <div class="tour-list">
        <div class="tour-card">
          <div class="tour-image">
            <img :src="img4" alt="K2 Base Camp Trekking" />
            <span class="wishlist"
              ><img :src="img5" alt="Wishlist"
            /></span>
          </div>
          <div class="tour-info">
            <span class="tag">Wildlife safari</span>
            <h3>Explore the Land of the Himalayan Brown Beaar</h3>
            <div class="info">
              <div class="info-content">
                <img :src="img0" alt="" />
                <p>Starts in</p>
              </div>
              <span>Skkardu</span>
            </div>
            <div class="info">
              <div class="info-content">
                <img :src="img6" alt="" />
                <p>Duration</p>
              </div>
              <span>9 Days</span>
            </div>
            <div class="info">
              <div class="info-content">
                <img :src="img7" alt="" />
                <p>For ages</p>
              </div>
              <span>18 to 48 years old</span>
            </div>
            <p class="price">From: <span>$160</span></p>
          </div>
        </div>
        <div class="tour-card">
          <div class="tour-image">
            <img :src="img8" alt="K2 Base Camp Trekking" />
            <span class="wishlist"
              ><img :src="img5" alt="Wishlist"
            /></span>
          </div>
          <div class="tour-info">
            <span class="tag">Wildlife safari</span>
            <h3>Explore the Land of the Himalayan Brown Beaar</h3>
            <div class="info">
              <div class="info-content">
                <img :src="img0" alt="" />
                <p>Starts in</p>
              </div>
              <span>Skkardu</span>
            </div>
            <div class="info">
              <div class="info-content">
                <img :src="img6" alt="" />
                <p>Duration</p>
              </div>
              <span>9 Days</span>
            </div>
            <div class="info">
              <div class="info-content">
                <img :src="img7" alt="" />
                <p>For ages</p>
              </div>
              <span>18 to 48 years old</span>
            </div>
            <p class="price">From: <span>$132</span></p>
          </div>
        </div>
        <div class="tour-card">
          <div class="tour-image">
            <img :src="img8" alt="K2 Base Camp Trekking" />
            <span class="wishlist"
              ><img :src="img5" alt="Wishlist"
            /></span>
          </div>
          <div class="tour-info">
            <span class="tag">Wildlife safari</span>
            <h3>Explore the Land of the Himalayan Brown Beaar</h3>
            <div class="info">
              <div class="info-content">
                <img :src="img0" alt="" />
                <p>Starts in</p>
              </div>
              <span>Skkardu</span>
            </div>
            <div class="info">
              <div class="info-content">
                <img :src="img6" alt="" />
                <p>Duration</p>
              </div>
              <span>9 Days</span>
            </div>
            <div class="info">
              <div class="info-content">
                <img :src="img7" alt="" />
                <p>For ages</p>
              </div>
              <span>18 to 48 years old</span>
            </div>
            <p class="price">From: <span>$80</span></p>
          </div>
        </div>
      </div>
      <div class="view-all">
        <a href="#" class="btn">View all experiences</a>
      </div>
    </section>

         <div class="review-cont">
      <h2>Reviews</h2>
      <div class="review-summary">
        <div class="review-heading">
          <h2>4.0</h2>
          <div class="review-no">
            <div class="review-stars">
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img10" alt="" />
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
            <img :src="img8" alt="User Avatar" />
          </div>
          <div>
            <div class="review-info">
              <div class="name">Wamiq Ahmed</div>
              <div class="date">27 July 2025</div>
            </div>
            <div class="stars">
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
            </div>
          </div>
        </div>
        <p>
          Had a great experience with this operator, everything went smoothly.
          From the pickup in Islamabad to the dropoff at the airport, they took
          great care of us. Best value for money. Recommended.
        </p>
        <div class="review-media">
          <img :src="img11" alt="" />
          <img :src="img12" alt="" />
          <img :src="img13" alt="" />
          <img :src="img14" alt="" />
          <img :src="img15" alt="" />
          <img :src="img16" alt="" />
        </div>
      </div>
      <div class="reviews">
        <div class="review-list">
          <div class="avatar">
            <img :src="img8" alt="User Avatar" />
          </div>
          <div>
            <div class="review-info">
              <div class="name">Faisal</div>
              <div class="date">8 Jun 2025</div>
            </div>
            <div class="stars">
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
            </div>
          </div>
        </div>
        <p>Book with them, they're probably the best in Pakistan.</p>
        <div class="reply">
          <span><strong>Eventica Travels</strong> Replied</span>
          <p>
            Thank you so much for the kind words We're thrilled to hear that you
            enjoyed the mix of scenery, culture, and city experiences in
            Vietnam. Ensuring a smooth and safe journey for our travelers is our
            top priority
          </p>
        </div>
      </div>
      <div class="no-border reviews">
        <div class="review-list">
          <div class="avatar">
            <img :src="img8" alt="User Avatar" />
          </div>
          <div>
            <div class="review-info">
              <div class="name">Michael</div>
              <div class="date">24 May 2025</div>
            </div>
            <div class="stars">
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
              <img :src="img9" alt="" />
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
  </div>
</template>

