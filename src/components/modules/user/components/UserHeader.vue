<template>
  <header class="header">
    <div class="header--brand">
      <img src="/assets/Kymatio-white.png" alt="brand">
    </div>
    <div class="header__container">
      <div class="header__current-user">
        <span class="header__current-user__name">{{UserNameComplete}}</span>
        <div 
          class="header__current-user__avatar"
          :style="{background: bkgColor }"
        >
          <p>{{userInitials}}</p>
        </div>
      </div>

      <div 
        v-if="numNotifications > 0"
        class="header__bell-notifications"
      >
        <span 
          class="header__bell-notifications__number"
        >{{numNotifications}}</span>
        <img src="/assets/bell.png" alt="">
      </div>

      <button @click="onLogout" class="header__current-user__btnlogout">
        Salir 
        <i class="bi bi-box-arrow-right"></i>
      </button>

      <button 
        class="hamburger hamburger--collapse"
        :class="isActiveClass()"
        type="button"
        @click="onClickMenu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  </header>
  <NavBar @on:close="onClickMenu" :isActive="isActive" />
</template>

<script>
import { ref, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import useUser from '@/components/modules/user/composables/useUser'
import useAuth from '@/components/modules/auth/composables/useAuth'

export default {
  components: {
    NavBar: defineAsyncComponent(() => import('@/components/modules/user/components/NavBar.vue')),
  },
  setup() {
    const router = useRouter()
    const {userInitials, userColor, UserNameComplete, notifications} = useUser()
    const {logout} = useAuth()
    const isActive = ref(false)
    const bkgColor = ref(userColor())

    const countNotifications = () => {
      let counter = 0
      notifications.value.forEach(e => {
        if(!e.read) {
          counter++
        }
      });
      return counter
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
    const isActiveClass = () => {
      if( isActive.value){
        return "is-active"
      }
      return""      
    }
    return {
      onLogout,
      bkgColor,
      userInitials,
      UserNameComplete,
      isActive,
      isActiveClass,
      numNotifications: computed(() => countNotifications()),
      onClickMenu: () => (isActive.value = !isActive.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
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
    &__container {
      display: flex;
    }
    &__current-user {
      display: none;
      align-items: center;
      color: $color-text-ligth;

      &__avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 1rem;
          border-radius: 50%;
          & p {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 3rem;
              height: 3rem;
              font-weight: bold;
              color: $color-text-ligth;
          }
      }
      &__btnlogout {
        @include btn;
        cursor: pointer;
        display: none;
      }
    }
    &__bell-notifications {
      position: relative;
      width: 60px;
      height: 60px;
      margin: 0 2rem 0 1rem;
      &__number {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $color-text-ligth;
        background-color: $color-danger;
        width: 23px;
        height: 23px;  
        border-radius: 50%;
      }
      img {
        display: block;
		    width: 40px;
		    height: 40px;
		    position: absolute;
        top: 50%; 
        right: 50%;
        transform: translate(50%,-50%);
      }
    }

  }
  @include mq(s) {
    .header__current-user {
      display: flex;
    }
  }
   @include mq(l) {
     .header {
       padding: 1rem 8rem;
     }
     .hamburger {
       display: none;
     }
     .header__current-user__btnlogout {
       display: block;
     }
   }
</style>