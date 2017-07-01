<template>
  <div class="interview">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link to="/"><icon name="home"></icon></router-link>
      </el-menu-item>
      <el-menu-item index="2"><icon name="play"></icon></el-menu-item>
      <el-menu-item index="3"><icon name="stop"></icon></el-menu-item>
      <el-menu-item index="4" class="floatright"><icon name="cog"></icon></el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'interview',
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case "2":
          this.$store.bus.$emit('interview-play', 1);
          break;
        case "3":
          this.$store.bus.$emit('interview-stop', 1);
          break;
        default:
          console.log(key, keyPath);
      }
    },
  },
  data() {
    return {
      msg: 'Tech Interview Simulation App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  text-decoration: none;
}

.interview {
  height: 100%;
}

.floatright {
  float:right;
}
</style>
