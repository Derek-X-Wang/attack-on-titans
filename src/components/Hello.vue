<template>
  <v-app id="hello">
    <v-toolbar class="transparent elevation-0" light>
      <v-toolbar-title class="hidden-sm-and-down">Attack on Titans</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-item href="https://github.com/">Github</v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout column align-center>
          <h3>Simulate Your Phone Screen</h3>
          <p>This app attempts to simualte big tech companies' phone screen, as real as possible.</p>
          <v-layout row>
              <v-layout column align-center>
                <img class="company-icons" src="../assets/icons8-Google-400.png">
                <v-btn primary light router to="/interview/google">Start Google</v-btn>
              </v-layout>
              <v-layout column align-center>
                <img class="company-icons" src="../assets/icons8-Facebook-400.png">
                <v-btn primary light disabled router to="/interview/facebook">Start Facebook</v-btn>
              </v-layout>
              <v-layout column align-center>
                <img class="company-icons" src="../assets/icons8-Windows-400.png">
                <v-btn primary light disabled router to="/interview/microsoft">Start Microsoft</v-btn>
              </v-layout>
          </v-layout>
        </v-layout>
      </v-container>
  </main>
    <v-footer class="pa-3 transparent elevation-0">
      <router-link to="/">
        Credit
      </router-link>
      <!-- <a href="https://icons8.com">Icons by Icons8</a>
      <a href="https://unsplash.com/search/code?photo=fPkvU7RDmCo">Photo by Caspar Rubin</a> -->
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
<style scoped>
#hello {
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
