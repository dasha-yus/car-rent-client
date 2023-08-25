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
* {
  font-family: Avanta Garde, sans-serif;
  margin: 0;
  padding: 0;
}

:root {
  --var-default-margin: calc(16% / 8);
}

body {
  color: #fff;
  background-color: #040d19;
}

.content {
  margin: var(--var-default-margin);
}

.p-card-body {
    height: 100%;
}

.p-card-content {
    height: 100%;
}

.p-dialog-header-icons {
  display: none !important;
}
</style>
