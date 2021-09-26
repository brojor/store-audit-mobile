<template>
  <select name="selectedStore" id="selectedStore" v-model="selectedStore">
    <option v-for="store in listOfStores" :key="store.id" :value="store.id">
      {{ store.name }}
    </option>
  </select>
</template>
<script>
export default {
  computed: {
    selectedStore() {
      return this.$store.state.auth.stores[0].id || null;
    },
    listOfStores() {
      return this.$store.state.auth.stores;
    },
  },
};
</script>

<style scoped>
select {
  outline: none;
  width: 100%;
  height: 4rem;
  border: none;
  border-radius: 4px;
  text-align-last: center;
  margin-bottom: 1rem;
}
</style>
