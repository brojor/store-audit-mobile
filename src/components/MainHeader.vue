<template>
  <header class="main-header">
    <img class="logo-small" src="@/assets/logo-small.png" alt="Hannah logo" />
    <h1 class="header-title">Store audit</h1>
    <Logout @click.native="logout"></Logout>
  </header>
</template>

<script>
import Logout from './icons/Logout.vue';

export default {
  components: {
    Logout,
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('Login'));
    },
  },
};
</script>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.logo-small {
  max-width: 100%;
  height: 3rem;
}
.header-title {
  font-size: 2.2rem;
  margin-left: 1rem;
  text-transform: uppercase;
  color: white;
}
</style>
