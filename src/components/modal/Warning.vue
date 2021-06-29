<template>
  <div>
    <p>{{ modal.message }}</p>
    <button @click="$store.commit('CLOSE_MODAL')" >ok</button>
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
p {
  font-size: 1.6rem;
}
</style>
