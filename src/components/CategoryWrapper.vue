<template>
  <div class="category">
    <div @click="goToCategory(category.id)" class="category-title">
      {{ category.name }}
      <span class="score-perc"> {{ score.toFixed() }}% </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryWrapper',
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

<style>
.category {
  width: 100%;
  /* border: 2px solid black; */
  border-radius: 4px;
  margin: 4px 0;
  background-color: #eee;
  overflow: hidden;
}
.category-title {
  /* background-color: #564d51; */
  /* background-color: #262d2d; */
  background-color: #0b555a;
  background-color: #086199;
  color: white;
  padding: 1.5rem 0;
  font-size: 1.8rem;
  transition: background-color 0.5s;
  position: relative;
}
.score-perc {
  font-size: 1.1rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.points {
  background-color: #eee;
}
.roll-enter-active,
.roll-leave-active {
  transition: all 0.5s cubic-bezier(0.37, 0, 0.63, 1);
  max-height: 2000px;
}

.roll-enter,
.roll-leave-to {
  max-height: 0px;
}
</style>
