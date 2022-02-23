<template>
  <section class="categories-container">
    <category-point
      v-for="categoryPoint in categoryPoints"
      :key="categoryPoint.id"
      :categoryPoint="categoryPoint"
      :category="$route.params.id"
    />
    <div class="spacer"></div>
  </section>
</template>

<script>
import CategoryPoint from './CategoryPoint.vue';

export default {
  props: ['categoryPoints'],
  components: { CategoryPoint },
};
</script>

<style>
.categories-container {
  margin-top: 14rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  background-color: rgb(22, 45, 63);
}
.spacer {
  height: 8rem;
}
</style>
