<template>
  <main>
    <h1>Store audit</h1>
    <div v-for="(kategory, index) in table" :key="index" class="kategory">
      <div @click="method1(index)" class="kategory-title">
        {{ kategory.name }}
      </div>
      <div class="points" v-if="activeKategory === index">
        <div
          ref="trgt"
          @touchstart="touchstart(i, $event)"
          @touchend="touchend(i, $event)"
          @touchmove="touchmove(i, $event)"
          draggable="true"
          class="point transformSlow"
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
      touchTarget: null,
    };
  },
  methods: {
    touchstart(index, event) {
      this.x.start = event.touches[0].clientX;
      this.touchTarget = this.$refs.trgt[index];
      this.touchTarget.classList.remove('transformSlow');
    },
    touchend(index, event) {
      this.x.end = event.changedTouches[0].clientX;

      console.log(this.x.start - this.x.end);
      this.$refs.trgt[index].style.transform = 'translate3d(0px, 0px, 0px)';
      this.touchTarget.classList.add('transformSlow');
    },
    touchmove(index, event) {
      const target = this.$refs.trgt[index];
      const xNow = event.touches[0].clientX;
      const move = xNow - this.x.start;
      console.log(move);

      target.style.transform = `translate3d(${move}px, 0px, 0px)`;
      if (move > 360 / 3) {
        this.$refs.trgt[index].style.backgroundColor = 'green';
      }
      if (move < -360 / 3) {
        target.style.backgroundColor = 'red';
      }
    },
    method1(index) {
      this.activeKategory = this.activeKategory === index ? null : index;
    },
  },
};
</script>

<style lang="css" scoped>
main {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.kategory {
  width: 100%;
  /*border: 1px dashed green;*/
  background-color: yellow;
}
.kategory-title {
  background-color: yellow;
  padding: 1.5rem 0;
  /*border-bottom: 1px solid red;*/
  border-bottom: 1px solid black;
  font-size: 1.8rem;
  font-weight: bold;
}
.point {
  border-bottom: 1px solid black;
  padding: 2.5rem 1.5rem;
  background-color: gray;
  font-size: 1.6rem;
}
.transformSlow {
  transition: transform 0.25s;
}
</style>
