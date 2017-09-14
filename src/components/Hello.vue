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
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog.open = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog.agree">Agree</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
    <!-- TODO: solve srollbar padding issue -->
    <v-dialog hide-overlay v-model="createDocDialog.open">
      <v-card>
        <v-card-row>
          <v-card-title>{{createDocDialog.headline}}</v-card-title>
        </v-card-row>
        <v-card-row class="pl-3">
          <v-text-field v-model="createDocDialog.text"
              name="google-doc-name"
              label="Document Name"
              single-line
              prepend-icon="insert_drive_file"></v-text-field>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="switchAccount">Switch</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="createDocDialog.open = false">Cancel</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="onGoogleDocCreate">Create</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/* eslint no-console: 0 */
/* eslint-disable */
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
      createDocDialog: {
        open: false,
        headline: 'Create a Google Doc',
        text: '',
      },
    };
  },
  methods: {
    startGoogle() {
      console.log('startGoogle');
      if (google.client.isSignedIn()) {
        this.createDocDialog.open = true;
        return;
      }
      this.dialog.open = true;
      this.dialog.headline = 'Google Account!';
      this.dialog.text = 'Google uses google doc. This app will edit your doc. It needs your authorization.';
      const that = this;
      this.dialog.agree = () => {
        console.log('user agreed');
        that.dialog.open = false;
        google.client.initGapi((isSignedIn) => {
          // updateAuthStatus
          if (isSignedIn) {
            console.log('Signed In');
            that.createDocDialog.open = true;
          } else {
            console.log('Not Signed in');
            google.client.authorize().catch(that.onAuthError);
          }
        });
      };
    },
    onGoogleDocCreate() {
      console.log('user agreed, create doc');
      const fileName = this.createDocDialog.text;
      google.client.createAndPublishFile(fileName, (resp) => {
        console.log('After publish...');
        this.$router.push({ name: 'google', params: { id: resp.result.id } });
      });
      this.createDocDialog.open = false;
    },
    onAuthError(error) {
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
    },
    switchAccount() {
      google.client.signOut();
      this.createDocDialog.open = false;
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
