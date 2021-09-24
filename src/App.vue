<template>
  <div>
    <div id="app">
      <StoreAudit />
    </div>
    <only-mobile-warning />
  </div>
</template>

<script>
import StoreAudit from '@/components/StoreAudit.vue';
import OnlyMobileWarning from './components/OnlyMobileWarning.vue';

export default {
  name: 'App',
  components: {
    StoreAudit,
    OnlyMobileWarning,
  },
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #001414;
}
.btn {
  border: none;
  border-radius: 4px;
  background-color: #e60001;
  color: white;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
  font-weight: 600;
  font-size: 1.8rem;
}
.btn-small {
  padding: 1rem 2rem;
  margin: 1rem;
  min-width: 100px;
}
</style>
