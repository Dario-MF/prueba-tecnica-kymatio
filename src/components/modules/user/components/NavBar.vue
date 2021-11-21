<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'dashboard' }">Dashboard</router-link></li>
      <li><router-link :to="{ name: 'profile' }">Perfil</router-link></li>
      <li><router-link :to="{ name: 'sesions' }">Sesiones</router-link></li>
      <li><router-link :to="{ name: 'faq' }">FAQ</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>