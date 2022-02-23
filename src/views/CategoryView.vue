<template>
  <div class="category-view">
    <category-header :categoryName="category.name" :score="score" />
    <categories-container :categoryPoints="category.categoryPoints" />
    <navigation-bar />
  </div>
</template>

<script>
import CategoriesContainer from '../components/CategoriesContainer.vue';
import CategoryHeader from '../components/CategoryHeader.vue';
import NavigationBar from '../components/NavigationBar.vue';

export default {
  components: {
    NavigationBar,
    CategoriesContainer,
    CategoryHeader,
  },

  computed: {
    category() {
      const categoryId = Number(this.$route.params.id);
      return this.$store.state.categories.find(({ id }) => id === categoryId);
    },
    score() {
      const categoryId = Number(this.$route.params.id);
      return this.$store.getters.score(categoryId);
    },
  },
  created() {
    this.$store.commit('SET_RESULTS');
  },
};
</script>

<style scoped>
.category-view {
  display: flex;
  flex-direction: column;
}
</style>
