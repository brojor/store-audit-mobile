<template>
  <main>
    <h1>Store audit</h1>
    <select name="selectedStore" id="selectedStore" v-model="selectedStore">
      <option v-for="(store, index) in stores" :key="index" :value="store.id">{{
        store.name
      }}</option>
    </select>
    <div v-for="category in categories" :key="category.id" class="kategory">
      <div
        @click="dropDown(category.id)"
        class="kategory-title"
        :class="{ active: activeKategory === category.id }"
      >
        {{ category.name }}
        <span class="rt-idx">
          {{
            `${(
              (calcCurrentScore(category.id) / calcAvailableScore(category.id)) *
              100
            ).toFixed()}%`
          }}
        </span>
      </div>
      <transition name="roll">
        <div class="points" v-if="activeKategory === category.id">
          <CategoryPoint
            v-for="categoryPoint in category.categoryPoints"
            :key="categoryPoint.id"
            :categoryPoint="categoryPoint"
            :category="category"
          />
        </div>
      </transition>
    </div>
    <button @click="sendResults">Odeslat</button>
    <RootModal></RootModal>
    <div v-if="hiddeAll" class="secret">
      <form @submit.prevent="unhide">
        <input type="text" placeholder="Zadejte heslo" v-model="password" />
      </form>
    </div>
    <LoginComponent v-if="!userIsLogged" />
  </main>
</template>

<script>
import RootModal from '@/components/RootModal.vue';
import LoginComponent from '@/components/Login.vue';
import CategoryPoint from '@/components/CategoryPoint.vue';
import EventBus from '../eventBus';
import results from '../results.json';
// import categories from '../skeleton.json';

export default {
  name: 'StoreAudit',
  components: { RootModal, LoginComponent, CategoryPoint },

  data() {
    return {
      hiddeAll: false,
      password: '',
      activeKategory: null,
      justEdited: {},
      results,
      // categories,
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
    // selectedStore() {
    //   return this.$store.state.stores[0];
    // },
  },
  methods: {
    unhide() {
      if (this.password.toLowerCase() === 'únor') {
        this.hiddeAll = false;
      }
    },

    dropDown(index) {
      this.activeKategory = this.activeKategory === index ? null : index;
    },
    calcAvailableScore(categoryId) {
      const [currentCategory] = this.categories.filter((category) => category.id === categoryId);
      return currentCategory.categoryPoints.reduce(
        (acc, categoryPoint) => acc + categoryPoint.weight,
        0,
      );
    },
    calcCurrentScore(categoryId) {
      const resultItems = this.results.filter((point) => point.kategory === categoryId);
      return resultItems.reduce((acc, point) => {
        if (point.accepted) {
          const currentCategory = this.categories.find(
            (category) => category.id === point.kategory,
          );
          const { weight } = currentCategory.categoryPoints.find(
            (categoryPoint) => categoryPoint.id === point.kategoryPoint,
          );
          return acc + weight;
        }
        return acc;
      }, 0);
    },
    swipedRight(categoryId, categoryPointId) {
      this.writeStatus(categoryId, categoryPointId, true);
    },
    swipedLeft(categoryId, categoryPointId) {
      this.writeStatus(categoryId, categoryPointId, false);
      // samostatná metoda?
      this.justEdited = { categoryId, categoryPointId };
      setTimeout(() => {
        EventBus.$emit('open');
      }, 500);
    },
    writeStatus(categoryId, categoryPointId, value) {
      const [objToWrite] = this.results.filter(
        (obj) => obj.kategory === categoryId && obj.kategoryPoint === categoryPointId,
      );
      objToWrite.accepted = value;
      console.log(objToWrite);
    },
    calcMoveLength(event) {
      const positionX = event.touches[0].clientX;
      const moveLength = positionX - this.posX.start;
      return moveLength;
    },
    writeComment(categoryId, categoryPointId, comment) {
      const [objToWrite] = this.results.filter(
        (obj) => obj.kategory === categoryId && obj.kategoryPoint === categoryPointId,
      );
      console.log({ objToWrite });
      objToWrite.comment = comment;
    },
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
  created() {
    EventBus.$on('commentAdded', (comment) => {
      const { categoryId, categoryPointId } = this.justEdited;
      this.writeComment(categoryId, categoryPointId, comment);
    });
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

.roll-enter-active,
.roll-leave-active {
  transition: all 0.5s cubic-bezier(0.37, 0, 0.63, 1);
  max-height: 2000px;
}

.roll-enter,
.roll-leave-to {
  max-height: 0px;
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

.kategory {
  width: 100%;
  border: 2px solid black;
  margin: 4px 0;
  background-color: #eee;
  overflow: hidden;
}
.kategory-title {
  background-color: #564d51;
  color: white;
  padding: 1.5rem 0;
  font-size: 1.8rem;
  transition: background-color 0.5s;
  position: relative;
}
.active {
  background-color: #201d1e;
}
.points {
  background-color: #eee;
}

.rt-idx {
  font-size: 1.1rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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
