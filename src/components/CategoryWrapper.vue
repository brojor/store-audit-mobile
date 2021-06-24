<template>
  <div class="kategory">
    <div
      @click="dropDown(category.id)"
      class="kategory-title"
      :class="{ active: activeKategory === category.id }"
    >
      {{ category.name }}
      <span class="rt-idx">
        {{
          `${((calcCurrentScore(category.id) / calcAvailableScore(category.id)) * 100).toFixed()}%`
        }}
      </span>
    </div>
    <transition name="roll">
      <div class="points" v-if="activeKategory === category.id">
        <CategoryPoint
          v-for="categoryPoint in category.categoryPoints"
          :key="categoryPoint.id"
          :categoryPoint="categoryPoint"
          :category="category"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import CategoryPoint from '@/components/CategoryPoint.vue';

export default {
  name: 'CategoryWrapper',
  components: { CategoryPoint },
  props: ['category'],
  data() {
    return {
      activeKategory: null,
    };
  },
  computed: {
    results() {
      return this.$store.getters.results;
    },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    // předělat na vuex Getter
    calcAvailableScore(categoryId) {
      const [currentCategory] = this.categories.filter((category) => category.id === categoryId);
      return currentCategory.categoryPoints.reduce(
        (acc, categoryPoint) => acc + categoryPoint.weight,
        0,
      );
    },
    // předělat na vuex Getter
    calcCurrentScore(categoryId) {
      const resultItems = this.results.filter((point) => point.kategory === categoryId);
      return resultItems.reduce((acc, point) => {
        if (point.accepted) {
          const currentCategory = this.categories.find(
            (category) => category.id === point.kategory,
          );
          const { weight } = currentCategory.categoryPoints.find(
            (categoryPoint) => categoryPoint.id === point.kategoryPoint,
          );
          return acc + weight;
        }
        return acc;
      }, 0);
    },
    dropDown(index) {
      this.activeKategory = this.activeKategory === index ? null : index;
    },
  },
};
</script>

<style>
.kategory {
  width: 100%;
  border: 2px solid black;
  margin: 4px 0;
  background-color: #eee;
  overflow: hidden;
}
.kategory-title {
  background-color: #564d51;
  color: white;
  padding: 1.5rem 0;
  font-size: 1.8rem;
  transition: background-color 0.5s;
  position: relative;
}
.rt-idx {
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
