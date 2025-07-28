<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';

const route = useRoute();
const bookingId = route.params.bookingId as string || 'default-booking-id';

const userJson = localStorage.getItem('user');
const user = userJson ? JSON.parse(userJson) : null;
const authToken = localStorage.getItem('authToken');
const userId = user?.user_id;

const conversations = ref<any[]>([]);
const activeConversation = ref<any>(null);
const messages = ref<any[]>([]);
const newMessage = ref('');
const file = ref<File | null>(null);

const fetchConversations = async () => {
  try {
    const res = await api.get(`/chatting/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('📨 Conversations API Response:', res.data);

    conversations.value = (Array.isArray(res.data) ? res.data : []).map((item: any) => {
      const isSender = item?.sender?.user_id === userId;
      const chatWith = isSender ? item.receiver : item.sender;

      return {
        avatar: '@/assets/images/auto-generate.jpg',
        name: chatWith?.full_name || 'Unknown',
        receiver_id: chatWith?.user_id,
        booking_id: item.booking.booking_id,
        last_message: item.message_text,
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    });

    if (conversations.value.length) {
      setActiveConversation(conversations.value[0]);
    }
  } catch (err) {
    console.error('❌ Failed to fetch conversations:', err);
  }
};

const fetchMessages = async () => {
  if (!activeConversation.value) return;

  try {
    const res = await api.get(`/messages/booking/${activeConversation.value.booking_id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(`💬 Messages API Response for booking ${activeConversation.value.booking_id}:`, res.data);

    messages.value = Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('❌ Failed to fetch messages:', err);
  }
};

const sendMessage = async () => {
  if ((!newMessage.value.trim() && !file.value) || !activeConversation.value) return;

  const formData = new FormData();
  formData.append('booking_id', activeConversation.value.booking_id);
  formData.append('sender_id', userId);
  formData.append('receiver_id', activeConversation.value.receiver_id);
  formData.append('message_text', newMessage.value);
  if (file.value) {
    formData.append('message_file', file.value);
  }

  console.log('🚀 Sending Message Payload:', {
    booking_id: activeConversation.value.booking_id,
    sender_id: userId,
    receiver_id: activeConversation.value.receiver_id,
    message_text: newMessage.value,
    message_file: file.value,
  });

  try {
    const res = await api.post('/chatting/', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('✅ Message Sent API Response:', res.data);

    messages.value.push(res.data.data);
    newMessage.value = '';
    file.value = null;
  } catch (err) {
    console.error('❌ Failed to send message:', err);
  }
};

const setActiveConversation = (conv: any) => {
  activeConversation.value = conv;
  fetchMessages();
};

onMounted(() => {
  fetchConversations();
});
</script>


<template>
  <div class="chat-app">
    <aside class="chat-sidebar">
      <h2>Messages</h2>
      <div
        v-for="conv in conversations"
        :key="conv.booking_id"
        :class="['conversation', { active: activeConversation?.booking_id === conv.booking_id }]"
        @click="setActiveConversation(conv)"
      >
        <img :src="conv.avatar" class="avatar" />
        <div>
          <div>{{ conv.name }}</div>
          <small>{{ conv.last_message }}</small>
        </div>
      </div>
    </aside>

    <section class="chat-section" v-if="activeConversation">
      <div class="messages">
        <div
          v-for="msg in messages"
          :key="msg.message_id"
          :class="['message', msg.sender_id === userId ? 'sent' : 'received']"
        >
          <p>{{ msg.message_text }}</p>
          <img v-if="msg.message_file" :src="msg.message_file" class="uploaded-image" />
        </div>
      </div>

      <div class="chat-input">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type message..."
          @keyup.enter="sendMessage"
        />
        <input type="file" @change="e => file = e.target.files[0]" />
        <button @click="sendMessage">Send</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.chat-app {
  display: flex;
}
.chat-sidebar {
  width: 250px;
  border-right: 1px solid #ccc;
  padding: 10px;
}
.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}
.message {
  margin: 5px 0;
}
.sent {
  text-align: right;
}
.uploaded-image {
  width: 200px;
  height: auto;
  margin-top: 5px;
}
.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}
</style>
