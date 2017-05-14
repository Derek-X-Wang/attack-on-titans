<template>
  <div class="hello">
    <img src="../assets/baozou01.jpg">
    <h1>{{ msg }}</h1>
    <h2>Start Simulator(Google)</h2>
    <router-link to="/interview/google">
      <el-button type="primary">Start Here</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
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

.hello {
  margin-top: 60px;
}
</style>
