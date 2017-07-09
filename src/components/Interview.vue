<template>
  <v-app id="interview">
    <v-layout row justify-center style="position: relative;">
      <v-dialog v-model="dialog" lazy absolute>
        <v-card>
          <v-card-title>
            <div class="headline">Use Google's location service?</div>
          </v-card-title>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-toolbar class="elevation-0" light>
      <router-link to="/">
        <v-toolbar-title class="hidden-sm-and-down">
            Attack on Titans
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-item @click.native="play"><v-icon light>play_arrow</v-icon></v-toolbar-item>
        <v-toolbar-item @click.native="pause"><v-icon light>pause</v-icon></v-toolbar-item>
        <v-toolbar-item @click.native="stop"><v-icon light>stop</v-icon></v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: 'interview',
  data() {
    return {
      dialog: false,
      alert: false
    };
  },
  methods: {
    play() {
      this.$store.dispatch({
        type: 'startInterview',
      });
    },
    pause() {
      this.$store.dispatch({
        type: 'pauseInterview',
      });
    },
    stop() {
      this.$store.dispatch({
        type: 'stopInterview',
      });
    },
  }
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

#interview {
  height: inherit;
}

.floatright {
  float:right;
}
</style>
