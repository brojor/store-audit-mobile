<template>
  <section class="categories-container">
    <category-point
      v-for="categoryPoint in categoryPoints"
      :key="categoryPoint.id"
      :categoryPoint="categoryPoint"
      :category="$route.params.id"
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
  overflow-x: scroll;
  /* background-color: rgb(22, 45, 63); */
}
</style>
