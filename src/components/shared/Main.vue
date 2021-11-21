<template>
  <main class="main">
    <header class="main--header">
      <div class="main--header--slogan">
        <h1>
          <span>
            Apoya a tu gente
          </span>
          <br>
          <span>
            Protege la compañía
          </span>
        </h1>
        <h2>
          <span>
            Gestión del Ciberriesgo de Empleados
          </span>
          <br>
          <span>
            Activación de firewalls humanos
          </span>
        </h2>
      </div>
    </header>
  </main>
</template>

<script>
export default {
  components: {
  },
};
</script>

<style lang="scss" scoped>
  .main--header {
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 50px) ;
    background-color: $color-third;
    background-image: url("/assets/login-visual.svg");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size:contain;
    &--slogan {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 2rem;
      & h1 {
        font-size: $font-size-XL;
        font-weight: bold;
        color: $color-text-dark ;
      }
      & h2 {
        font-size: $font-size-L;
        font-weight: lighter;
        color: $color-text-dark-medium;
      }
    }
  }

</style>