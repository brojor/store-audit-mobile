<template>
  <div id="app">
    <MainHeader />
    <router-view />
    <RootModal></RootModal>
  </div>
</template>

<script>
import RootModal from './components/modal/RootModal.vue';
import MainHeader from './components/MainHeader.vue';

export default {
  components: {
    MainHeader,
    RootModal,
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
  background-color: #0a0a17
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
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
