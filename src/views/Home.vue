<template>
  <main>
    <StoreSelector />
    <CategoryWrapper v-for="category in categories" :key="category.id" :category="category" />
    <button class="btn btn-w100" @click="sendResults">Odeslat</button>
    <RootModal></RootModal>
  </main>
</template>

<script>
import RootModal from '@/components/modal/RootModal.vue';
import CategoryWrapper from '@/components/CategoryWrapper.vue';
import Warning from '@/components/modal/Warning.vue';
import Api from '@/services/Api';
import DataService from '../services/DataService';
import StoreSelector from '../components/StoreSelector.vue';

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
  mounted() {
    const token = localStorage.getItem('token');
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.dispatch('getStores');
  },

  computed: {
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
    categories() {
      return this.$store.getters.results2d;
    },
  },
  methods: {
    sendResults() {
      const unfilled = this.$store.getters.listOfUnfilledItems;
      if (unfilled.length) {
        this.$store.dispatch('showUnfilledPointsWarning', unfilled);
      } else {
        const payload = {
          storeId: this.$store.state.selectedStoreId,
          results: this.$store.state.results,
        };
        DataService.sendResults(payload)
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
};
</script>

<style lang="css" scoped>
main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  padding: 0.5rem;
}

‹ .active {
  background-color: #201d1e;
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
