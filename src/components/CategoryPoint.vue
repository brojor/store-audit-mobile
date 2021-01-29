<template>
  <div>
    <p>{{ point.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'CategoryPoint',
  props: ['point'],

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
