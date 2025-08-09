<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMessages } from '@/composables/useMessages';
import { useAuth } from '@/composables/useAuth';

const route = useRoute();
const router = useRouter();
const bookingId = route.query.booking as string;

const { useUserConversations, useBookingMessages, sendMessageMutation } = useMessages();
const { isAuthenticated } = useAuth();

// Safe localStorage access
const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const getUserData = () => {
  try {
    return localStorage.getItem('user');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const userJson = getUserData();
const user = userJson ? JSON.parse(userJson) : null;
const userId = user?.user_id;

const activeConversation = ref<any>(null);
const newMessage = ref('');
const file = ref<File | null>(null);

// Get user conversations
const conversationsQuery = useUserConversations();

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!getAuthToken() && !!getUserData();
});

// Get messages for active conversation
const messagesQuery = computed(() => {
  if (!activeConversation.value?.booking_id) return null;
  return useBookingMessages(activeConversation.value.booking_id);
});

const setActiveConversation = (conv: any) => {
  activeConversation.value = conv;
};

const sendMessage = async () => {
  if ((!newMessage.value.trim() && !file.value) || !activeConversation.value) return;

  const messageData = {
    booking_id: activeConversation.value.booking_id,
    sender_id: userId,
    receiver_id: activeConversation.value.receiver_id,
    message_text: newMessage.value,
    message_file: file.value
  };

  sendMessageMutation.mutate(messageData, {
    onSuccess: () => {
      newMessage.value = '';
      file.value = null;
      // Refresh messages
      if (messagesQuery.value) {
        messagesQuery.value.refetch();
      }
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
    }
  });
};

onMounted(() => {
  // Check if user is logged in, if not redirect to login
  if (!isLoggedIn.value) {
    router.push('/auth/login');
    return;
  }

  // Set active conversation if booking ID is provided
  if (bookingId && conversationsQuery.data.value) {
    const conv = conversationsQuery.data.value.find(c => c.booking_id === bookingId);
    if (conv) {
      setActiveConversation(conv);
    }
  }
});
</script>

<template>
  <div class="messages-container">
    <h2>Messages</h2>
    

    
    <!-- Not logged in state -->
    <div v-if="!isLoggedIn" class="not-logged-in">
      <div class="empty-state-icon">🔐</div>
      <h3>Authentication Required</h3>
      <p>You need to be logged in to view your messages.</p>
      <button @click="router.push('/auth/login')" class="login-btn">Go to Login</button>
    </div>

    <!-- Messages interface - Always show when logged in -->
    <div v-else class="chat-app">
      <aside class="chat-sidebar">
        <h3>Conversations</h3>
        
        <!-- Loading conversations - Only show if no data exists yet -->
        <div v-if="conversationsQuery.isLoading && !conversationsQuery.data" class="conversations-loading">
          <div class="loading-spinner small"></div>
          <p>Loading conversations...</p>
        </div>

        <!-- Error loading conversations - Show as empty state instead -->
        <div v-else-if="conversationsQuery.isError" class="empty-conversations">
          <div class="empty-state-icon">💬</div>
          <h4>No Conversations Yet</h4>
          <p>You don't have any message conversations yet. Start booking tours to begin messaging!</p>
        </div>

        <!-- Empty conversations -->
        <div v-else-if="!conversationsQuery.data || conversationsQuery.data.length === 0" class="empty-conversations">
          <div class="empty-state-icon">💬</div>
          <h4>No Conversations Yet</h4>
          <p>You don't have any message conversations yet. Start booking tours to begin messaging!</p>
        </div>

        <!-- Conversations list -->
        <div v-else class="conversations-list">
          <div
            v-for="conv in conversationsQuery.data"
            :key="conv.booking_id"
            :class="['conversation', { active: activeConversation?.booking_id === conv.booking_id }]"
            @click="setActiveConversation(conv)"
          >
            <img :src="conv.avatar || '/src/assets/images/auto-generate.jpg'" class="avatar" alt="Avatar" />
            <div class="conversation-info">
              <div class="conversation-name">{{ conv.name }}</div>
              <small class="conversation-preview">{{ conv.last_message }}</small>
              <small class="conversation-time">{{ conv.time }}</small>
            </div>
          </div>
        </div>
      </aside>

      <section class="chat-section" v-if="activeConversation">
        <div class="chat-header">
          <h3>{{ activeConversation.name }}</h3>
          <small>Booking: {{ activeConversation.booking_id }}</small>
        </div>

        <!-- Messages loading - Only show if no data exists yet -->
        <div v-if="messagesQuery?.isLoading && !messagesQuery.data" class="messages-loading">
          <div class="loading-spinner small"></div>
          <p>Loading messages...</p>
        </div>

        <!-- Messages error - Show as empty state instead -->
        <div v-else-if="messagesQuery?.isError" class="empty-messages">
          <div class="empty-state-icon">💬</div>
          <h4>No Messages Yet</h4>
          <p>No messages found for this conversation.</p>
        </div>

        <!-- Messages content -->
        <div v-else class="messages">
          <div v-if="!messagesQuery?.data || messagesQuery.data.length === 0" class="empty-messages">
            <div class="empty-state-icon">💭</div>
            <h4>No Messages Yet</h4>
            <p>Start the conversation by sending your first message!</p>
          </div>
          
          <div v-else>
            <div
              v-for="msg in messagesQuery.data"
              :key="msg.message_id"
              :class="['message', msg.sender_id === userId ? 'sent' : 'received']"
            >
              <p>{{ msg.message_text }}</p>
              <img v-if="msg.message_file" :src="msg.message_file" class="uploaded-image" alt="Attachment" />
              <small class="message-time">{{ new Date(msg.timestamp).toLocaleTimeString() }}</small>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type message..."
            @keyup.enter="sendMessage"
            :disabled="sendMessageMutation.isPending.value"
          />
          <input 
            type="file" 
            @change="e => file = e.target.files?.[0] || null"
            :disabled="sendMessageMutation.isPending.value"
          />
          <button 
            @click="sendMessage"
            :disabled="sendMessageMutation.isPending.value"
          >
            {{ sendMessageMutation.isPending.value ? 'Sending...' : 'Send' }}
          </button>
        </div>
      </section>

      <!-- No conversation selected -->
      <section v-else class="no-conversation">
        <div class="empty-state-icon">💬</div>
        <h3>Select a Conversation</h3>
        <p>Choose a conversation from the sidebar to start messaging</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.messages-container {
  padding: 20px;
}

