<template>
  <div class="overlay" v-if="isOpen">
    <div class="dialog">
      <div class="title">Přidání poznámky</div>
      <textarea v-model="message" placeholder="Zde stručně popište problém.." rows="8"></textarea>
      <!--       <textarea
        v-model="textAreaText"
        placeholder="Zde stručně popiště problém.."
        name="aa"
        id="bb"
        rows="10"
      ></textarea> -->
      <button @click="handleSubmit">Uložit</button>
    </div>
  </div>
</template>

<script>
// import EventBus from '@/eventBus';

export default {
  name: 'MyModal',
  props: ['isOpen'],

  data() {
    return {
      message: '',
    };
  },
  methods: {
    handleSubmit() {
      // EventBus.$emit('commentAdded', this.message);
      this.$store.commit('WRITE_COMMENT', this.message);
      this.message = '';
      // this.$emit('close');
      this.$store.commit('CLOSE_MODAL');
    },
  },
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
  background-color: #564d51;
  color: white;
}
textarea {
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  /*margin: 1rem;*/
  width: 90%;
}

.dialog button {
  background-color: #fe8317;
  margin: 1.5rem;
  padding: 1rem 3.5rem;
  color: white;
  font-size: 1.6rem;
  border: 0;
  border-radius: 5px;
  outline: none;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
}
</style>
