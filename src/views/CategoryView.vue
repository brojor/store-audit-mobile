<template>
  <div class="category-view">
    <div class="fixed">
      <div class="category-name">
        <h1>{{ category.name }}</h1>
      </div>
      <div class="status-bar">
        <span>Max. score : {{ score.available }}</span>
        <span>Dosažené score: {{ score.achieved }}</span>
        <span>Splněno na {{ score.perc.toFixed(0) }}%</span>
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
    <div class="navigation">
      <button @click="prev" :disabled="$route.params.id == 1"><ArrowLeft /></button>
      <button class="home" @click="menu"><home-icon /></button
      ><button @click="next" :disabled="$route.params.id == numOfCategories">
        <arrow-right />
      </button>
    </div>
  </div>
</template>

<script>
import CategoryPoint from '../components/CategoryPoint.vue';
import HomeIcon from '../components/icons/HomeIcon.vue';
import ArrowLeft from '../components/icons/ArrowLeft.vue';
import ArrowRight from '../components/icons/ArrowRight.vue';

export default {
  components: {
    CategoryPoint,
    HomeIcon,
    ArrowLeft,
    ArrowRight,
  },
  methods: {
    prev() {
      const currentCategory = Number(this.$route.params.id);
      const prevCategory = currentCategory - 1;
      this.$router.push(`/category/${prevCategory}`);
    },
    menu() {
      this.$router.push('/');
    },
    next() {
      const currentCategory = Number(this.$route.params.id);
      const nextCategory = currentCategory + 1;
      this.$router.push(`/category/${nextCategory}`);
    },
  },
  computed: {
    category() {
      const categoryId = this.$route.params.id;
      return this.$store.state.categories.find(({ id }) => id === Number(categoryId));
    },
    numOfCategories() {
      return Object.keys(this.$store.state.categories).length;
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
  z-index: 20;
  background-color: #011414;
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
button {
  padding: 1rem;
  /* margin: 0.5rem; */
  outline: none;
  border: none;
  /* margin-bottom: -1rem; */
  color: #fff;
  background-color: transparent;
}
button:disabled {
  color: rgb(105, 105, 105);
}
button.home {
  padding: 0.5rem;
}
.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #001514;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.spacer {
  height: 8rem;
  /* background-color: yellow; */
}
</style>
