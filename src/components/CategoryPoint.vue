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
      lastState: { accepted: null, storeId: null },
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
        const swipeDirection = this.moveLength > 0 ? 'right' : 'left';
        const accepted = swipeDirection === 'right';

        if (
          (swipeDirection === 'right' && this.lastState.accepted !== true) ||
          (swipeDirection === 'left' && this.lastState.accepted !== false) ||
          this.lastState.storeId !== this.selectedStoreId
        ) {
          this.lastState.accepted = accepted;
          this.lastState.storeId = this.selectedStoreId;
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
  },
};
</script>

<style lang="css" scoped>
.point {
  border-top: 1px solid black;
  padding: 2.5rem 1.5rem;
  /* background-color: #ffdec2; */
  background-color: #edddd4;
  font-size: 1.6rem;
  position: relative;
}
.transformSlow {
  transition: transform 0.25s;
}
.accepted {
  /* background-c olor: #3ddc97;
  background-color: #9BE564;
  background-color: #26C485;  */
  /* background-color: #B5D6B2; */
  color: rgb(34, 163, 34);
  font-weight: 600;
}
.rejected {
  /* background-color: #DD614A; */
  /* background-color: #BD3B3A; */
  color: white;
  color: #dd614a;
  color: red;
  font-weight: 600;
}
</style>
