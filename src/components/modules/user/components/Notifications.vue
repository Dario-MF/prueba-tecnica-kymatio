<template>
  <section class="notifications">
      <div 
        v-if="numNotifications > 0"
        class="notifications__bell"
      >
        <span class="notifications__bell__number">
            {{numNotifications}}
        </span>
        <img src="/assets/bell.png" alt="">
      </div>
      <div 
        v-for="item in notifications"
        :key="item.date"
        class="notifacations__container"
        >
          <div 
            v-if="!item.read"
            :style="{background: item.colorType }"
            class="notifacations__item"
          >
              <div class="notifacations__item__icon">
                  <img :src="item.icon" alt="">
              </div>
              <div class="notifacations__item__box">
                  <p class="notifacations__item__box__date">{{item.parseDate}}</p>
                  <p class="notifacations__item__box__text">{{item.text}}</p>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import useUser from '@/components/modules/user/composables/useUser'

export default {
    setup() {
        const {notifications} = useUser()

        const countNotifications = () => {
            let counter = 0
            notifications.value.forEach(e => {
                if(!e.read) {
                    counter++
                }
            });
            return counter
        }
        return {
            notifications,
            numNotifications: computed(() => countNotifications()),
        }
    }
}
</script>

<style lang="scss">
.notifications__bell {
    position: absolute;
    top: 0;
    left: 0;
    img {
        width: 3rem;
        height: 3rem;
        display: block;
		position: absolute;
        top: 50%; 
        right: 50%;
        transform: translate(50%,-50%);
    }
    &__number {
        position: relative;
        top: -10px;
        right: -10px;
        z-index: 100;
        display: flex;
        justify-content: center;
        color: $color-text-ligth;
        background-color: $color-danger;
        width: 23px;
        height: 23px;  
        border-radius: 50%;
    }
}
.notifacations__container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .notifacations__item {
        width: 100%;
        min-height: 4rem;
        border-radius: 15px;
        display: flex;
        margin-bottom: 1rem;
        padding: .5rem 1rem;
        &__icon {
            width: 15%;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                display: block;
		        width: 100%;
            }
        }
        &__box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 1rem;
            color: $color-text-dark;
        }

        &__box__date {
            font-weight: bold;
            text-align: end;
            margin-bottom: .5rem;
        }
    }
}
</style>