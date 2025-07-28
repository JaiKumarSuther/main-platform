<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
    : listingData.value?.highlights?.split(",").map((item) => item.trim()) ||
        [];
});

onMounted(() => {
  fetchListingDetails();
});
</script>

<template>
  <main>
    <div class="slider-mobile">
      <img class="slide" src="@/assets/images/experiecne.png" alt="Slide 1" />

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
            <span class="price">{{
              listingData?.base_price ? `$${listingData.base_price}` : "N/A"
            }}</span>
            <small>/person</small>
          </p>
        </section>
        <span class="location-mobile"
          ><img src="@/assets/images/location-icon.svg" alt="" /> From
          <span>{{ listingData?.starts_in || "N/A" }}</span></span
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
          <img src="@/assets/images/experiecne.png" alt="Main Tour Image" />
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
            <span>{{ listingData?.starts_in || "N/A" }}</span></span
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
            <img
              src="@/assets/images/tour-theme-and-experience-type-icon.svg"
              alt=""
              width="16"
            />
            <div class="detail-text">
              <strong>Experience Type</strong>
              <span>{{ listingData?.experience_type || "N/A" }}</span>
            </div>
          </div>
          <div class="detail-item">
            <img src="@/assets/images/for-ages-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>For Ages</strong>
              <span>{{ listingData?.age_range || "N/A" }}</span>
            </div>
          </div>
          <div class="detail-item">
            <img src="@/assets/images/difficulty-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>Difficulty Level</strong>
              <span>{{ listingData?.difficulty || "N/A" }}</span>
            </div>
          </div>
          <div class="detail-item">
            <img src="@/assets/images/min-people-icon.svg" alt="" width="16" />
            <div class="detail-text">
              <strong>Min. people</strong>
              <span>{{ listingData?.min_people || "N/A" }}</span>
            </div>
          </div>
        </div>
        <div class="operator-card-mobile">
          <div class="operator-card">
            <div class="operator-info">
              <img
                :src="listingData?.operator?.logo || '@/assets/images/avatar.jpg'"
                alt="Supplier Logo"
                class="operator-logo"
              />
              <div class="operator-details">
                <p class="operated-by">Guided by</p>
                <div class="rating">
                  <h2 class="operator-name">{{ listingData?.operator?.name || "N/A" }}</h2>
                  <div class="rating-badge">
                    <span class="rating-icon"
                      ><img src="@/assets/images/ninja-face-rating.svg" alt=""
                    /></span>
                    <span class="rating-score">
                      {{ listingData?.operator?.rating || "N/A" }}
                    </span>
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
        <div class="chat-with-operator-mobile">
          <div class="chat-with-operator-card">
            <h3>
              <img src="@/assets/images/chat-after-booking.svg" alt="" /> Chat with
              Tour Guide
            </h3>
            <p>
              You'll get access to direct chat after booking. Ask anything,
              confirm plans, stay connected.
            </p>
          </div>
        </div>
        <div class="protected-bookings-mobile">
          <div class="protected-bookings-card">
            <h3>
              <img src="@/assets/images/protec.svg" alt="" /> Protected booking
            </h3>
            <p>
              In case of issues, we've got your back. We'll intervene and
              protect your money.
            </p>
          </div>
        </div>
        <div class="summary">
          <h2>Summary</h2>
          <ul>
            <li v-for="(highlight, index) in parsedHighlights" :key="index">
              {{ highlight }}
            </li>
          </ul>
        </div>
        <
        <div class="highlights">
          <h2>Highlights</h2>
          <ul>
            <li v-for="(highlight, index) in parsedHighlights" :key="index">
              {{ highlight }}
            </li>
          </ul>
        </div>
        <div class="whats-included">
          <h2>What's Included</h2>
          <ul class="included-list">
            <li
              v-for="(item, index) in listingData?.inclusions || []"
              :key="index"
            >
              <img src="@/assets/images/included-icon.svg" alt="" />
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="itinerary">
          <h2>Itinerary</h2>
          <ul class="itinerary-list">
            <li
              v-for="(item, index) in listingData?.itinerary || []"
              :key="index"
              class="itinerary-item"
            >
              <span class="dot"></span>
              <strong>{{ item.day }}</strong> {{ item.title }}
              <div class="answer">
                <p>{{ item.description }}</p>
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
                  <h3>What will be our transport method during the tour?</h3>
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
                  <h3>Is it safe to visit Deosai National Park?</h3>
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
                  <h3>What do i need to bring?</h3>
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
          <div
            v-for="(review, index) in listingData?.reviews || []"
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
                  <div class="name">{{ review.reviewer_name }}</div>
                  <div class="date">{{ review.date }}</div>
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
            <!-- People Dropdown -->
            <div id="peopleDropdownContainer" class="dropdown">
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
                id="peopleDropdownArrow"
              />

              <!-- Dropdown menu -->
              <div class="people-container">
                <div id="peopleDropdown" class="dropdown-menu">
                  <div class="dropdown-item">
                    <p>Adults <span>12 - 90 years old</span></p>
                    <div class="counter">
                      <p class="increase">
                        <img
                          src="@/assets/images/plus-select-people.svg"
                          alt=""
                        />
                      </p>
                      <span class="count">0</span>
                      <p class="decrease">
                        <img
                          src="@/assets/images/minus-select-people.svg"
                          alt=""
                        />
                      </p>
                    </div>
                  </div>
                  <div class="dropdown-item">
                    <p>Children <span>2 - 11 years old</span></p>
                    <div class="counter">
                      <p class="increase">
                        <img
                          src="@/assets/images/plus-select-people.svg"
                          alt=""
                        />
                      </p>
                      <span class="count">0</span>
                      <p class="decrease">
                        <img
                          src="@/assets/images/minus-select-people.svg"
                          alt=""
                        />
                      </p>
                    </div>
                  </div>
                  <div class="dropdown-item">
                    <p>Infant<span> 0 - 2 years old</span></p>
                    <div class="counter">
                      <p class="increase">
                        <img
                          src="@/assets/images/plus-select-people.svg"
                          alt=""
                        />
                      </p>
                      <span class="count">0</span>
                      <p class="decrease">
                        <img
                          src="@/assets/images/minus-select-people.svg"
                          alt=""
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Date Dropdown -->
            <div id="dateDropdownContainer" class="dropdown">
              <img
                src="@/assets/images/date-icon-select-details.svg"
                alt="Calendar Icon"
                class="icon"
              />
              <div class="dropdown-content">
                <label>Date</label>
                <span id="selectedDate">Select a date</span>
              </div>
              <img
                src="@/assets/images/dropdown-toggle.svg"
                alt="Dropdown Arrow"
                class="arrow"
                id="dateDropdownArrow"
              />

              <!-- Dropdown Menu -->
              <div class="calendar-container">
                <div class="calendar-dropdown" id="calendarDropdown">
                  <div class="calendar-header">
                    <p class="nav-arrow" id="prevMonth">
                      <img src="@/assets/images/arrow-left.svg" alt="" />
                    </p>
                    <span id="currentMonth">July 2025</span>
                    <p class="nav-arrow" id="nextMonth">
                      <img src="@/assets/images/arrow-right.svg" alt="" />
                    </p>
                  </div>
                  <table class="calendar">
                    <thead>
                      <tr>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                        <th>Su</th>
                      </tr>
                    </thead>
                    <tbody id="calendarBody">
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td class="selected">7</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>12</td>
                        <td class="unavailable">13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                      </tr>
                      <tr>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                      </tr>
                      <tr>
                        <td>25</td>
                        <td>26</td>
                        <td class="unavailable">27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="not-available">not available</p>
                  <button class="select-date-btn" id="confirmDate">
                    Select Date
                  </button>
                </div>
              </div>
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
            <p class="date">26 August 2025</p>
            <h2 class="total-price">Rs 543,000</h2>

            <div class="breakdown">
              <p>2x Adults <span class="amount">Rs 540,000</span></p>
              <p>1x Infant <span class="amount">Rs 0</span></p>
              <p>Add On 1 <span class="amount">Rs 3,000</span></p>
            </div>

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
              src="@/assets/images/avatar.png"
              alt="Eventica Travels Logo"
              class="operator-logo"
            />
            <div class="operator-details">
              <p class="operated-by">operated by</p>
              <div class="rating">
                <h2 class="operator-name">
                  {{ listingData?.operator?.name || "N/A" }}
                </h2>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img src="@/assets/images/ninja-face-rating.svg" alt=""
                  /></span>
                  {{ listingData?.operator?.rating || "N/A" }}
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
