<template>
  <div class="not-for-desktop">
    <p class="message">Tato aplikace je určena pouze pro <span>mobilní</span> zařízení!</p>
  </div>
</template>

<style scoped>
.not-for-desktop {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #001414;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.message {
  font-size: 4rem;
  color: #fff;
  padding: 6rem;
}
span {
  color: #e60001;
  font-weight: 800;
}
</style>
