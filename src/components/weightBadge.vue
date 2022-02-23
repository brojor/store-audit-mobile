<template>
  <div class="badge">
    <svg
      width="14"
      height="14"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#cfcfcf"
      color="#000"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002
         5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      ></path>
    </svg>
    <div class="number">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
};
</script>

<style scoped>
.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  height: 19px;
  padding: 0 0.6rem;
  background-color: #a2a2a2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.number {
  color: #cfcfcf;
  font-size: 12px;
  font-weight: 500;
  margin-top: 1px;
  margin-left: 2px;
}
svg {
  /* padding: 2px; */
}
</style>
