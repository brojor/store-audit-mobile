<template>
  <div
    class="point "
    :class="{ transformSlow: !isDragged }"
    :id="categoryPoint.id"
    :style="style"
    @touchstart="touchstart($event)"
    @touchend="touchend()"
    @touchmove="touchmove($event)"
    draggable="true"
  >
    <component class="icon" :is="statusIcon" />
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
  name: 'CategoryPoint',
  props: ['category', 'categoryPoint'],
  data() {
    return {
      startPosition: 0,
      actualPosition: 0,
      isDragged: false,
      threshold: 25,
      lastState: '',
    };
  },
  computed: {
    moveLength() {
      return this.isDragged ? this.actualPosition - this.startPosition : 0;
    },
    xAxisShift() {
      return Math.abs(this.moveLength) > this.threshold ? this.moveLength : 0;
    },
    style() {
      return { transform: `translate3d(${this.xAxisShift}px, 0px, 0px)` };
    },
    thresholdExceeded() {
      const threshold = window.innerWidth / 4;
      return Math.abs(this.moveLength) > threshold;
    },
    isAccepted() {
      const swipeDirection = this.moveLength > 0 ? 'right' : 'left';
      return swipeDirection === 'right';
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
      this.startPosition = event.touches[0].clientX;
      this.actualPosition = event.touches[0].clientX;
      this.isDragged = true;
    },
    touchmove(event) {
      this.actualPosition = event.touches[0].clientX;
    },
    touchend() {
      this.isDragged = false;
    },
    async writeStatus(categoryPointId, accepted) {
      let comment;
      if (!accepted) {
        comment = await this.$store.dispatch('addProblemDescription');
      }
      this.$store.commit('WRITE_STATUS', {
        accepted,
        categoryPointId,
        comment,
      });
    },
    getEventTrigger(accepted) {
      const storeId = this.$store.state.selectedStoreId;
      const pointId = this.categoryPoint.id;
      return `${storeId}${pointId}${accepted}`;
    },
  },
  watch: {
    moveLength() {
      if (this.thresholdExceeded) {
        const accepted = this.isAccepted;
        const eventTrigger = this.getEventTrigger(accepted);
        if (eventTrigger !== this.lastTrigger) {
          this.lastTrigger = eventTrigger;
          this.writeStatus(this.categoryPoint.id, accepted);
        }
      }
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
  font-size: 1.2rem;
}
.icon {
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
  background-color: #cfcfcf;
}
.category-point-name {
  margin-top: 0.75rem;
}
.transformSlow {
  transition: transform 0.25s;
}
</style>
