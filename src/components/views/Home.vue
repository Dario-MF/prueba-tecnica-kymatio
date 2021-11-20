<template>
  <Header />
  <Main />
  <Footer />
</template>

<script>
import Header from "@/components/shared/Header.vue";
import Main from "@/components/shared/Main.vue";
import Footer from "@/components/shared/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>
