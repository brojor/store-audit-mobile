<template>
  <div
    class="point transformSlow"
    :class="{
      accepted: categoryPoint.accepted === true,
      rejected: categoryPoint.accepted === false,
    }"
    :ref="'touchTarget'"
    @touchstart="touchstart(categoryPoint.id, $event)"
    @touchend="touchend()"
    @touchmove="touchmove($event, category, categoryPoint)"
    draggable="true"
  >
    <p>{{ categoryPoint.name }}</p>
    <p class="rt-idx">{{ categoryPoint.weight }} b.</p>
  </div>
</template>

<script>
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
  },
  methods: {
    touchstart(index, event) {
      this.posX.start = event.touches[0].clientX;
      this.$refs.touchTarget.classList.remove('transformSlow');
    },
    touchmove(event, _, categoryPoint) {
      this.storeMoveLength(event);
      if (Math.abs(this.moveLength) > 25) {
        this.$refs.touchTarget.style.transform = `translate3d(${this.moveLength}px, 0px, 0px)`;
      }
      if (this.thresholdExceeded()) {
        const accepted = this.isAccepted();
        const currentState = this.getCurrentState(accepted);
        if (currentState !== this.lastState) {
          this.lastState = currentState;
          this.writeStatus(categoryPoint.newId, accepted);
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
      const pointId = this.categoryPoint.newId;
      return `${storeId}${pointId}${accepted}`;
    },
    isAccepted() {
      const swipeDirection = this.moveLength > 0 ? 'right' : 'left';
      return swipeDirection === 'right';
    },
  },
};
</script>

<style lang="css" scoped>
.point {
  padding: 2.5rem 1.5rem;
  font-size: 1.6rem;
  position: relative;
  border-radius: 4px;
  margin: 2px 4px;
  color: black;
  background-color: #dfdfdf;
  border: 1px solid rgb(105, 105, 105);
}
.transformSlow {
  transition: transform 0.25s;
}
.accepted {
  color: rgb(56, 129, 56);
  color: #00992b;
  color: #000;
  background-color: #d0ddc7;
  border: 1px solid #5ecf7e;
}
.rejected {
  color: #000;
  background-color: #edd4d4;
  border: 1px solid #e60001;
}
</style>
