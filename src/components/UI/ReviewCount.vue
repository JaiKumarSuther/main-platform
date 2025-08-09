<template>
  <div class="review-cont">
    <h2>Reviews</h2>
    <div class="review-summary">
      <div class="review-heading">
        <h2>4.0</h2>
        <div class="review-no">
          <div class="review-stars">
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img1" alt="" />
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
          <img :src="img2" alt="User Avatar" />
        </div>
        <div>
          <div class="review-info">
            <div class="name">Wamiq Ahmed</div>
            <div class="date">27 July 2025</div>
          </div>
          <div class="stars">
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
          </div>
        </div>
      </div>
      <p>
        Had a great experience with this operator, everything went smoothly.
        From the pickup in Islamabad to the dropoff at the airport, they took
        great care of us. Best value for money. Recommended.
      </p>
      <div class="review-media">
        <img :src="img3" alt="" />
        <img :src="img4" alt="" />
        <img :src="img5" alt="" />
        <img :src="img6" alt="" />
        <img :src="img7" alt="" />
        <img :src="img8" alt="" />
      </div>
    </div>
    <div class="reviews">
      <div class="review-list">
        <div class="avatar">
          <img :src="img2" alt="User Avatar" />
        </div>
        <div>
          <div class="review-info">
            <div class="name">Faisal</div>
            <div class="date">8 Jun 2025</div>
          </div>
          <div class="stars">
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
          </div>
        </div>
      </div>
      <p>Book with them, they're probably the best in Pakistan.</p>
      <div class="reply">
        <span><strong>Eventica Travels</strong> Replied</span>
        <p>
          Thank you so much for the kind words We're thrilled to hear that you
          enjoyed the mix of scenery, culture, and city experiences in Vietnam.
          Ensuring a smooth and safe journey for our travelers is our top
          priority
        </p>
      </div>
    </div>
    <div class="no-border reviews">
      <div class="review-list">
        <div class="avatar">
          <img :src="img2" alt="User Avatar" />
        </div>
        <div>
          <div class="review-info">
            <div class="name">Michael</div>
            <div class="date">24 May 2025</div>
          </div>
          <div class="stars">
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
            <img :src="img0" alt="" />
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
</template>
