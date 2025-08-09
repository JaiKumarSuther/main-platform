<template>
  <div class="openReq-container">
    <h2>Ticket <span>23910</span></h2>
    <div class="label open">Open</div>

    <div class="openReq">
      <h2 class="req-title">
        Urgent Issue with my tour booking as the operator is asking me to cancel
        the booking.
      </h2>
      <p class="req-text">
        Hello, I booked the Fairy Meadows & Nanga Parbat Base Camp Trek for
        april 15,but I haven't received my confirmation email yet. My payment
        was deducted,but my booking still says "Pending" Can you please confirm
        my booking? I need to finalize my travel plans.Looking forward for your
        response.
      </p>
      <p class="req-related"><span>Related to</span> Bookings</p>
    </div>

    <div class="reply-card">
      <div class="support-reply">
        <div class="person-info">
          <img :src="img0" alt="" />
          <div>
            <p>Person</p>
            <p>customer support</p>
          </div>
          <p class="date">25 july 2025 17:11</p>
        </div>
        <div class="reply">
          <p>
            Hey, thankyou for reaching out to us. It looks like you didn’t
            receive the confirmation email due to a system issue, we apologise
            for that. I can confirm to you that your booking is indeed
            confirmed.
          </p>
          <p>
            As for the pending status, you’re seeing pending status because
            until the cancellation date, your booking is in pending state,
            however once the cancellation date passes, your booking’s status
            will change to confirm.
          </p>
        </div>
      </div>
    </div>

    <div class="reply-card">
      <div class="customer-reply">
        <div class="person-info">
          <img :src="img1" alt="" />
          <div>
            <p>Wamiq</p>
          </div>
          <p class="date">25 july 2025 17:11</p>
        </div>
        <div class="reply">
          <p>Thank you for clairfying the issue, i appreciate that.</p>
        </div>
      </div>
    </div>

    <div class="request-open">
      <textarea placeholder="Reply..."></textarea>
      <div class="send-icon">
        <img :src="img2" alt="" />
      </div>
    </div>
  </div>
</template>
