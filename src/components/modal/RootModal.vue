<template>
  <BaseModal :isOpen="isOpen" @close="handleClose">
    <component :is="$store.state.modal.component" @onClose="handleClose" />
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'RootModal',
  components: { BaseModal },
  computed: {
    isOpen() {
      return this.$store.state.modal.isOpen;
    },
  },
  methods: {
    handleClose() {
      this.$store.commit('CLOSE_MODAL');
    },
  },
};
</script>
