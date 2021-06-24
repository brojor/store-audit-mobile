<template>
  <div
    class="point transformSlow"
    :class="{
      accepted: categoryPoint.accepted === true,
      rejected: categoryPoint.accepted === false,
    }"
    :ref="'touchTarget'"
    @touchstart="touchstart(categoryPoint.id, $event)"
    @touchend="touchend(category, categoryPoint)"
    @touchmove="touchmove($event)"
    draggable="true"
  >
    <p>{{ categoryPoint.name }}</p>
    <p class="rt-idx">{{ categoryPoint.weight }} b.</p>
  </div>
</template>

<script>
export default {
  name: 'CategoryPoint',
  props: ['category', 'categoryPoint'],

  data() {
    return {
      posX: {},
      touchTarget: null,
      moveLength: 0,
    };
  },
  methods: {
    touchstart(index, event) {
      this.posX.start = event.touches[0].clientX;
      this.$refs.touchTarget.classList.remove('transformSlow');
    },
    touchmove(event) {
      this.storeMoveLength(event);
      if (Math.abs(this.moveLength) > 20) {
        this.$refs.touchTarget.style.transform = `translate3d(${this.moveLength}px, 0px, 0px)`;
      }
    },
    touchend(category, categoryPoint) {
      this.$refs.touchTarget.style.transform = 'translate3d(0px, 0px, 0px)';
      this.$refs.touchTarget.classList.add('transformSlow');

      if (this.thresholdExceeded()) {
        this.writeStatus(category.id, categoryPoint.id);
      }
    },
    storeMoveLength(event) {
      const positionX = event.touches[0].clientX;
      this.moveLength = positionX - this.posX.start;
    },
    thresholdExceeded() {
      const threshold = window.innerWidth / 3;
      return Math.abs(this.moveLength) > threshold;
    },
    writeStatus(categoryId, categoryPointId) {
      const swipeDirection = this.moveLength > 0 ? 'right' : 'left';
      const accepted = this.$store.getters.categoryPointIsAccepted(categoryId, categoryPointId);

      if (swipeDirection === 'right' && !accepted) {
        console.log('comituju accepted = TRUE');
        this.$store.commit('WRITE_STATUS', { accepted: true, categoryId, categoryPointId });
      }
      if (swipeDirection === 'left' && accepted !== false) {
        // spustVyskakovacíOkno().then(() => {
        //   commit('WRITE_STATUS', { accepted: false, categoryId, categoryPointId });
        // });
        console.log('comituju accepted = FALSE');
        this.$store.dispatch('addComment', { categoryId, categoryPointId });
        this.$store.commit('WRITE_STATUS', { accepted: false, categoryId, categoryPointId });
      }
    },
  },
};
</script>

<style lang="css" scoped>
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
.accepted {
  background-color: #3ddc97;
  color: white;
}
.rejected {
  background-color: #f0544f;
  color: white;
}
</style>
