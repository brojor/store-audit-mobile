<template>
  <section class="navigation">
    <button
      class="btn arrow"
      id="prev-category"
      @click="prev"
      :disabled="$route.params.id == 1">
      <arrow-left />
    </button>
    <button class="btn home" @click="menu"><home-icon /></button>
    <button
      class="btn arrow"
      id="next-category"
      @click="next"
      :disabled="$route.params.id == numOfCategories"
    >
      <arrow-right />
    </button>
  </section>
</template>

<script>
import HomeIcon from './icons/HomeIcon.vue';
import ArrowLeft from './icons/ArrowLeft.vue';
import ArrowRight from './icons/ArrowRight.vue';

export default {
  components: {
    HomeIcon,
    ArrowLeft,
    ArrowRight,
  },
  computed: {
    numOfCategories() {
      return Object.keys(this.$store.state.categories).length;
    },
  },
  methods: {
    prev() {
      const currentCategory = Number(this.$route.params.id);
      const prevCategory = currentCategory - 1;
      this.$router.push(`/category/${prevCategory}`);
    },
    menu() {
      this.$router.push('/');
    },
    next() {
      const currentCategory = Number(this.$route.params.id);
      const nextCategory = currentCategory + 1;
      this.$router.push(`/category/${nextCategory}`);
    },
  },
};
</script>

<style scoped>
.navigation {
  /* background-color: #000315; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn {
  outline: none;
  border: none;
  color: #fff;
  background-color: transparent;
}
.btn:disabled {
  color: rgb(105, 105, 105);
}
.arrow {
  padding: 1rem;
}
.home {
  padding: 0.5rem;
}
</style>
