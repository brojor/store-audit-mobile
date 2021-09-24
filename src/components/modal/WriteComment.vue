<template>
  <div class="wrapper">
    <textarea v-model="message" placeholder="Zde stručně popište problém.." rows="8"></textarea>
    <button class="btn btn-small" @click="handleSubmit">Uložit</button>
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

<style scoped>
textarea {
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  /*margin: 1rem;*/
  width: 90%;
  margin: 1rem 0;
}
</style>
