<template>
  <UserHeader />
  <main class="main">  
    <router-view /> 
    <ChatBot />
  </main>
  <Footer />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    UserHeader: defineAsyncComponent(() => import('@/components/modules/user/components/UserHeader.vue')),
    ChatBot: defineAsyncComponent(() => import('@/components/modules/chatbot/components/ChatBot.vue')),
    Footer: defineAsyncComponent(() => import('@/components/shared/Footer.vue')),
  }
}
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    background-color: $color-bg-white;
  }
  @include mq(l) {
    .main {
      margin-top: 80px;
    }
  }
</style>