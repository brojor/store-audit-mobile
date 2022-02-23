<template>
  <div class="home-view">
    <StoreSelector />
    <section class="list-of-categories">
      <AuditCategory v-for="category in categories" :key="category.id" :category="category" />
    </section>
    <button id="sendResults" class="btn btn-w100" @click="sendResultsToServer">Odeslat</button>
    <RootModal></RootModal>
  </div>
</template>

<script>
import RootModal from '@/components/modal/RootModal.vue';
import AuditCategory from '../components/AuditCategory.vue';
import Warning from '../components/modal/Warning.vue';
import StoreSelector from '../components/StoreSelector.vue';
import Api from '../services/Api';

export default {
  name: 'StoreAudit',
  components: {
    RootModal,
    AuditCategory,
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
