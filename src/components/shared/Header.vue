<template>
  <header>
    Header
    <button
      @click="openModal(); changeToLoginForm();"
    >
      Login
    </button>
    <button
      @click="openModal(); changeToRegisterFrm();"
    >
      Register
    </button>
    <!-- <button @click="onLogout">Logout</button> -->
  </header>

  <modal v-if="isModalOpen" @on:close="closeModal">
    <template v-if="isLogin" v-slot:body>
      <LoginForm @on:close="closeModal" @on:change="changeToRegisterForm" />
    </template>
    <template v-else v-slot:body>
      <RegisterForm @on:close="closeModal" @on:change="changeToLoginForm" />
    </template>
  </modal>
</template>

<script>
import { ref } from "vue";
import Modal from "./Modal.vue";
import LoginForm from "../modules/auth/components/LoginForm.vue";
import RegisterForm from "../modules/auth/components/RegisterForm.vue";

export default {
  components: {
    Modal,
    LoginForm,
    RegisterForm,
  },
  setup() {
    const isModalOpen = ref(false);
    const isLogin = ref(true);
    return {
      isModalOpen,
      isLogin,
      changeToLoginForm: () => (isLogin.value = true),
      changeToRegisterForm: () => (isLogin.value = false),
      openModal: () => (isModalOpen.value = true),
      closeModal: () => (isModalOpen.value = false),
    };
  },
};
</script>

<style>
</style>