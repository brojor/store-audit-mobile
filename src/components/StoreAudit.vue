<template>
  <main>
    <h1>Store audit</h1>
    <div
      v-for="(katValue, katKey, katIndex) in table"
      :key="katIndex"
      class="kategory"
    >
      <div
        @click="dropDown(katIndex)"
        class="kategory-title"
        :class="{ active: activeKategory === katIndex }"
      >
        {{ kategories[katKey]
        }}<span class="rt-idx">
          {{ `${calcCurrentScore(katKey)} / ${calcAvailableScore(katKey)}` }}
        </span>
      </div>
      <transition name="roll">
        <div class="points" v-if="activeKategory === katIndex">
          <div
            v-for="(pointValue, pointKey, pointIndex) in katValue"
            :key="pointIndex"
            class="point transformSlow"
            :class="pointValue.status"
            ref="trgt"
            @touchstart="touchstart(pointIndex, $event)"
            @touchend="touchend"
            @touchmove="touchmove(pointValue, katKey, pointKey, $event)"
            draggable="true"
          >
            <p>{{ points[katKey][pointKey] }}</p>
            <!-- <p class="rt-idx">{{ weights[katKey][pointKey] }}</p> -->
          </div>
        </div>
      </transition>
    </div>
    <RootModal></RootModal>
    <div v-if="hiddeAll" class="secret">
      <form @submit.prevent="unhide">
        <input type="text" placeholder="Zadejte heslo" v-model="password" />
      </form>
    </div>
  </main>
</template>

<script>
import RootModal from '@/components/RootModal.vue';
import table from '../../dataStore';
import { kategories, points, weights } from '../../names';
import EventBus from '../eventBus';

export default {
  name: 'StoreAudit',
  components: { RootModal },

  data() {
    return {
      hiddeAll: true,
      password: '',
      modal: false,
      kategories,
      points,
      weights,
      emitet: '',
      table,
      activeKategory: null,
      posX: {},
      touchTarget: null,
      justEdited: {},
    };
  },
  methods: {
    unhide() {
      if (this.password.toLowerCase() === 'únor') {
        this.hiddeAll = false;
      }
    },
    touchstart(index, event) {
      console.log(event);
      this.posX.start = event.touches[0].clientX;
      this.touchTarget = this.$refs.trgt[index];
      this.touchTarget.classList.remove('transformSlow');
    },
    touchend(event) {
      console.log(event);
      this.touchTarget.style.transform = 'translate3d(0px, 0px, 0px)';
      this.touchTarget.classList.add('transformSlow');
    },
    touchmove(pointValue, katKey, pointKey, event) {
      const posXNow = event.touches[0].clientX;
      const move = posXNow - this.posX.start;
      if (Math.abs(move) > 20) {
        this.touchTarget.style.transform = `translate3d(${move}px, 0px, 0px)`;
      }
      if (Math.abs(move) > window.innerWidth / 3) {
        const { status } = pointValue;
        const swipeDirection = move > 0 ? 'right' : 'left';
        if (status !== 'accept' && swipeDirection === 'right') {
          this.swipedRigth(katKey, pointKey);
        }
        if (status !== 'reject' && swipeDirection === 'left') {
          this.swipedLeft(katKey, pointKey);
        }
      }
    },
    dropDown(index) {
      this.activeKategory = this.activeKategory === index ? null : index;
    },
    calcAvailableScore(katKey) {
      return Object.values(weights[katKey]).reduce((acc, val) => acc + val);
    },
    calcCurrentScore(katKey) {
      const keys = Object.keys(weights[katKey]);
      return keys.reduce((acc, pointKey) => {
        if (this.table[katKey][pointKey].status === 'accept') {
          return acc + weights[katKey][pointKey];
        }
        return acc;
      }, 0);
    },
    swipedRigth(kategory, point) {
      this.table[kategory][point].status = 'accept';
    },
    swipedLeft(kategory, point) {
      this.table[kategory][point].status = 'reject';
      // samostatná metoda?
      this.justEdited = { kategory, point };
      setTimeout(() => {
        EventBus.$emit('open');
      }, 500);
    },
  },
  created() {
    EventBus.$on('commentAdded', (comment) => {
      const { kategory, point } = this.justEdited;
      this.table[kategory][point].note = comment;
    });
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
  position: relative;
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
  position: relative;
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
  position: relative;
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
.rt-idx {
  font-size: 1.2rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
/*--component start--*/
.secret {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(8px);
}
.secret input {
  margin-top: 33vh;
  height: 3rem;
  padding: 1rem;
  text-align: center;
}
/*--component end--*/
</style>
