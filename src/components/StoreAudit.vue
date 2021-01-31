<template>
  <main>
    <h1>Store audit</h1>
    <div
      v-for="(kategory, key, katIndex) in table"
      :key="katIndex"
      class="kategory"
    >
      <div
        @click="method1(katIndex)"
        class="kategory-title"
        :class="{ active: activeKategory === katIndex }"
      >
        {{ kategories[key] }}
      </div>
      <div class="points" v-if="activeKategory === katIndex">
        <div
          v-for="(value2, key2, index2) in kategory"
          :key="index2"
          class="point transformSlow"
          :class="value2.status"
          ref="trgt"
          @touchstart="touchstart(index2, $event)"
          @touchend="touchend(index2, $event)"
          @touchmove="touchmove(value2, key, key2, index2, $event)"
          draggable="true"
        >
          <p>{{ points[key][key2] }}</p>
          <!-- <p>{{ value2.status }}</p> -->
        </div>
      </div>

      <transition name="roll">
        <!-- <div class="points" v-if="activeKategory === katIndex"> -->
        <!--         <div
          class="point transformSlow"
          :class="point.status"
          ref="trgt"
          @touchstart="touchstart(pointIndex, $event)"
          @touchend="touchend(pointIndex, $event)"
          @touchmove="touchmove(katIndex, pointIndex, $event)"
          draggable="true"
          v-for="(point, pointIndex) in kategory"
          :key="pointIndex"
          :point="point"
        >
          {{ point }}
        </div> -->
        <!-- </div> -->
      </transition>
    </div>
  </main>
</template>

<script>
// import CategoryPoint from '@/components/CategoryPoint.vue';
// import table from '../../data';
// import dataStore from '../../dataStore';
import table from '../../dataStore';
import { kategories, points } from '../../names';

export default {
  name: 'StoreAudit',
  // components: { CategoryPoint },

  data() {
    return {
      kategories,
      points,
      emitet: '',
      table,
      // dataStore,
      activeKategory: null,
      x: {},
      touchTarget: null,
      // kategoryTitles: {
      //   kat0: 'Před prodejnou, vstup do prodejny',
      //   kat1: 'V prodejně',
      //   kat2: 'Sklad, zázemí, kancelář',
      //   kat3: 'Layout, POS a MKT označení',
      //   kat4: 'Prezentace',
      //   kat5: 'Provoz',
      //   kat6: 'Stav zásob, "díry"',
      //   kat7: 'Doplněnost',
      //   kat8: 'Ceny, označení zboží',
      //   kat9: 'Expirace',
      //   kat10: 'Personál',
      // },
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

      // console.log(this.x.start - this.x.end);
      this.$refs.trgt[index].style.transform = 'translate3d(0px, 0px, 0px)';
      this.touchTarget.classList.add('transformSlow');
    },
    touchmove(value2, key, key2, index2, event) {
      // console.log({ katIndex }, { pointIndex }, { event });
      const target = this.$refs.trgt[index2];
      // console.log({ target });
      const xNow = event.touches[0].clientX;
      const move = xNow - this.x.start;
      // console.log(move);
      if (Math.abs(move) > 15) {
        target.style.transform = `translate3d(${move}px, 0px, 0px)`;
      }
      if (Math.abs(move) > 360 / 3) {
        // const { status } = this.dataStore[`kat${katIndex}`][`p${pointIndex}`];
        const { status } = value2;
        const swipeDirection = move > 0 ? 'right' : 'left';
        if (status !== 'accept' && swipeDirection === 'right') {
          // this.swipedRigth(katIndex, pointIndex);
          this.table[key][key2].status = 'accept';
        }
        if (status !== 'reject' && swipeDirection === 'left') {
          // this.swipedLeft(katIndex, pointIndex);
          this.table[key][key2].status = 'reject';
        }
      }
    },
    method1(index) {
      this.activeKategory = this.activeKategory === index ? null : index;
    },
    // calcTotalValue(points) {
    //   return points.reduce((acc, val) => acc + val.value, 0);
    // },
    swipedRigth(katIndex, pointIndex) {
      console.log(katIndex, pointIndex);
      // const target = this.$refs.trgt[pointIndex];
      // target.style.backgroundColor = '#3DDC97';
      // target.style.color = 'white';

      // END nebude nutne - bude se řešit formátováním podle true/false v dataStoru

      this.dataStore[`kat${katIndex}`][`p${pointIndex}`] = 'accept';
    },
    swipedLeft(katIndex, pointIndex) {
      this.dataStore[`kat${katIndex}`][`p${pointIndex}`] = 'reject';
      // const target = this.$refs.trgt[pointIndex];
      // target.style.backgroundColor = '#f0544f';
      // target.style.color = 'white';
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
.accept {
  background-color: #3ddc97;
  color: white;
}
.reject {
  background-color: #f0544f;
  color: white;
}
</style>
