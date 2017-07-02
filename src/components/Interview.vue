<template>
  <v-app id="interview">
    <!-- <v-dialog v-model="dialog">
      <v-card>
        <v-card-row>
          <v-card-title>Use Google's location service?</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog> -->
    <v-toolbar class="elevation-0" light>
      <v-toolbar-title class="hidden-sm-and-down">Attack on Titans</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-item @click.native="play"><v-icon light>play_arrow</v-icon></v-toolbar-item>
        <v-toolbar-item @click.native="pause" slot="activator"><v-icon light>pause</v-icon></v-toolbar-item>
        <v-toolbar-item @click.native.stop="stop"><v-icon light>stop</v-icon></v-toolbar-item>
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
    };
  },
  methods: {
    play() {
      console.log("hahahaha");
    },
    pause() {
      //this.dialog = true;
    },
    stop() {
      this.dialog = true;
    },
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
