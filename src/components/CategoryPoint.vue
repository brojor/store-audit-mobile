<template>
  <div
    class="point transformSlow"
    :ref="'touchTarget'"
    @touchstart="touchstart($event)"
    @touchend="touchend()"
    @touchmove="touchmove($event)"
    draggable="true"
  >
    <component class="accepted-icon" :is="statusIcon" />
    <weight-badge :value="categoryPoint.weight" />
    <p class="category-point-name">{{ categoryPoint.name }}</p>
  </div>
</template>

<script>
import RejectedIcon from './icons/rejectedIcon.vue';
import QuestionmarkIcon from './icons/questionmarkIcon.vue';
import AcceptedIcon from './icons/acceptedIcon.vue';
import WeightBadge from './weightBadge.vue';

export default {
  /* eslint-disable operator-linebreak */
  name: 'CategoryPoint',
  props: ['category', 'categoryPoint'],
  data() {
    return {
      posX: {},
      touchTarget: null,
      moveLength: 0,
      lastState: '',
    };
  },
  computed: {
    selectedStoreId() {
      return this.$store.state.selectedStoreId;
    },
    statusIcon() {
      const { id } = this.categoryPoint;
      const { accepted } = this.$store.state.results[id];
      switch (accepted) {
        case true:
          return 'AcceptedIcon';
        case false:
          return 'RejectedIcon';
        default:
          return 'QuestionmarkIcon';
      }
    },
  },
  methods: {
    touchstart(event) {
      this.posX.start = event.touches[0].clientX;
      this.$refs.touchTarget.classList.remove('transformSlow');
    },
    touchmove(event) {
      this.storeMoveLength(event);
      if (Math.abs(this.moveLength) > 25) {
        this.$refs.touchTarget.style.transform = `translate3d(${this.moveLength}px, 0px, 0px)`;
      }
      if (this.thresholdExceeded()) {
        const accepted = this.isAccepted();
        const currentState = this.getCurrentState(accepted);
        if (currentState !== this.lastState) {
          this.lastState = currentState;
          this.writeStatus(this.categoryPoint.id, accepted);
        }
      }
    },
    touchend() {
      this.$refs.touchTarget.style.transform = 'translate3d(0px, 0px, 0px)';
      this.$refs.touchTarget.classList.add('transformSlow');
    },
    storeMoveLength(event) {
      const positionX = event.touches[0].clientX;
      this.moveLength = positionX - this.posX.start;
    },
    thresholdExceeded() {
      const threshold = window.innerWidth / 4;
      return Math.abs(this.moveLength) > threshold;
    },
    async writeStatus(categoryPointId, accepted) {
      console.log('writeStatuuus', accepted);
      let comment;
      if (!accepted) {
        comment = await this.$store.dispatch('addComment');
      }
      this.$store.commit('WRITE_STATUS', {
        accepted,
        categoryPointId,
        comment,
      });
    },
    getCurrentState(accepted) {
      const storeId = this.$store.state.selectedStoreId;
      const pointId = this.categoryPoint.id;
      return `${storeId}${pointId}${accepted}`;
    },
    isAccepted() {
      const swipeDirection = this.moveLength > 0 ? 'right' : 'left';
      return swipeDirection === 'right';
    },
  },
  components: {
    RejectedIcon,
    QuestionmarkIcon,
    AcceptedIcon,
    WeightBadge,
  },
};
</script>

<style lang="css" scoped>
.weight-icon {
  position: absolute;
  top: 3px;
  right: 3px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 1.2rem;
}
.accepted-icon {
  position: absolute;
  top: 3px;
  left: 3px;
}
.point {
  padding: 2rem 4rem;
  font-size: 1.6rem;
  position: relative;
  border-radius: 4px;
  margin: 2px 4px;

  color: black;
  /* color: rgb(51, 51, 51); */
  background-color: #cfcfcf;
  /* border: 2px solid #0087db; */
}
.category-point-name {
  margin-top: 0.75rem;
}
.transformSlow {
  transition: transform 0.25s;
}
.accepted {
  /* color: rgb(56, 129, 56);
  color: #02922b;
  color: #000;
  color: rgb(255, 255, 255);
  background-color: #d0ddc7;
  background-color: #2e7e5f; */
  /* border: 1px solid #5ecf7e; */
}
.rejected {
  /* color: #000;
  color: #fff;
  background-color: #edd4d4;
  background-color: #a10000; */
  /* border: 1px solid #e60001; */
}
</style>
