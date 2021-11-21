<template>
  <footer class="footer">
    <p class="footer-copyright">
      <span>{{yearCopyrigth}}</span>
      <span>Kymatio. </span>
      <br>
      <span>Todos los derechos reservados. </span>
      <br>
      <a href="https://kymatio.com/">www.kymatio.com</a>
    </p>
  </footer>
</template>

<script>
import {computed} from 'vue'
export default {
  setup() {
    return {
      yearCopyrigth: computed(() => new Date().getFullYear() + ' \u00A9 '),
    }
  }
};
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 1rem;
    background-color: $color-bg-white;
    overflow: hidden;
    & a {
      color: $color-fourth;
      &:hover {
        text-decoration: underline;
      }
    }
  }

</style>