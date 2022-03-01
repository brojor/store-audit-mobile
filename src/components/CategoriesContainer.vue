<template>
  <section class="categories-container">
    <category-point
      v-for="categoryPoint in categoryPoints"
      :key="categoryPoint.id"
      :categoryPoint="categoryPoint"
    />
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
</style>
