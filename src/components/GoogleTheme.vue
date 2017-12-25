<template>
  <div class="google">
    <v-alert color="warning" dismissible v-model="alert" transition="slide-y-transition">
      Oooops! Your browser doesn't support google speech synthesis!
    </v-alert>
    <iframe width="100%" height="100%" frameborder='0' :src='url'>
    </iframe>
    <v-snackbar bottom left :timeout="snackbar.timeout" :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
      <v-btn flat @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
import Artyom from 'artyom.js';
import * as types from '../store/mutation-types';
let artyom = new Artyom();
import google from '../simulation/google';

export default {
  name: 'google',
  props: ['id'],
  data() {
    return {
      alert: false,
      snackbar: {
        show: false,
        timeout: 6000,
        color: "info",
        message: "This is msg",
      },
    };
  },
  methods: {
    checkArtyom() {
      if (!artyom.speechSupported) {
        this.alert = true;
      } else {
        google.state.prepare();
      }
    },
    play() {
      if (google.state.state === 'idle') {
        google.state.start();
        this.showSnackbar('Interview is started', 'info');
      } else {
        this.showSnackbar('Interview is running already', 'warning');
      }
    },
    stop() {
      google.state.stop();
      this.showSnackbar('Interview is stopped', 'warning');
    },
    next() {
      if (google.state.state === 'idle') {
        this.showSnackbar('Interview is not running', 'warning');
        return;
      }
      google.state.next();
      const num = google.state.question + 1
      const questionNumber = num === 1 ? '' : ` ${num}`;
      const msg = `Skip to ${google.state.state}${questionNumber}`;
      this.showSnackbar(msg, 'info');
    },
    showSnackbar(message, color) {
      if (this.snackbar.show) {
        this.snackbar.show = false;
        let that = this;
        setTimeout(function() {
          // delay for previous snackbar dismiss
          that.snackbar.message = message;
          that.snackbar.color = color;
          that.snackbar.show = true;
        }, 300);
      } else {
        this.snackbar.message = message;
        this.snackbar.color = color;
        this.snackbar.show = true;
      }
    },
  },
  computed: {
    url() {
      const res = `https://docs.google.com/document/d/${this.id}/edit?usp=sharing`;
      return res;
    }
  },
  mounted() {
    google.state.fileId = this.id;
    console.log(`user login is ${window.gapi.auth2.getAuthInstance().isSignedIn.get()}`);
    let that = this;
    setTimeout(function() {
      that.checkArtyom();
    }, 1000);
  },
  created() {
    // Register event of toolbar
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case types.INTERVIEW_START:
          this.play();
          break;
        case types.INTERVIEW_STOP:
          this.stop();
          break;
        case types.INTERVIEW_NEXT:
          this.next();
          break;
      }
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.google {
  height: 100%;
}

.alert {
  margin: 0;
}
</style>
