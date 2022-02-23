<template>
  <header class="main-header" v-if="userIsLogged">
    <div class="total-score">
      <p class="title-small">Total score:</p>
      <p class="perc">{{ tweened.toFixed(2) }}%</p>
    </div>
    <div class="logo-container">
      <img class="logo-small" src="@/assets/logo-small.png" alt="Hannah logo" />
      <h1 class="header-title">Store audit</h1>
    </div>
    <button class="logout">
      <LogoutIcon @click.native="logout"></LogoutIcon>
    </button>
  </header>
</template>

<script>
import gsap from 'gsap';
import LogoutIcon from './icons/Logout.vue';

export default {
  data() {
    return {
      tweened: 0,
    };
  },
  computed: {
    userIsLogged() {
      return this.$store.getters.isAuthenticated;
    },
    score() {
      if (Object.keys(this.$store.state.results).length) {
        return this.$store.getters.score().perc;
      }
      return 0;
    },
  },
  components: {
    LogoutIcon,
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'));
    },
  },
  watch: {
    score(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 });
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
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  color: azure;
}
.logo-container {
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
.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0;
}
</style>
