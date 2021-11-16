<template>
  <header class="main-header">
    <div class="total-score">
      <div class="title-small">Total score:</div>
      <div class="perc">{{$store.getters.totalScore.perc.toFixed(2)}}%</div>
    </div>
    <div class="app-title">
      <img class="logo-small" src="@/assets/logo-small.png" alt="Hannah logo" />
      <h1 class="header-title">Store audit</h1>
    </div>
    <div class="log-out">
      <LogoutIcon @click.native="logout"></LogoutIcon>
    </div>
  </header>
</template>

<script>
import LogoutIcon from './icons/Logout.vue';

export default {
  components: {
    LogoutIcon,
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'));
    },
  },
};
</script>

<style scoped>
.total-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #e60001;
  font-size: 1.5rem;
}
.title-small {
  font-size: 0.8rem;
  color: #fff;
}
.perc {
  margin-top: 4px;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  color: azure;
}
.app-title {
  display: flex;
  align-items: center;
  justify-content: center;
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
.log-out {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
