<template>
  <UserHeader />
  <main class="main">
    <NavBar />
    <router-view />
  </main>
  <Footer />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    UserHeader: defineAsyncComponent(() => import('@/components/modules/user/components/UserHeader.vue')),
    NavBar: defineAsyncComponent(() => import('@/components/modules/user/components/NavBar.vue')),
    Footer: defineAsyncComponent(() => import('@/components/shared/Footer.vue')),
  }
}
</script>

<style>

</style>