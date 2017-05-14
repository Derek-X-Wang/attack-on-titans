<template>
  <div class="google">
    <iframe width="100%" height="100%" frameborder='0' src='https://docs.google.com/document/d/1RB4im1WpR-BOaXCZv-7gC2na8rintoRapz3iXpqcXy8/edit?usp=sharing'>
    </iframe>
    <el-dialog
      title="Warning"
      :visible.sync="dialogVisible"
      size="tiny">
      <span>Oooops! Your browser doesn't support google speech synthesis. Please try to use the last version of Chrome!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Back to home page</el-button>
        <el-button type="primary" @click="dialogVisible = false">It's Okay</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import * as Artyom from 'artyom.js';
let artyom = Artyom.ArtyomBuilder.getInstance();

export default {
  name: 'google',
  methods: {
    startArtyom() {
      if (!artyom.speechSupported) {
        this.dialogVisible = true;
        return;
      }
      artyom.initialize({
          lang: "en-US", // US english
          speed: 1,
          debug: true, // Show messages in the console
      });
      artyom.say("Hello, this is a demo text.");
    }
  },
  mounted: function() {
    this.startArtyom();
  },
  data() {
    return {
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
