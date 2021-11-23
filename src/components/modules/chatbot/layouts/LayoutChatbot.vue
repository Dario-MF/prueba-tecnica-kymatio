<template>
  
  <ChatBot />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
       /*  ButtonChatbot: defineAsyncComponent(() => import('@/components/modules/chatbot/components/ButtonChatbot.vue')), */
        ChatBot: defineAsyncComponent(() => import('@/components/modules/chatbot/components/ChatBot.vue')),
    }
}
</script>

<style>

</style>