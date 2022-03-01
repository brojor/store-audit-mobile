<template>
  <section>
    <h1 class="category-name">{{ categoryName }}</h1>
    <div class="status-bar">
      <span id="available-score">Max. score : {{ score.available }}</span>
      <span id="achieved-score">Dosažené score: {{ score.achieved }}</span>
      <span id="perc-fulfillment">Splněno na {{ score.perc.toFixed(0) }}%</span>
    </div>
  </section>
</template>

<script>
export default {
  props: ['categoryName', 'score'],
};
</script>

<style scoped>
.status-bar {
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 4px;
  font-size: 1.1rem;
}
.category-name {
  background-color: #086199;
  border-radius: 4px;
  margin: 4px;
  padding: 1.25rem 1rem;
  font-size: 2rem;
  color: white;
  font-weight: normal;
}
</style>
