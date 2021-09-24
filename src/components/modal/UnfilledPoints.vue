<template>
  <div class="unfilled-points">
    <div v-for="(category, categoryIndex) in listOfUnfilledItems" :key="categoryIndex">
      <h1>{{ category.name }}</h1>
      <ul>
        <li
          v-for="(categoryPoint, categoryPointIndex) in category.unfilledPoints"
          :key="categoryPointIndex"
        >
          {{ categoryPoint }}
        </li>
      </ul>
    </div>
    <button @click="submit" class="btn btn-small">Beru na vědomí</button>
  </div>
</template>

<script>
export default {
  computed: {
    listOfUnfilledItems() {
      return this.$store.getters.listOfUnfilledItems;
    },
  },
  methods: {
    submit() {
      this.$store.commit('CLOSE_MODAL');
    },
  },
};
</script>

<style scoped>
.unfilled-points {
  overflow: scroll;
  max-height: 75vh;
  padding-bottom: 2rem;
}
h1 {
  font-size: 1.6rem;
}
ul {
  padding-left: 2rem;
  display: list-item;
  margin-bottom: 2rem;
}
li {
  margin-top: 0.5rem;
  font-size: 1.4rem;
  text-align: left;
  display: list-item;
}

</style>
