<template>
  <div class="unfilled-points">
    <div v-for="(abcde, index) in unfilledPoints" :key="index">
      <h1>{{ abcde.categoryName }}</h1>
      <ul>
        <li v-for="(categoryPoint, index) in abcde.unfilledPoints" :key="index">
          {{ categoryPoint }}
        </li>
      </ul>
    </div>
    <button @click="submit">Beru na vědomí</button>
  </div>
</template>

<script>
export default {
  computed: {
    unfilledPoints() {
      return this.$store.state.unfilledPoints;
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
}
h1 {
  /* margin-top: 2rem; */
  font-size: 1.6rem;
}
ul {
  padding-left: 3rem;
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
