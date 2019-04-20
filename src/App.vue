<template lang="pug">
  #app
    Dashboard(:window="window")

</template>

<script>

import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Dashboard
  },

  data () {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
}
</script>

<style>
  @import url('../css/home.css');
</style>
