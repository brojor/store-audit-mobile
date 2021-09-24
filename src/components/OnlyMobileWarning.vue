<template>
  <div v-if="windowWidth > 767" class="not-for-desktop">
    <p class="message">Tato aplikace je určena pouze pro mobilní zařízení</p>
  </div>
</template>

<script>
export default {
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
  },
};
</script>

<style scoped>
.not-for-desktop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(201, 150, 150);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.message {
  font-size: 4rem;
}
</style>
