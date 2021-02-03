<template>
  <MyModal :isOpen="isOpen" :info="info" @close="handleClose"> </MyModal>
</template>

<script>
import MyModal from '@/components/MyModal.vue';
import EventBus from '../eventBus';

export default {
  name: 'RootModal',
  components: { MyModal },
  data() {
    return {
      isOpen: null,
      info: null,
    };
  },
  created() {
    EventBus.$on('open', (info) => {
      this.isOpen = true;
      this.info = info;
    });
    document.addEventListener('keyup', this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyup);
  },
  methods: {
    handleClose() {
      this.isOpen = false;
    },
    handleKeyup(e) {
      if (e.keyCode === 27) this.handleClose();
    },
  },
};
</script>
