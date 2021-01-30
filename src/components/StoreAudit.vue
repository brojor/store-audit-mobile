<template>
  <main>
    <h1>Store audit</h1>
    <div v-for="(kategory, index) in table" :key="index" class="kategory">
      <div
        @click="method1(index)"
        class="kategory-title"
        :class="{ active: activeKategory === index }"
      >
        {{ kategory.name }}
      </div>
      <transition name="roll">
        <div class="points" v-if="activeKategory === index">
          <div
            class="point transformSlow"
            ref="trgt"
            @touchstart="touchstart(i, $event)"
            @touchend="touchend(i, $event)"
            @touchmove="touchmove(i, $event)"
            draggable="true"
            v-for="(point, i) in kategory.points"
            :key="i"
            :point="point"
          >
            {{ point.name }}
          </div>
        </div>
      </transition>
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
      // console.log(move);
      if (Math.abs(move) > 15) {
        target.style.transform = `translate3d(${move}px, 0px, 0px)`;
      }
      if (move > 360 / 3) {
        this.$refs.trgt[index].style.backgroundColor = '#3DDC97';
        this.$refs.trgt[index].style.color = 'white';
      }
      if (move < -360 / 3) {
        target.style.backgroundColor = '#f0544f';
        this.$refs.trgt[index].style.color = 'white';
      }
    },
    method1(index) {
      this.activeKategory = this.activeKategory === index ? null : index;
    },
  },
};
</script>

<style lang="css" scoped>
.roll-enter-active,
.roll-leave-active {
  transition: all 0.5s cubic-bezier(0.37, 0, 0.63, 1);
  max-height: 2000px;
}

.roll-enter,
.roll-leave-to {
  max-height: 0px;
}

main {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  padding: 0.5rem;
}
h1 {
  font-size: 3rem;
  margin: 2rem;
  text-transform: uppercase;
}

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
}
.active {
  background-color: #201d1e;
}
.points {
  background-color: #eee;
}
.point {
  border-top: 1px solid black;
  padding: 2.5rem 1.5rem;
  background-color: #ffdec2;
  font-size: 1.6rem;
}
.transformSlow {
  transition: transform 0.25s;
}
</style>
