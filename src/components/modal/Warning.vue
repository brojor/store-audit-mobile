<template>
  <div>
    <p class="modal-message">{{ modal.message }}</p>
    <button @click="$store.commit('CLOSE_MODAL')" class="btn btn-small">ok</button>
  </div>
</template>

<script>
export default {
  computed: {
    modal() {
      return this.$store.state.modal;
    },
  },
};
</script>

<style scoped>
.modal-message {
  font-size: 1.6rem;
  padding: 4rem 1rem;
}
</style>
