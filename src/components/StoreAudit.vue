<template>
  <main>
    <h1>store audit</h1>
    <div v-for="(kategory, index) in table" :key="index" class="kategory">
      <div>{{ kategory.name }}</div>
      <div class="points" v-if="activeKategory === index">
        <div
          class="point"
          v-for="(point, i) in kategory.points"
          :key="i"
          :point="point"
        >
          {{ point.name }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import CategoryPoint from '@/components/CategoryPoint.vue';
import table from '../../data';

export default {
  name: 'StoreAudit',
  // components: { CategoryPoint },

  data() {
    return {
      table,
      activeKategory: null,
    };
  },
};
</script>

<style lang="css" scoped>
.kategory {
  width: 100vw;
  border-bottom: 1px solid black;
  background-color: yellow;
  padding: 1rem 0;
}
.point {
  border-bottom: 1px solid black;
  padding: 0.5rem;
  background-color: gray;
}
</style>
