<template>
  <main>
    <h1>store audit</h1>
    <div v-for="(kategory, index) in table" :key="index" class="kategory">
      <div @click="method1(index)">{{ kategory.name }}</div>
      <div class="points" v-if="activeKategory === index">
        <div
          ref="trgt"
          @touchstart="touchstart"
          @touchend="touchend(i, $event)"
          @touchmove="touchmove(i, $event)"
          draggable="true"
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
      x: {},
    };
  },
  methods: {
    touchstart(event) {
      this.x.start = event.touches[0].clientX;
    },
    touchend(index, event) {
      this.x.end = event.changedTouches[0].clientX;

      console.log(this.x.start - this.x.end);
      this.$refs.trgt[index].style.transform = 'translate3d(0px, 0px, 0px)';
    },
    touchmove(index, event) {
      const xNow = event.touches[0].clientX;
      const move = xNow - this.x.start;
      console.log(move);

      this.$refs.trgt[
        index
      ].style.transform = `translate3d(${move}px, 0px, 0px)`;
      if (move > 360 / 3) {
        this.$refs.trgt[index].style.backgroundColor = 'green';
      }
      if (move < -360 / 3) {
        this.$refs.trgt[index].style.backgroundColor = 'red';
      }
    },
    method1(index) {
      this.activeKategory = index;
    },
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
