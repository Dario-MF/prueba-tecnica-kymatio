<template>
  <nav class="navbar" :class="isActiveClass()">
    <ul class="navbar__list">
      <li>
        <router-link 
          active-class="active"
          class="navbar__list__item" 
          @click="$emit('on:close')"
          :to="{ name: 'dashboard' }"
        >Dashboard
        </router-link>
      </li>
      <li>
        <router-link 
          active-class="active"
          class="navbar__list__item"
          @click="$emit('on:close')" 
          :to="{ name: 'profile' }"
        >Perfil
        </router-link>
      </li>
      <li>
        <router-link 
          active-class="active"
          class="navbar__list__item" 
          @click="$emit('on:close')"
          :to="{ name: 'sesions' }"
        >Sesiones
        </router-link>
      </li>
      <li>
        <router-link 
          active-class="active"
          class="navbar__list__item" 
          @click="$emit('on:close')"
          :to="{ name: 'faq' }"
        >FAQ
        </router-link>
      </li>
      <li>
        <span 
          class="navbar__list__item"
          @click="onLogout"
        >
        Logout
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import useAuth from '@/components/modules/auth/composables/useAuth'

export default {
  props: {
    isActive: {
      type:Boolean,
      required: true
    }
  },
  emits: ["on:close"],
  setup(props) {
    const router = useRouter()
    const {logout} = useAuth()

    const isActiveClass = () => {
      if( props.isActive ){
        return "is-active"
      }
      return""      
    }

    const onLogout = async () => {
        const result = await Swal.fire({
          title: "¿Esta seguro de salir?",
          text: "Una vez salido tendra que volver a loguearse",
          showDenyButton: true,
          confirmButtonText: "Salir",
        });
        if (result.isDenied) return;
        router.push({ name: "home" });
        logout();
    }

    return {
      onLogout,
      isActiveClass,
    }
    
  }
};
</script>

<style lang="scss" scoped>
  .navbar {
    z-index: 10;
    position: absolute;
    top: 80px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: $color-bg-white;
    transition: all .4s ease-in-out;
    &.is-active {
      left: 0;
    }
    &__list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      list-style: none;
      & li {
        width: 100%;
        height: 20%;
      }
      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-weight: bold;
        color: $color-text-dark;
        &.active {
          background-color: $color-first;
        }
        &:hover {
          background-color: $color-first;
        }
      }
    } 
  }

  @include mq(l) {
    .navbar {
      left: 0;
      height: 80px;
      background-color: #fff;
      &__list {
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        & li {
          height: 100%;
        }
        & li:nth-child(5) {
          display: none;
        }
      }
      
    }
    
  }
</style>