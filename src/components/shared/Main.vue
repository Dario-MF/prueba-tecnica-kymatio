<template>
  <main class="main">
    <NavBar />
    <h1>Main</h1>
    <router-view />
  </main>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
</style>