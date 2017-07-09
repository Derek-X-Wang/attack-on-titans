<template>
  <div class="google">
    <v-alert warning dismissible v-model="alert">
      Oooops! Your browser doesn't support google speech synthesis!
    </v-alert>
    <iframe width="100%" height="100%" frameborder='0' src='https://docs.google.com/document/d/1RB4im1WpR-BOaXCZv-7gC2na8rintoRapz3iXpqcXy8/edit?usp=sharing'>
    </iframe>
  </div>
</template>

<script>
/* eslint-disable */
import * as Artyom from 'artyom.js';
import * as types from '../store/mutation-types';
let artyom = Artyom.ArtyomBuilder.getInstance();

export default {
  name: 'google',
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
      console.log("sdsdsdsds");
    },
    stop() {
      console.log("stopppppping");
    },
  },
  computed: {

  },
  mounted() {
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
