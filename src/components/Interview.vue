<template>
  <div class="interview">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2"><i class="el-icon-caret-right"></i></el-menu-item>
      <el-menu-item index="3"><i class="el-icon-close"></i></el-menu-item>
      <el-menu-item index="4" class="floatright"><i class="el-icon-setting"></i></el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'interview',
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
