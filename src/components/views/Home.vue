<template>
  <Header />
  <Main />
  <Footer />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Home",
  components: {
    Header: defineAsyncComponent(() => import('@/components/shared/Header.vue')),
    Main: defineAsyncComponent(() => import('@/components/shared/Main.vue')),
    Footer: defineAsyncComponent(() => import('@/components/shared/Footer.vue')),
  },
};
</script>