.messages-container h2 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.not-logged-in {
  text-align: center;
  padding: 60px 40px;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

.empty-state-icon, .error-state-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.not-logged-in h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
}

.not-logged-in p {
  margin-bottom: 25px;
  font-size: 16px;
  line-height: 1.5;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn, .login-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-btn:hover, .login-btn:hover {
  background: #2980b9;
}

.retry-btn.small {
  padding: 8px 16px;
  font-size: 14px;
}

.error-details {
  color: #e74c3c;
  font-size: 14px;
  margin: 15px 0;
  padding: 10px;
  background: #fdf2f2;
  border-radius: 4px;
  border-left: 4px solid #e74c3c;
}

.chat-app {
  display: flex;
  height: 600px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
}

.chat-sidebar {
  width: 300px;
  border-right: 1px solid #e1e8ed;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.chat-sidebar h3 {
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid #e1e8ed;
  background: white;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversations-loading, .conversations-error, .empty-conversations {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.conversations-error h4, .empty-conversations h4 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
  font-size: 18px;
}

.conversations-error p, .empty-conversations p {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 15px;
}

.conversation {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e1e8ed;
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation:hover {
  background: #e9ecef;
}

.conversation.active {
  background: #3498db;
  color: white;
}

.conversation.active .conversation-preview,
.conversation.active .conversation-time {
  color: rgba(255, 255, 255, 0.8);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-name {
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-preview {
  display: block;
  color: #666;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-time {
  display: block;
  color: #999;
  font-size: 11px;
  margin-top: 2px;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  background: #f8f9fa;
}

.chat-header h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.chat-header small {
  color: #666;
}

.messages-loading, .messages-error, .empty-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-align: center;
  padding: 40px 20px;
}

.messages-error h4, .empty-messages h4 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
  font-size: 18px;
}

.messages-error p, .empty-messages p {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 15px;
}

.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  position: relative;
}

.message.sent {
  align-self: flex-end;
  background: #3498db;
  color: white;
}

.message.received {
  align-self: flex-start;
  background: #f1f3f4;
  color: #2c3e50;
}

.message p {
  margin: 0 0 5px 0;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
}

.uploaded-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 8px;
}

.chat-input {
  display: flex;
  padding: 20px;
  border-top: 1px solid #e1e8ed;
  gap: 10px;
  align-items: center;
}

.chat-input input[type="text"] {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e1e8ed;
  border-radius: 20px;
  outline: none;
}

.chat-input input[type="text"]:focus {
  border-color: #3498db;
}

.chat-input input[type="file"] {
  flex: 0 0 auto;
}

.chat-input button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.chat-input button:hover:not(:disabled) {
  background: #2980b9;
}

.chat-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.no-conversation {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-align: center;
  padding: 40px 20px;
}

.no-conversation h3 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
  font-size: 24px;
}

.no-conversation p {
  font-size: 16px;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .chat-app {
    flex-direction: column;
    height: auto;
  }
  
  .chat-sidebar {
    width: 100%;
    max-height: 300px;
  }
  
  .message {
    max-width: 85%;
  }
  
  .not-logged-in {
    padding: 40px 20px;
  }
}
</style>
