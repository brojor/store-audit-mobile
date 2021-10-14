<template>
  <div class="category-view">
    <h1>
      {{ getCategoryName($route.params.id) }}
    </h1>
    <div class="categories">
      <CategoryPoint
        v-for="categoryPoint in categoryPoints($route.params.id)"
        :key="categoryPoint.id"
        :categoryPoint="categoryPoint"
        :category="$route.params.id"
      />
    </div>
    <div class="navigation">
      <button @click="prev" :disabled="$route.params.id == 1">Předchozí</button
      ><button @click="menu">Kategorie</button
      ><button @click="next" :disabled="$route.params.id == numOfCategories">Další</button>
    </div>
  </div>
</template>

<script>
import CategoryPoint from '@/components/CategoryPoint.vue';

export default {
  components: { CategoryPoint },
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
h1 {
  font-size: 30px;
  color: black;
  background-color: #fff;
}
p {
  font-size: 1.5rem;
  color: #000;
  background-color: #fff;
}
button {
  padding: 1rem;
  margin: 0.5rem;
}
.navigation {
  background-color: rgb(202, 235, 164);
  display: flex;
  justify-content: space-around;
}
.category-view {
  display: flex;
  flex-direction: column;
  height: 94%;
  border: 2px solid rgb(0, 255, 13);
}
.categories {
  flex-grow: 1;
  overflow: scroll;
  border: 2∆px solid rgb(255, 166, 0);
}
</style>
