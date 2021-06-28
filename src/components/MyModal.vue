<template>
  <div class="overlay" v-if="isOpen">
    <div class="dialog">
      <div class="title">{{$store.state.modal.title}}</div>
      <div class="modal-body">
        <slot />
      </div>
      <!--       <textarea
        v-model="textAreaText"
        placeholder="Zde stručně popiště problém.."
        name="aa"
        id="bb"
        rows="10"
      ></textarea> -->
    </div>
  </div>
</template>

<script>
// import EventBus from '@/eventBus';

export default {
  name: 'MyModal',
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
.overlay .dialog {
  margin-top: 25%;
  /*height: auto;*/
  width: 75%;
  background-color: white;
  /*border: 1px solid #111;*/
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 5px 15px 6px rgba(0, 0, 0, 0.37);
}
.dialog .title {
  font-size: 1.8rem;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
  font-weight: bold;
  /* background-color: #564d51; */
  background-color: #001414;
  background-color: #262d2d;
  color: white;
}
.modal-body {
  max-height: 75vh;
}

</style>
