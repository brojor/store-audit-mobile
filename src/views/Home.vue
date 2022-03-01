<template>
  <div class="home-view">
    <StoreSelector />
    <section class="list-of-categories">
      <AuditCategory v-for="category in categories" :key="category.id" :category="category" />
    </section>
    <button id="sendResults" class="btn btn-w100" @click="sendResults">
      Odeslat
    </button>
  </div>
</template>

<script>
import AuditCategory from '../components/AuditCategory.vue';
import StoreSelector from '../components/StoreSelector.vue';

export default {
  name: 'StoreAudit',
  components: {
    AuditCategory,
    StoreSelector,
  },
  computed: {
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    sendResults() {
      this.$store.dispatch('sendResultsToServer');
    },
  },
  mounted() {
    this.$store.dispatch('getSeed');
  },
};
</script>

<style lang="css" scoped>
.home-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.list-of-categories {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.btn-w100 {
  width: 100%;
  margin: 4px 0;
  margin-top: 0.5rem;
  height: 55px;
  overflow: visible;
  font-size: 2rem;
}
</style>
