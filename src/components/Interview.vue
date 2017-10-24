<template>
  <v-app dark id="interview">
    <router-view></router-view>
    <v-speed-dial absolute right bottom direction="top" hover>
      <v-btn slot="activator" color="blue darken-2" fab>
        <v-icon>menu</v-icon>
      </v-btn>
      <v-btn fab dark small color="green" @click.native="play">
        <v-icon>play_arrow</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click.native="pause">
        <v-icon>pause</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click.native="stop">
        <v-icon>stop</v-icon>
      </v-btn>
    </v-speed-dial>
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

/* Force FAB to bottom */
/* TODO: get this alignment done within vuetify framework */
.speed-dial--bottom.speed-dial--absolute {
  bottom: 10%;
}
</style>
