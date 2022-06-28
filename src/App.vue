<template>
  <Navbar />
  <router-view></router-view>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';
export default {
    components: { Navbar }
}
</script>

<style>
/* card #071426 */
* {
  font-family: Avanta Garde, sans-serif;
  margin: 0;
  padding: 0;
  /* color: #fff;
  background-color: #040d19; */
}
</style>
