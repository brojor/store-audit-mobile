<template>
  <div class="overlay" v-if="isOpen">
    <div class="modal">
      <div class="model-title">{{$store.state.modal.title}}</div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseModal',
  props: ['isOpen'],
};
</script>

<style lang="css" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(3px);
  z-index: 10;
}
.modal {
  margin-top: 25%;
  width: 75%;
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 5px 15px 6px rgba(0, 0, 0, 0.37);
}
.model-title {
  font-size: 1.8rem;
  padding: 1.5rem 0;
  /* margin-bottom: 1rem; */
  font-weight: bold;
  background-color: #262d2d;
  color: white;
}
.modal-body {
  max-height: 75vh;
  padding: 1rem;
}

</style>
