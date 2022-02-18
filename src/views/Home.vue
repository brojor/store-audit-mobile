<template>
  <main>
    <StoreSelector />
    <CategoryWrapper v-for="category in categories" :key="category.id" :category="category" />
    <button class="btn btn-w100" @click="sendResultsToServer">Odeslat</button>
    <RootModal></RootModal>
  </main>
</template>

<script>
import RootModal from '@/components/modal/RootModal.vue';
import CategoryWrapper from '../components/CategoryWrapper.vue';
import Warning from '../components/modal/Warning.vue';
import StoreSelector from '../components/StoreSelector.vue';
import Api from '../services/Api';

export default {
  name: 'StoreAudit',
  components: {
    RootModal,
    CategoryWrapper,
    StoreSelector,
  },
  data() {
    return {
      hiddeAll: false,
      password: '',
      justEdited: {},
    };
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
    sendResultsToServer() {
      const unfilled = this.$store.getters.listOfUnfilledItems;
      if (unfilled.length) {
        this.$store.dispatch('showUnfilledPointsWarning', unfilled);
      } else {
        const payload = {
          storeId: this.$store.state.selectedStoreId,
          results: this.$store.state.results,
          date: new Date(),
        };
        Api.sendResults(payload)
          .then(({ data }) => {
            if (data.success) {
              const message = 'Výsledky auditu byly úspěšně uloženy do databáze';
              this.$store.commit('OPEN_MODAL', { title: 'Dokončeno', component: Warning, message });
              this.$store.commit('RESET_RESULTS');
            } else {
              const { message } = data;
              this.$store.commit('OPEN_MODAL', { title: 'Chyba', component: Warning, message });
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
  mounted() {
    this.$store.dispatch('getSeed');
  },
};
</script>

<style lang="css" scoped>
main {
  margin-top: 6.5rem;
  position: relative;
  width: 100vw;
  /* height: 100vh; */
  overflow-x: hidden;
  padding: 0.5rem;
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
