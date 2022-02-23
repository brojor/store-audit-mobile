<template>
  <div class="category" :id="`category-${category.id}`" @click="goToCategory(category.id)">
    <h2 class="category-name">{{ category.name }}</h2>
    <span class="score-perc"> {{ score.toFixed() }}% </span>
  </div>
</template>

<script>
export default {
  name: 'AuditCategory',
  props: ['category'],
  computed: {
    score() {
      return this.$store.getters.score(this.category.id).perc;
    },
  },
  methods: {
    goToCategory(categoryId) {
      this.$router.push(`category/${categoryId}`);
    },
  },
};
</script>

<style scoped>
.category {
  width: 100%;
  margin: 2px 0;
  position: relative;
  color: #fff;
  background-color: #086199;
  border-radius: 4px;
}
.category-name {
  padding: 1.5rem 0;
  font-size: 1.8rem;
  font-weight: normal;
  position: relative;
}
.score-perc {
  font-size: 1.1rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
