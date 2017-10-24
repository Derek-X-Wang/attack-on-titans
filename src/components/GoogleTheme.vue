<template>
  <div class="google">
    <v-alert warning dismissible v-model="alert">
      Oooops! Your browser doesn't support google speech synthesis!
    </v-alert>
    <iframe width="100%" height="100%" frameborder='0' :src='url'>
    </iframe>
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
    };
  },
  methods: {
    startArtyom() {
      if (!artyom.speechSupported) {
        this.alert = true;
        return;
      }
      artyom.initialize({
          lang: "en-US", // US english
          speed: 1,
          debug: true, // Show messages in the console
      });
      artyom.say("Welcome to Google interview simulator. If you're ready, please click on the play buttom on the top right.");
    },
    play() {
      // intro, speech and paste text to google doc
      // start counting time, speech and paste #1 question to google doc
      // next question
      // google.client.callScriptFunction();
      console.log(this.id);
    },
    stop() {
      console.log("stopppppping");
    },
  },
  computed: {
    url() {
      const res = `https://docs.google.com/document/d/${this.id}/edit?usp=sharing`;
      return res;
    }
  },
  mounted() {
    console.log(`user login is ${window.gapi.auth2.getAuthInstance().isSignedIn.get()}`)
    let that = this;
    setTimeout(function() {
      that.startArtyom();
    }, 1000);
  },
  created() {
    // Register event of toolbar
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case types.INTERVIEW_START:
          this.play();
          break;
        case types.INTERVIEW_PAUSE:
          this.stop();
          break;
        case types.INTERVIEW_STOP:
          this.stop();
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
