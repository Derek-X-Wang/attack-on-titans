<template>
  <v-layout column align-center id="hello">
    <h3>Simulate Your Phone Screen</h3>
    <p>This app attempts to simualte big tech companies' phone screen, as real as possible.</p>
    <v-layout row>
        <v-layout column align-center>
          <img class="company-icons" src="../assets/icons8-Google-400.png">
          <v-btn primary light @click.native.stop="startGoogle">Start Google</v-btn>
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
    <!-- TODO: solve srollbar padding issue -->
    <v-dialog hide-overlay v-model="dialog.open">
      <v-card>
        <v-card-row>
          <v-card-title>{{dialog.headline}}</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>{{dialog.text}}</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog.agree">Agree</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/* eslint no-console: 0 */
import google from '../simulation/google';

export default {
  name: 'hello',
  data() {
    return {
      dialog: {
        open: false,
        headline: 'Placeholder',
        text: 'Placeholder',
        agree() {
          console.log('user agreed');
        },
      },
    };
  },
  methods: {
    startGoogle() {
      this.dialog.open = true;
      this.dialog.headline = 'Google Account!';
      this.dialog.text = 'Google uses google doc. This app will edit your doc. It needs your authorization.';
      const that = this;
      // const gapi = window.gapi;
      this.dialog.agree = () => {
        console.log('user agreed');
        that.dialog.open = false;
        // TODO: bad structure, re-structure needed
        google.client.loadGapiClient(() => {
          google.client.initGapiClient().then(() => {
            google.client.authorize().then(() => {
              console.log('is signed in');
              google.client.callScriptFunction();
            }).catch((error) => {
              if (error && error.error === 'popup_blocked_by_browser') {
                // A popup has been blocked by the browser
                that.dialog.open = true;
                that.dialog.headline = 'Popup blocked!';
                that.dialog.text = 'Please enable popup for this site.';
                this.dialog.agree = () => { that.dialog.open = false; };
              } else {
                // some other error
                console.log(error);
              }
            });
          });
        });
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello {
  
}
.company-icons {
  width: 200px;
  height: 200px;
}
</style>
