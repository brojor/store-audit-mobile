<template>
  <div class="category-view">
    <div class="category-name">
      <h1>
        {{ getCategoryName($route.params.id) }}
      </h1>
    </div>
    <div class="categories">
      <CategoryPoint
        v-for="categoryPoint in categoryPoints($route.params.id)"
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
import CategoryPoint from '@/components/CategoryPoint.vue';
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
    getCategoryName(categoryId) {
      return this.$store.state.seed.names.categories[categoryId];
    },
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
    numOfCategories() {
      return this.$store.getters.results2d.length;
    },
    categoryPoints() {
      return (categoryId) => {
        const currentCategory = this.$store.getters.results2d.find(
          (category) => category.id === Number(categoryId),
        );
        return currentCategory.categoryPoints;
      };
    },
  },
};
</script>

<style scoped>
.category-view {
  margin-top: 7rem;
  height: 100%;
  /* background-color: rgb(90, 90, 90); */
  /* display: flex;
  flex-direction: column; */
  /* height: 94%; */
}
.categories {
  display: flex;
  flex-direction: column;

  /* overflow: hidden; */
  /* flex-grow: 1; */
  overflow-x: scroll;
}
.category-name {
  background-color: #262d2d;
  border-radius: 4px;
  margin: 4px;
  padding: 2rem 1rem;
  border: 2px solid grey;
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
