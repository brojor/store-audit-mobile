<template>
  <main>
    <div class="title-bar">
      <img class="logo-small" src="@/assets/logo-small.png" alt="logo small" />
      <h1>Store audit</h1>
    </div>

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
        this.$store.commit('CHANGE_MODAL_TITLE', 'Chybí vyplnit následující body');
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
.title-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
img.logo-small {
  max-width: 100%;
  height: 3rem;
}
select {
  outline: none;
  width: 100%;
  height: 4rem;
  /* border: 2px solid black; */
  border: none;
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
  font-size: 2.2rem;
  /* margin: 1rem; */
  margin-left: 1rem;
  text-transform: uppercase;
  color: white;
}
‹ .active {
  background-color: #201d1e;
}
button.submit-main {
  width: 100%;
  /* border: 2px solid black; */
  border: none;
  border-radius: 4px;
  margin: 4px 0;
  margin-top: 0.5rem;
  height: 55px;
  overflow: visible;
  background-color: #e60001;
  color: white;
  font-size: 2rem;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
  font-weight: 600;
}
</style>
