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
        Hello, I booked the Fairy Meadows &amp; Nanga Parbat Base Camp Trek for
        April 15, but I haven't received my confirmation email yet. My payment
        was deducted, but my booking still says "Pending". Can you please confirm
        my booking? I need to finalize my travel plans. Looking forward to your
        response.
      </p>
      <p class="req-related"><span>Related to</span> Bookings</p>
    </div>

    <div class="reply-card">
      <div class="support-reply">
        <div class="person-info">
          <img :src="img0" alt="Support Logo" />
          <div>
            <p>Person</p>
            <p>Customer Support</p>
          </div>
          <p class="date">25 July 2025 17:11</p>
        </div>
        <div class="reply">
          <p>
            Hey, thank you for reaching out to us. It looks like you didn’t
            receive the confirmation email due to a system issue, we apologise
            for that. I can confirm to you that your booking is indeed confirmed.
          </p>
          <p>
            As for the pending status, you’re seeing pending status because
            until the cancellation date, your booking is in a pending state.
            However, once the cancellation date passes, your booking’s status
            will change to confirmed.
          </p>
        </div>
      </div>
    </div>

    <div class="reply-card">
      <div class="customer-reply">
        <div class="person-info">
          <img :src="img1" alt="Customer Avatar" />
          <div>
            <p>Wamiq</p>
          </div>
          <p class="date">25 July 2025 17:11</p>
        </div>
        <div class="reply">
          <p>Thank you for clarifying the issue, I appreciate that.</p>
        </div>
      </div>
    </div>

    <div class="request-closed">
      <p class="closed">Closed</p>
      <p>This request is closed for comments. You can create a follow-up.</p>
    </div>
  </div>
</template>
