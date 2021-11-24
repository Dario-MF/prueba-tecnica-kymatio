<template>
  <div class="profile-grid">
    <Evolution />
    <Timeline />
    <Alerts />
    <Notifications />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: 'profile',
  components: {
    Evolution: defineAsyncComponent(() => import('@/components/modules/user/components/Evolution.vue')),
    Timeline: defineAsyncComponent(() => import('@/components/modules/user/components/Timeline.vue')),
    Notifications: defineAsyncComponent(() => import('@/components/modules/user/components/Notifications.vue')),
    Alerts: defineAsyncComponent(() => import('@/components/modules/user/components/Alerts.vue')),
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}
  .profile-grid {
    width: 100%;
    padding: 2rem 1rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, [col-start] 1fr);
    .timeline {
      grid-column: col-start / span 3;
      grid-row: 1;
      @include panel;
    }
    .evolution {
      grid-column: col-start / span 3;
      grid-row: 2 / 3;
      @include panel;
    }
    .notifications {
      grid-column: col-start / span 3;
      grid-row: 3 / 4;
      @include panel;
    }
    .alerts {
      grid-column: col-start / span 3;
      grid-row: 4 / 5;
      @include panel;
    }
    @include mq(s) {
      padding: 3rem 2rem;
    }
    @include mq(m) {
      padding: 3rem;
    }
    @include mq(l) {
      padding: 3rem 0;
      grid-template-columns: repeat(11, [col-start] 1fr); 
      grid-template-rows: 1fr 1fr; 

      .timeline {
        grid-column: 2 / span 3;
        grid-row: 1 / span 2; 
        height: 100%;
      }
      .evolution {
        grid-column: 5 / span 6;
        grid-row: 1 / span 1; 
         height: 100%;
      }
      .notifications {
        grid-column: 5 / span 3;
        grid-row: 2 / span 1;
        height: 100%;
      }
      .alerts {
        grid-column: 8 / span 3;
        grid-row: 2 / span 1;
        height: 100%;
      }

    }
  }
</style>