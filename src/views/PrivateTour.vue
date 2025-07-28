<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

const route = useRoute();
const listingId = route.params.id as string;

const listingData = ref<any>(null);
const loading = ref(true);
const error = ref("");

const fetchListingDetails = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found.");

    const res = await api.get(`/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    listingData.value = res.data;
    console.log("✅ Listing Data:", res.data);
  } catch (err: any) {
    error.value =
      err.response?.data?.message || err.message || "Failed to load listing.";
  } finally {
    loading.value = false;
  }
};

const parsedHighlights = computed(() => {
  return Array.isArray(listingData.value?.highlights)
    ? listingData.value.highlights
    : listingData.value?.highlights?.split(',').map(item => item.trim()) || [];
});

onMounted(() => {
  fetchListingDetails();
});
</script>

<template>
  <main>
    <div class="slider-mobile">
      <img class="slide" src="@/assets/images/45497.jpg" alt="Slide 1" />

      <!-- Arrows -->
      <div class="arrow left">&#10094;</div>
      <div class="arrow right">&#10095;</div>

      <!-- Dots -->
      <div class="dots">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

    <div class="listing-details">
      <div class="listing-header">
        <section class="listing-header-details">
          <h1>{{ listingData?.title || "Loading..." }}</h1>
          <p>
            From
            <span class="price">
              {{
                listingData?.base_price ? `$${listingData.base_price}` : "N/A"
              }}
            </span>
          </p>
        </section>
        <span class="location-mobile"
          ><img src="@/assets/images/location-icon.svg" alt="" /> From
          <span>Islamabad</span></span
        >
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
          <img src="@/assets/images/45497.jpg" alt="Main Tour Image" />
        </div>
        <div class="side-images">
          <img src="@/assets/images/avatar.png" alt="Image 1" />
          <img src="@/assets/images/avatar.png" alt="Image 2" />
          <img src="@/assets/images/avatar.png" alt="Image 3" />
          <img src="@/assets/images/avatar.png" alt="Image 4" />
        </div>
      </section>
    </div>
    <div class="listing-info-details">
      <div class="listing-info">
        <div class="header">
          <span class="location"
            ><img src="@/assets/images/location-icon.svg" alt="" /> From
            <span>Islamabad</span></span
          >
        </div>
        <div class="details">
          <div class="detail-item">
            <img src="@/assets/images/duration-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>Duration</strong>
              <span>{{ listingData?.duration || "N/A" }}</span>
            </div>
          </div>
          <div class="detail-item">
            <img src="@/assets/images/tour-type-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>Type</strong>
              <span>Private Tour</span>
            </div>
          </div>
          <div class="detail-item">
            <img src="@/assets/images/for-ages-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>For Ages</strong>
              <span>3 to 48 years old</span>
            </div>
          </div>
          <div class="detail-item">
            <img src="@/assets/images/language-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>Languages</strong>
              <span>{{ listingData?.languages?.join(', ') || 'N/A' }}</span>
            </div>
          </div>
          <div class="detail-item">
            <img
              src="@/assets/images/tour-theme-and-experience-type-icon.svg"
              alt=""
              width="16"
            />
            <div class="detail-text">
              <strong>Theme</strong>
              <span>Sightseeing</span>
            </div>
          </div>
        </div>
        <div class="summary">
          <h2>Summary</h2>
          <p>{{ listingData?.overview || "Description coming soon." }}</p>
        </div>
        <div class="highlights">
          <h2>Highlights</h2>
          <ul>
            <li v-for="(highlight, index) in parsedHighlights" :key="index">
              <img src="@/assets/images/highlight-icon.svg" alt="" />
              {{ highlight }}
            </li>
          </ul>
        </div>
        <div class="whats-included">
          <h2>What's Included</h2>
          <ul class="included-list">
            <li class="included">
              <img src="@/assets/images/included-icon.svg" alt="" /> Guide
            </li>
            <li class="included">
              <img src="@/assets/images/included-icon.svg" alt="" /> Transportation
              (Bus, Jeep)
            </li>
            <li class="included">
              <img src="@/assets/images/included-icon.svg" alt="" /> Meals
              (Breakfast, Evening Snacks, Dinner)
            </li>
            <li class="included">
              <img src="@/assets/images/included-icon.svg" alt="" /> National Parks
              Entrance Fees
            </li>
            <li class="included">
              <img src="@/assets/images/included-icon.svg" alt="" /> Accommodations
              (3 Star)
            </li>
            <li class="not-included">
              <img src="@/assets/images/not-included-icon.svg" alt="" /> Insurance
            </li>
            <li class="not-included">
              <img src="@/assets/images/not-included-icon.svg" alt="" /> Additional
              Services
            </li>
            <li class="not-included">
              <img src="@/assets/images/not-included-icon.svg" alt="" /> Drinks
            </li>
          </ul>
        </div>
        <div class="itinerary">
          <h2>Itinerary</h2>
          <ul class="itinerary-list">
            <li class="itinerary-item">
              <span class="dot"></span>
              <strong>Day 1</strong> Journey from Islamabad to Naran
              <img
                src="@/assets/images/toggle-up.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer">
                <p>
                  Your adventure begins in Islamabad, where you’ll be picked up
                  early in the morning and start your scenic drive towards
                  Naran. Enjoy a leisurely journey, passing by picturesque towns
                  and the famous Kunhar River. Midway, stop at Balakot for lunch
                  and take in the beautiful mountain views. Afterward, arrive in
                  Naran, check into the hotel, and head to river rafting.
                </p>
              </div>
            </li>
            <li>
              <span class="dot"></span>
              <strong>Day 2</strong> Explore Naran and Travel to Babusar Top &
              Chilas
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer-close"></div>
            </li>
            <li>
              <span class="dot"></span>
              <strong>Day 3</strong>
              Experience Magic of Fairy Meadows & Nanga Parbat
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer-close">
                <p></p>
              </div>
            </li>
            <li>
              <span class="dot"></span>
              <strong>Day 4</strong>
              Discover Hunza’s Cultural Gems & Attabad Lake
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer-close">
                <p></p>
              </div>
            </li>
            <li>
              <span class="dot"></span>
              <strong>Day 5</strong> Explore Skardu’s Natural Wonders
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer-close">
                <p></p>
              </div>
            </li>
            <li>
              <span class="dot"></span>
              <strong>Day 6</strong> Return to Naran
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer-close">
                <p></p>
              </div>
            </li>
            <li>
              <span class="dot"></span>
              <strong>Day 7</strong> Drive back to Islamabad
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Toggle Icon"
                class="toggle-icon"
              />
              <div class="answer-close">
                <p></p>
              </div>
            </li>
          </ul>
        </div>
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
                </div>
                <img
                  src="@/assets/images/dropdown-toggle.svg"
                  alt="Toggle Icon"
                  class="toggle-icon"
                />
              </div>
            </li>
            <li>
              <div class="more-details-item">
                <img
                  src="@/assets/images/not-suitable-for-icon.svg"
                  alt=""
                  width="16"
                />
                <div class="more-detail-text">
                  <p>Not Suitable For</p>
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
        <div class="questions">
          <h2>Questions you may have</h2>
          <ul class="question-list">
            <li>
              <div class="question-list-item">
                <img src="@/assets/images/faq-icon.svg" alt="" />
                <div class="question-list-text">
                  <h3>Do you offer pickup from hotel?</h3>
                  <p>
                    Yes, you can select the pickup add-on when booking, we will
                    contact you via the travelninja messaging system to confirm
                    details.
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
                  <h3>What meals will be provided during the tour?</h3>
                </div>
                <img
                  src="@/assets/images/dropdown-toggle.svg"
                  alt="Toggle Icon"
                  class="toggle-icon"
                />
              </div>
            </li>
            <li>
              <div class="question-list-item">
                <img src="@/assets/images/faq-icon.svg" alt="" />
                <div class="question-list-text">
                  <h3>Which hotels will we stay in?</h3>
                </div>
                <img
                  src="@/assets/images/dropdown-toggle.svg"
                  alt="Toggle Icon"
                  class="toggle-icon"
                />
              </div>
            </li>
            <li>
              <div class="question-list-item">
                <img src="@/assets/images/faq-icon.svg" alt="" />
                <div class="question-list-text">
                  <h3>Do you help with the supporting documents?</h3>
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
              Had a great experience with this operator, everything went
              smoothly. From the pickup in Islamabad to the dropoff at the
              airport, they took great care of us. Best value for money.
              Recommended.
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
      <div class="sidebar">
        <div class="booking">
          <h2>Select details</h2>
          <div class="dropdown-container">
            <div class="dropdown">
              <img
                src="@/assets/images/people-icon-select-details.svg"
                alt="People Icon"
                class="icon"
              />
              <div class="dropdown-content">
                <label>People</label>
                <span>Select people</span>
              </div>
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Dropdown Arrow"
                class="arrow"
              />
            </div>

            <div class="dropdown">
              <img
                src="@/assets/images/date-icon-select-details.svg"
                alt="Calendar Icon"
                class="icon"
              />
              <div class="dropdown-content">
                <label>Date</label>
                <span>Select date</span>
              </div>
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Dropdown Arrow"
                class="arrow"
              />
            </div>
          </div>
          <div class="addons">
            <h3>Add Ons</h3>
            <label>
              <div><input type="checkbox" /> Add On 1</div>
              <span class="price">+ Rs 3,000</span>
            </label>
            <label>
              <div><input type="checkbox" /> Add On 2</div>
              <span class="price">+ Rs 4,200</span>
            </label>
          </div>

          <div class="price-summary">
            <h3>Summary</h3>

            <p class="no-details"><img alt="" /> no details selected</p>

            <p class="cancellation">
              <img src="@/assets/images/free-cancellation-icon.svg" alt="" /> Free
              cancellation until <span class="highlight">6th May</span>
            </p>

            <div class="checkout-btns">
              <button class="checkout">Proceed to checkout</button>
              <span class="cart-icon"
                ><img src="@/assets/images/cart-icon.svg" alt=""
              /></span>
            </div>
          </div>
        </div>
        <div class="operator-card">
          <div class="operator-info">
            <img
              src="@/assets/images/eventica-color-logo-final-1536x961.png"
              alt="Eventica Travels Logo"
              class="operator-logo"
            />
            <div class="operator-details">
              <p class="operated-by">operated by</p>
              <div class="rating">
                <h2 class="operator-name">Eventica Travels</h2>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img src="@/assets/images/ninja-face-rating.svg" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="review-section">
                <span class="star-icon"
                  ><img src="@/assets/images/review-icon.svg" alt=""
                /></span>
                <span class="review-score">4.2</span>
                <span class="review-text">15 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile-sticky-panel">
      <div class="left-text">
        <span>Free cancellation</span><br />
        <small>until 8 Feb</small>
      </div>
      <a href="#details" class="select-button">Select Details</a>
    </div>
  </main>
</template>
