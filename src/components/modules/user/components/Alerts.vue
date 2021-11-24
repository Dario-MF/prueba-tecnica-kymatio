<template>
  <section class="alerts">
      <img src="/assets/alert-2.png" alt="">
      <h3>¡Atención!</h3>
      <div 
        class="alerts__container"
        v-for="alert in alerts"
        :key="alert.id"
        >
          <div 
            class="alerts__container__text"
            :style="{background: alert.colorType }"
          >
          {{alert.text}}
          </div>
      </div>
      <button class="alerts__btn">
          Solucionar Incidencias
      </button>

  </section>
</template>

<script>
import useUser from '@/components/modules/user/composables/useUser'

export default {
    setup() {
        const {alerts} = useUser()
        return {
            alerts,
        }
    }
}
</script>

<style lang="scss" scoped>
.alerts {
    animation: pulse 5s infinite;
    padding-top: 4rem !important;
    display: flex;
    justify-content: space-between;
    text-align: center;
    img {
        width: 60px;
        display: block;
		position: absolute;
        top: -20px; 
        right: calc(50% - 30px) ;
    }
    &__container {
        width: 100%;
        flex: 1;
        padding-top: 1rem;
        &__text {
            width: 100%;
            min-height: 4rem;
            padding: 1rem;
            border-radius: 15px;
            color: $color-text-ligth;
            font-weight: 500;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    &__btn {
        @include btn;
    }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 93, 93, 0.6);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>