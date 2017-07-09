<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/main'
#app
  height: inherit
.height-inherit
  height: inherit
</style>
