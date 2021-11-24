<template>
  <div v-if="authStatus === 'authenticating'" class="spinner-container">
    <div class="spinner">
      Espere por favor...
      <h3>
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>
  <router-view v-else />
  <ChatBot />
</template>
<script>
import { defineAsyncComponent } from "vue";
import useAuth from "../composables/useAuth";

export default {
  components: {
    ChatBot: defineAsyncComponent(() => import('@/components/modules/chatbot/components/ChatBot.vue')),
  },
  setup() {
    const { authStatus, checkStatus } = useAuth();
    checkStatus();
    return {
      authStatus,
    };
  },
};
</script>