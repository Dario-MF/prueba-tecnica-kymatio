<template>
  <div class="modal-background fade-in" @click.self="$emit('on:close')">
    <div class="modal-container">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["on:close"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  &.fade-in {
      animation: fadeIn ease-out 0.2s;
      -webkit-animation: fadeIn ease-out 0.2s;
      -moz-animation: fadeIn ease-out 0.2s;
      -o-animation: fadeIn ease-out 0.2s;
      -ms-animation: fadeIn ease-out 0.2s;
  }

  .modal-container {
    width: 250px;
    height: 250px;
    background-color: $color-bg-white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
}

@include keyframes(fadeIn) {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
}
</style>