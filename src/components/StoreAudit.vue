<template>
  <main>
    <h1>Store audit</h1>
    <select name="selectedStore" id="selectedStore" v-model="selectedStore">
      <option v-for="(store, index) in stores" :key="index" :value="store.id">{{
        store.name
      }}</option>
    </select>
    <CategoryWrapper v-for="category in categories" :key="category.id" :category="category" />
    <button @click="sendResults">Odeslat</button>
    <RootModal></RootModal>
    <LoginComponent v-if="!userIsLogged" />
  </main>
</template>

<script>
import RootModal from '@/components/RootModal.vue';
import LoginComponent from '@/components/Login.vue';
import CategoryWrapper from '@/components/CategoryWrapper.vue';
import results from '../results.json';

export default {
  name: 'StoreAudit',
  components: { RootModal, LoginComponent, CategoryWrapper },

  data() {
    return {
      hiddeAll: false,
      password: '',
      justEdited: {},
      results,
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
      const unfilled = this.findUnfilledPoints();
      if (unfilled.length) {
        // MODAL error - nejsou vyplněny následující body
        console.log('nejsou vyplněný následující body: ', unfilled);
      } else {
        console.log('Posílám výsledky');
        const result = {
          storeId: this.selectedStore,
          results: this.results,
        };
        console.log(result);
      }
    },
    findCategoryName(categoryId) {
      const { name: categoryName } = this.categories.find((category) => category.id === categoryId);
      return categoryName;
    },
    findCategoryPointName(categoryId, categoryPointId) {
      const { categoryPoints } = this.categories.find((category) => category.id === categoryId);
      const { name: categoryPointName } = categoryPoints.find(
        (categoryPoint) => categoryPoint.id === categoryPointId,
      );
      return categoryPointName;
    },
    findUnfilledPoints() {
      const unfilled = this.results.filter((result) => result.accepted === null);
      const mergedByCategory = unfilled.reduce((acc, result) => {
        const categoryId = result.kategory;
        if (!(categoryId in acc)) {
          const categoryName = this.findCategoryName(categoryId);
          const unfilledPoints = unfilled
            .filter((res) => res.kategory === categoryId)
            .map((point) => this.findCategoryPointName(point.kategory, point.kategoryPoint));
          acc[categoryId] = { categoryName, unfilledPoints };
        }
        return acc;
      }, {});
      return Object.values(mergedByCategory);
    },
  },
};
</script>

<style lang="css" scoped>
select {
  width: 100%;
  height: 3rem;
  text-align-last: center;
  margin: 1rem 0;
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
  margin: 2rem;
  text-transform: uppercase;
}

.active {
  background-color: #201d1e;
}

/*--component start--*/
.secret {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(8px);
}
.secret input {
  margin-top: 33vh;
  height: 3rem;
  padding: 1rem;
  text-align: center;
}
/*--component end--*/
</style>
