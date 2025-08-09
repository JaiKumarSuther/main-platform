<template>
  <main>
    <div class="search-result-container">
      <div class="search-section">
        <div id="locationDropdown" class="dropdown">
          <img
            :src="img0"
            alt="People Icon"
            class="icon"
          />
          <div class="dropdown-content">
            <label>Destination</label>
            <span>Select destination</span>
          </div>
          <img
            :src="img1"
            alt="Dropdown Arrow"
            class="arrow"
          />

          <div id="searchPopup" class="search-popup hidden">
            <div class="search-input-box">
              <img
                :src="img2"
                alt="Search Icon"
                class="search-icon"
              />
              <input type="text" placeholder="Search destination..." />
            </div>

            <ul class="results-list">
              <li>
                <img :src="img0" alt="" /> Shogran &
                Siri Paye
              </li>
              <li>
                <img :src="img0" alt="" /> Shigar Valley
              </li>
              <li>
                <img :src="img0" alt="" /> Shandur Pass
              </li>
            </ul>
          </div>
        </div>

        <!-- Date Dropdown -->
        <div id="dateDropdownContainer" class="dropdown">
          <img
            :src="img3"
            alt="Calendar Icon"
            class="icon"
          />
          <div class="dropdown-content">
            <label>Date</label>
            <span id="selectedDate">3 dates available</span>
          </div>
          <img
            :src="img1"
            alt="Dropdown Arrow"
            class="arrow"
            id="dateDropdownArrow"
          />

          <!-- Dropdown Menu -->
          <div class="calendar-container">
            <div class="calendar-dropdown" id="calendarDropdown">
              <div class="calendar-months">
                <!-- Month 1 -->
                <div class="month">
                  <table class="calendar">
                    <thead>
                      <tr>
                        <th>SU</th>
                        <th>MO</th>
                        <th>TU</th>
                        <th>WE</th>
                        <th>TH</th>
                        <th>FR</th>
                        <th>SA</th>
                      </tr>
                    </thead>
                  </table>
                  <div class="calendar-header">
                    <span class="month-name">Aug 2025</span>
                  </div>
                  <table class="calendar">
                    <tbody>
                      <!-- Fill these dynamically -->
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                      </tr>
                      <tr>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                      </tr>
                      <tr>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>31</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Month 2 -->
                <div class="month">
                  <table class="calendar">
                    <thead>
                      <tr>
                        <th>SU</th>
                        <th>MO</th>
                        <th>TU</th>
                        <th>WE</th>
                        <th>TH</th>
                        <th>FR</th>
                        <th>SA</th>
                      </tr>
                    </thead>
                  </table>
                  <div class="calendar-header">
                    <span class="month-name">Sep 2025</span>
                  </div>
                  <table class="calendar">
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                      </tr>
                      <tr>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                      </tr>
                      <tr>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                      </tr>
                      <tr>
                        <td>29</td>
                        <td>30</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Control Buttons -->
              <div class="calendar-controls">
                <div>
                  <button class="active">Exact date</button>
                  <button>+ / - 1 day</button>
                  <button>+ / - 2 days</button>
                  <button>+ / - 3 days</button>
                </div>
                <button class="add-date-btn">Add date</button>
              </div>
            </div>
          </div>
        </div>
        <button>Search</button>
      </div>
      <section class="tours">
        <div class="search-result-header">
          <div class="content">
            <div class="tours-available">54 tours available</div>
            <div class="trusted-operator">Only trusted operators</div>
          </div>
          <div class="filter-sort">
            <div id="filterPopup" class="filter-popup hidden">
              <div class="filter-header">
                <h2>Filters</h2>
                <button id="closeBtn" class="close-btn">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!-- Circle outline -->
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#5A6783"
                      stroke-width="4"
                    />

                    <!-- Cross line 1 -->
                    <line
                      x1="35"
                      y1="35"
                      x2="65"
                      y2="65"
                      stroke="#5A6783"
                      stroke-width="4"
                      stroke-linecap="round"
                    />

                    <!-- Cross line 2 -->
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

              <div class="filter-sections">
                <div class="filter-section">
                  <h3>For</h3>
                  <div class="filter-options">
                    <button class="option-btn">Local tourists</button>
                    <button class="option-btn">International tourists</button>
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Price</h3>
                  <div class="price-inputs">
                    <div>
                      <label for="">Min. price</label>
                      <input type="number" placeholder="$" />
                    </div>
                    <div>
                      <label for="">Max price</label>
                      <input type="number" placeholder="$" />
                    </div>
                  </div>
                  <div class="dropdown">
                    <img
                      :src="img4"
                      alt="People Icon"
                      class="icon"
                    />
                    <div class="dropdown-content">
                      <label>US Dollar</label>
                    </div>
                    <img
                      :src="img1"
                      alt="Dropdown Arrow"
                      class="arrow"
                      id="peopleDropdownArrow"
                    />
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Type</h3>
                  <div class="filter-options">
                    <button class="option-btn">Group</button>
                    <button class="option-btn">Private</button>
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Duration</h3>
                  <label class="duration-range" for="durationRange">
                    <span><strong>Min.</strong> 0 days</span>
                    <span> <strong>Max.</strong> 12 days</span></label
                  >
                  <div>
                    <input
                      class="min"
                      type="range"
                      id="durationRange"
                      name="durationRange"
                      min="0"
                      max="12"
                      step="1"
                    />
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Theme</h3>
                  <div class="filter-options">
                    <button class="option-btn">Cultural tours</button>
                    <button class="option-btn active">Adventure tours</button>
                    <button class="option-btn">City tours</button>
                    <button class="option-btn">Food tours</button>
                    <button class="option-btn">Safari tours</button>
                    <button class="option-btn">Luxury tours</button>
                    <button class="option-btn">Wildlife & nature tours</button>
                    <button class="option-btn">Photography tours</button>
                    <button class="option-btn">Festival tours</button>
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Departure from</h3>
                  <div class="filter-options">
                    <button class="option-btn">Karachi</button>
                    <button class="option-btn">Islamabad</button>
                    <button class="option-btn">Lahore</button>
                    <button class="option-btn">Multan</button>
                    <button class="option-btn">Faisalabad</button>
                    <button class="option-btn">Peshawar</button>
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Rating</h3>
                  <div class="filter-options">
                    <button class="option-btn">Atleast 4 stars</button>
                    <button class="option-btn">5 star</button>
                  </div>
                </div>

                <div class="filter-section">
                  <h3>Travelninja Rating</h3>
                  <div class="filter-options">
                    <button class="option-btn">Atleast 4 stars</button>
                    <button class="option-btn">5 star</button>
                  </div>
                </div>
              </div>

              <div class="filter-footer">
                <button class="reset-btn">Reset all</button>
                <button class="show-results-btn">Show results</button>
              </div>
            </div>

            <div id="sortPopup" class="filter-popup hidden">
              <div class="filter-header">
                <h2>Sort by</h2>
                <button id="closeSortBtn" class="close-btn">
                  <svg
                    width="25"
                    height="25"
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

              <div class="filter-section">
                <form class="sort-options">
                  <label
                    ><input type="radio" name="sort" value="best" checked />
                    Best match</label
                  >
                  <label
                    ><input type="radio" name="sort" value="low-to-high" />
                    Price - Low to high</label
                  >
                  <label
                    ><input type="radio" name="sort" value="high-to-low" />
                    Price - High to low</label
                  >
                  <label
                    ><input type="radio" name="sort" value="rating" /> Highest
                    rated operator</label
                  >
                  <label
                    ><input type="radio" name="sort" value="newest" /> Newest
                    first</label
                  >
                </form>
              </div>
            </div>
            <div class="filter-container">
              <button id="filterBtn" class="border-button">
                <img :src="img5" alt="" />Filters
              </button>
            </div>
            <div class="sort-container">
              <button id="sortBtn" class="border-button">
                <img :src="img6" alt="" />Sort by
              </button>
            </div>
          </div>
        </div>
        <div class="search-result-list">
          <div class="trek-card">
            <div class="trek-image">
              <img :src="img7" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="trek-info">
              <span class="tag">Group</span>
              <span class="tag">For International Tourists</span>
              <h3>14 Day K2 Base Camp Trekking Expedition</h3>
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>From</p>
                </div>
                <span>Islamabad</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img9" alt="" />
                  <p>Duration</p>
                </div>
                <span>14 Days</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img
                    :src="img3"
                    alt=""
                  />
                  <p>Dates</p>
                </div>
                <span>6 Aug</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img10" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <div class="trek-provider">
                By <span> Askoli Adventure Tr...</span>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <p class="price">From: <span>$1632</span></p>
            </div>
          </div>
          <div class="tour-card">
            <div class="tour-image">
              <img :src="img13" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="tour-info">
              <span class="tag">Private</span>
              <span class="tag">For International Tourists</span>
              <span class="tag">Cultural</span>
              <h3>9 Day Colors of Hunza Valley Cultural Tour</h3>
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>Starts in</p>
                </div>
                <span>Islamabad</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img9" alt="" />
                  <p>Duration</p>
                </div>
                <span>9 Days</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img10" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <div class="tour-provider">
                By <span> Apricot tours</span>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <p class="price">From: <span>$1632</span></p>
            </div>
          </div>
          <div class="paragliding-card">
            <div class="paragliding-image">
              <img :src="img14" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="paragliding-info">
              <span class="tag">paragliding</span>
              <h3>Soar Above the Majestic Hunza Valley</h3>
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>Place</p>
                </div>
                <span>Hunza</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img9" alt="" />
                  <p>Duration</p>
                </div>
                <span>30 minutes</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img10" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <div class="paragliding-provider">
                By <span> Hunza Paragliding Club</span>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <p class="price">From: <span>Rs 12,000</span></p>
            </div>
          </div>
          <div class="tourguide-card">
            <div class="tourguide-image">
              <img :src="img15" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="tourguide-info">
              <span class="tag">Wildlife safari</span>
              <h3>Explore the Land of the Himalayan Brown Bear</h3>
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>Starts in</p>
                </div>
                <span>Skardu</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img9" alt="" />
                  <p>Duration</p>
                </div>
                <span>2 Days</span>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img10" alt="" />
                  <p>For ages</p>
                </div>
                <span>18 to 48 years old</span>
              </div>
              <div class="tourguide-provider">
                By <span>Tour Guide</span>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <p class="price">From: <span>$1632</span></p>
            </div>
          </div>
          <div class="hotel-card">
            <div class="hotel-image">
              <img :src="img13" alt="K2 Base Camp Trekking" />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="hotel-info">
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <div class="hotel-provider">
                <h3>Byarsa Hotel</h3>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>Skardu</p>
                </div>
              </div>
              <p class="price">From: <span>Rs 49,000</span></p>
              <p class="options-available">3 rooms available</p>
            </div>
          </div>
          <div class="bike-card">
            <div class="bike-image">
              <img
                :src="img16"
                alt="K2 Base Camp Trekking"
              />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="bike-info">
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>Islamabad</p>
                </div>
              </div>
              <h3>Fuego Tekken 250</h3>
              <div class="info">
                <div class="info-content">
                  <img
                    :src="img3"
                    alt=""
                  />
                  <p>Model</p>
                  <span>2017</span>
                </div>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img17" alt="" />
                  <p>Engine</p>
                  <span>250cc</span>
                </div>
              </div>
              <div class="bike-provider">
                By <span> Pakistan Bikers</span>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <p class="price">From: <span>Rs 7,420</span></p>
            </div>
          </div>
          <div class="car-card">
            <div class="car-image">
              <img
                :src="img18"
                alt="K2 Base Camp Trekking"
              />
              <span class="wishlist"
                ><img :src="img8" alt="Wishlist"
              /></span>
            </div>
            <div class="car-info">
              <div class="info">
                <div class="info-content">
                  <img :src="img0" alt="" />
                  <p>Lahore</p>
                </div>
              </div>
              <h3>Honda civic 2021</h3>
              <div class="info">
                <div class="info-content">
                  <img
                    :src="img3"
                    alt=""
                  />
                  <p>Model</p>
                  <span>2021</span>
                </div>
              </div>
              <div class="info">
                <div class="info-content">
                  <img :src="img17" alt="" />
                  <p>Engine</p>
                  <span>1800cc</span>
                </div>
              </div>
              <div class="car-provider">
                By <span> Fat Track Car Rental</span>
                <div class="rating-badge">
                  <span class="rating-icon"
                    ><img :src="img11" alt=""
                  /></span>
                  <span class="rating-score">4.5</span>
                </div>
              </div>
              <div class="reviews">
                <img :src="img12" alt="" />
                <span class="review-score">4.2</span>
                <span> 15 reviews</span>
              </div>
              <p class="price">From: <span>Rs 7,420</span></p>
            </div>
          </div>
        </div>
        <div class="show-more">
          <img :src="img19" alt="" />
          <span>Show more</span>
        </div>
      </section>
    </div>
  </main>
</template>
