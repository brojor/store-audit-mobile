<template>
  <div
    class="point "
    :class="{
      transformSlow: !isDragged,
      accepted: animation.accepted,
      rejected: animation.rejected,
    }"
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
      threshold: {
        moveStart: 25,
        actionStart: window.innerWidth / 4,
      },
      animation: {
        accepted: false,
        rejected: false,
      },
    };
  },
  computed: {
    move() {
      const length = this.isDragged ? this.actualPosition - this.startPosition : 0;
      const enoughToMove = Math.abs(length) > this.threshold.moveStart;
      const enoughToAction = Math.abs(length) > this.threshold.actionStart;
      const enoughToStop = Math.abs(length) > this.threshold.actionStart * 1.2;
      return {
        length,
        enoughToMove,
        enoughToAction,
        enoughToStop,
      };
    },
    xAxisShift() {
      if (this.move.enoughToMove) {
        let shiftX;
        if (!this.move.enoughToStop) {
          shiftX = this.move.length;
        }
        return shiftX;
      }
      return 0;
    },
    style() {
      return { transform: `translate3d(${this.xAxisShift}px, 0px, 0px)` };
    },
    isAccepted() {
      return this.move.length > 0;
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
    startAnimation() {
      const stateNow = this.isAccepted ? 'accepted' : 'rejected';
      this.animation[stateNow] = true;
      setInterval(() => {
        this.animation[stateNow] = false;
      }, 1000);
    },
  },
  watch: {
    move: {
      handler() {
        if (this.move.enoughToAction) {
          const accepted = this.isAccepted;
          const isAlreadyAccepted = this.$store.state.results[this.categoryPoint.id].accepted;
          if (isAlreadyAccepted !== accepted) {
            this.startAnimation();
            setTimeout(() => {
              this.writeStatus(this.categoryPoint.id, accepted);
            }, 100);
          }
        }
      },
      deep: true,
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
.accepted {
  animation: accepted 1s;
}
@keyframes accepted {
  from {
    background-color: rgb(39, 177, 97);
  }
  to {
    background-color: #cfcfcf;
  }
}
.rejected {
  animation: rejected 1s;
}
@keyframes rejected {
  from {
    background-color: #cfcfcf;
  }
  10% {
    background-color: rgb(228, 19, 19);
  }
  to {
    background-color: #cfcfcf;
  }
}

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
