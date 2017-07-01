<template>
  <div class="google">
    <iframe width="100%" height="100%" frameborder='0' src='https://docs.google.com/document/d/1RB4im1WpR-BOaXCZv-7gC2na8rintoRapz3iXpqcXy8/edit?usp=sharing'>
    </iframe>
    <mdialog :title="dialog.title" :text="dialog.text" :visiable="dialog.visiable">
      <el-button @click="dialog.visiable = false">Back to home page</el-button>
      <el-button type="primary" @click="dialog.visiable = false">It's Okay</el-button>
    </mdialog>
  </div>
</template>

<script>
/* eslint-disable */
import * as Artyom from 'artyom.js';
import Dialog from './Dialog.vue';
let artyom = Artyom.ArtyomBuilder.getInstance();

export default {
  name: 'google',
  components: {
    mdialog: Dialog,
  },
  methods: {
    startArtyom() {
      if (!artyom.speechSupported) {
        this.dialog.visiable = true;
        return;
      }
      artyom.initialize({
          lang: "en-US", // US english
          speed: 1,
          debug: true, // Show messages in the console
      });
      artyom.say("Welcome to Google interview simulator. If you're ready, please click on the play buttom on the top left.");
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
  mounted() {
    let that = this;
    setTimeout(function() {
      that.startArtyom();
    }, 1000);
  },
  created() {
    // Register event of toolbar
    this.$store.bus.$on('interview-play', this.play);
    this.$store.bus.$on('interview-stop', this.stop);
  },
  data() {
    return {
      dialog: {
        visiable: false,
        title: "Warning",
        text: "Oooops! Your browser doesn't support google speech synthesis. Please try to use the last version of Chrome!",
      },
      dialogVisible: false,
    };
  },
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
</style>
