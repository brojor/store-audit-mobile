<template>
  <main>
    <h1>Store audit</h1>
    <select name="selectedStore" id="selectedStore" v-model="selectedStore">
      <option v-for="(store, index) in stores" :key="index" :value="store.id">{{
        store.name
      }}</option>
    </select>
    <CategoryWrapper v-for="category in categories" :key="category.id" :category="category" />
    <button class="submit-main" @click="sendResults">Odeslat</button>
    <RootModal></RootModal>
    <LoginComponent v-if="!userIsLogged" />
  </main>
</template>

<script>
import RootModal from '@/components/RootModal.vue';
import LoginComponent from '@/components/Login.vue';
import CategoryWrapper from '@/components/CategoryWrapper.vue';

export default {
  name: 'StoreAudit',
  components: { RootModal, LoginComponent, CategoryWrapper },

  data() {
    return {
      hiddeAll: false,
      password: '',
      justEdited: {},
      selectedStore: this.$store.state.stores[0].id,
    };
  },
  computed: {
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
    stores() {
      return this.$store.state.stores;
    },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    sendResults() {
      const unfilled = this.$store.getters.unfilledPoints;
      if (unfilled.length) {
        // MODAL error - nejsou vyplněny následující body
        console.log('nejsou vyplněný následující body: ', unfilled);
      } else {
        console.log('Posílám výsledky');
        const result = {
          storeId: this.selectedStore,
          results: this.$store.getters.results,
        };
        console.log(result);
      }
    },
  },
};
</script>

<style lang="css" scoped>
select {
  width: 100%;
  height: 4rem;
  border: 2px solid black;
  border-radius: 4px;
  text-align-last: center;
margin-bottom: 1rem;
}

main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  padding: 0.5rem;
}
h1 {
  font-size: 3rem;
  margin: 1rem;
  text-transform: uppercase;
}

.active {
  background-color: #201d1e;
}
button.submit-main {
  width: 100%;
  border: 2px solid black;
  border-radius: 4px;
  margin: 4px 0;
  margin-top: .5rem;
  height: 55px;
  overflow: visible;
  background-color: #e60001;
  color: white;
  font-size: 2rem;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
  font-weight: 600;
}
</style>
