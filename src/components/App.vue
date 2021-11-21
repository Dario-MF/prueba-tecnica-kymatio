<template>
  <div v-if="authStatus === 'authenticating'" class="spinner-container">
    <div class="spinner">
      Espere por favor...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>
  <router-view v-else />
</template>
<script>
import useAuth from "../composables/useAuth";
export default {
  setup() {
    const { authStatus, checkStatus } = useAuth();
    checkStatus();
    return {
      authStatus,
    };
  },
};
</script>