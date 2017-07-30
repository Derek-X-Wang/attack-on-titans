<template>
  <v-app id="aot-container">
    <v-toolbar class="transparent elevation-0" light>
      <v-toolbar-title class="hidden-sm-and-down">
        <router-link to="/">
            Attack on Titans
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-item href="https://github.com/">Github</v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
  </main>
    <v-footer class="pa-3 transparent elevation-0">
      <router-link to="/credits">
        Credit
      </router-link>
      <v-spacer></v-spacer>
      <div>Version {{version}} | Derek.X.W © {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import { version } from './../../package.json';

export default {
  name: 'hello',
  data() {
    return {
      version,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#aot-container {
  height: inherit;
  background: url('../assets/code-min.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
h2, h3, h4, p, a {
  color: white;
  text-decoration:none;
}

p {
  font-size: 1.5em;
}
.container {
  display: flex;
  align-items:center;
  justify-content:center;
}
.company-icons {
  width: 200px;
  height: 200px;
}
</style>
