<template>
  <div>
    <textarea v-model="message" placeholder="Zde stručně popište problém.." rows="8"></textarea>
    <button @click="handleSubmit">Uložit</button>
  </div>
</template>

<script>
export default {
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

<style>
textarea {
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  /*margin: 1rem;*/
  width: 90%;
}

.dialog button {
  /* background-color: #fe8317; */
  background-color: #e60001;
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
