<template>
  <div class="unfilled-points">
    <div
      v-for="(category, i) in listOfUnfilledItems"
      :key="`Unfilled ${i + 1}`"
      class="unfilled-category"
      @click="handleClick(category.id)"
    >
      <h1>{{ category.name }} ({{ category.count }})</h1>
    </div>
    <button @click="submit" class="btn btn-w100">Zavřít</button>
  </div>
</template>

<script>
export default {
  name: 'unfilled-points',
  computed: {
    listOfUnfilledItems() {
      return this.$store.getters.listOfUnfilledItems;
    },
  },
  methods: {
    submit() {
      this.$store.commit('CLOSE_MODAL');
    },
    handleClick(categoryId) {
      this.$router.push(`category/${categoryId}`);
      this.$store.commit('CLOSE_MODAL');
    },
  },
};
</script>

<style scoped>
.unfilled-points {
  overflow: scroll;
  max-height: 75vh;
  /* padding-bottom: 2rem; */
}
h1 {
  font-size: 1.4rem;
  font-weight: normal;
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
.unfilled-category {
  background-color: #7d8e99;
  border: 1px solid #5f6468;
  color: #fff;

  border-radius: 4px;
  margin: 4px 0;
  padding: 1.5rem;
  /* min-height: 5rem; */
}

.btn-w100 {
  width: 100%;
  padding: 1.5rem;
  margin: 1rem 0;
}
</style>
