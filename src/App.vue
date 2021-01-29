<template>
  <div id="app">
    <StoreAudit />
  </div>
</template>

<script>
import StoreAudit from '@/components/StoreAudit.vue';

export default {
  name: 'App',
  components: {
    StoreAudit,
  },
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
