<template>
  <div class="kategory">
    <div
      @click="goToCategory(category.id)"
      class="kategory-title"
      :class="{ active: activeKategory === category.id }"
    >
      {{ category.name }}
      <span class="rt-idx">
        {{ `${$store.getters.achievedScoreInCategory(category.id).toFixed()}%` }}
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
  computed: {
    results() {
      return this.$store.getters.results;
    },
    categories() {
      return this.$store.state.categories;
    },
    activeKategory: {
      get() {
        return this.$store.state.activeCategory;
      },
      set(categoryId) {
        this.$store.commit('SET_ACTIVE_CATEGORY', categoryId);
      },
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
.kategory {
  width: 100%;
  /* border: 2px solid black; */
  border-radius: 4px;
  margin: 4px 0;
  background-color: #eee;
  overflow: hidden;
}
.kategory-title {
  /* background-color: #564d51; */
  background-color: #262d2d;
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
