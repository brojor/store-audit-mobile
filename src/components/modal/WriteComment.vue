<template>
  <div class="wrapper">
    <textarea v-model="message" placeholder="Zde stručně popište problém.." rows="8"></textarea>
    <button id="submitModalBtn" class="btn btn-small" @click="handleSubmit">Uložit</button>
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
      this.$store.state.modal.addProblemDescription(this.message);
      this.message = '';
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
