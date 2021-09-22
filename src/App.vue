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
</style>
