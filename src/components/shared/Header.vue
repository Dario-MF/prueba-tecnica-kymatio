<template>
  <header class="header">
    <div class="header--brand">
      <img src="/assets/Kymatio-white.png" alt="brand">
    </div>
    <button
      @click="openModal(); changeToLoginForm()"
      class="header--btn-login"
    >
      Login
    </button>
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
import { ref, defineAsyncComponent } from "vue";

export default {
  components: {
    Modal: defineAsyncComponent(() => import('@/components/shared/Modal.vue')),
    LoginForm: defineAsyncComponent(() => import('@/components/modules/auth/components/LoginForm.vue')),
    RegisterForm: defineAsyncComponent(() => import('@/components/modules/auth/components/RegisterForm.vue')),
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

<style lang="scss">
  .header {
    overflow: hidden;
    width: 100%;
    height: 80px;
    background-color: $color-fourth;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    &--brand img{
      height: 50px;
    }
    &--btn-login {
      @include btn
    }
  }
</style>