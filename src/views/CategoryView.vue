<template>
  <div class="category-view">
    <div class="fixed">
      <div class="category-name">
        <h1>{{ category.name }}</h1>
      </div>
      <div class="status-bar">
        <span id="available-score">Max. score : {{ score.available }}</span>
        <span id="achieved-score">Dosažené score: {{ score.achieved }}</span>
        <span id="perc-fulfillment">Splněno na {{ score.perc.toFixed(0) }}%</span>
      </div>
    </div>
    <div class="categories">
      <CategoryPoint
        v-for="categoryPoint in categoryPoints"
        :key="categoryPoint.id"
        :categoryPoint="categoryPoint"
        :category="$route.params.id"
      />
      <div class="spacer"></div>
    </div>
    <navigation-bar />
  </div>
</template>

<script>
import CategoryPoint from '../components/CategoryPoint.vue';
import NavigationBar from '../components/NavigationBar.vue';

export default {
  components: {
    CategoryPoint,
    NavigationBar,
  },

  computed: {
    category() {
      const categoryId = this.$route.params.id;
      return this.$store.state.categories.find(({ id }) => id === Number(categoryId));
    },
    categoryPoints() {
      const { categoryPoints } = this.category;
      return categoryPoints;
    },
    score() {
      const categoryId = Number(this.$route.params.id);
      console.log({ categoryId });
      return this.$store.getters.score(categoryId);
    },
  },
  created() {
    this.$store.commit('SET_RESULTS');
  },
};
</script>

<style scoped>
.fixed {
  margin-top: 6rem;
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: #010b14;
}
.status-bar {
  color: #fff;
  /* color: #bfe7ff; */
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 4px;
  font-size: 1.1rem;
}
.category-view {
  display: flex;
  flex-direction: column;
  /* background-color: rgb(90, 90, 90); */
  /* display: flex;
  flex-direction: column; */
  /* height: 94%; */
}
.categories {
  margin-top: 14rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  background-color: rgb(22, 45, 63);
  /* flex-grow: 1; */
  /* overflow: scroll; */
}
.category-name {
  background-color: #262d2d;
  background-color: #0b555a;
  background-color: #02b5c2;
  background-color: #1796e6;
  background-color: #086199;
  border-radius: 4px;
  margin: 4px;
  padding: 1.25rem 1rem;
  /* border: 2px solid grey; */
}

h1 {
  font-size: 2rem;
  color: white;
  font-weight: normal;
}
p {
  font-size: 1.5rem;
  color: #000;
  background-color: #fff;
}

.spacer {
  height: 8rem;
  /* background-color: yellow; */
}
</style>
