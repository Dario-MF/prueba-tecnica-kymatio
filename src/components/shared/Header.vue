<template>
  <header class="header">
    Header
    <button
      @click="openModal(); changeToLoginForm()"
    >
      Login
    </button>
    <button
      @click="openModal(); changeToRegisterForm()"
    >
      Register
    </button>
    <button @click="getUser">Logout</button>
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
import {useStore} from 'vuex'
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
    const store = useStore()
    const isModalOpen = ref(false);
    const isLogin = ref(true);
    return {
      isModalOpen,
      isLogin,
      changeToLoginForm: () => (isLogin.value = true),
      changeToRegisterForm: () => (isLogin.value = false),
      openModal: () => (isModalOpen.value = true),
      closeModal: () => (isModalOpen.value = false),
      getUser: () => (store.dispatch('auth/signInUser', 'fakeData'))
    };
  },
};
</script>

<style>
</style>