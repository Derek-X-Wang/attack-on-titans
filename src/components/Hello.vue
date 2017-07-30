<template>
  <v-layout column align-center id="hello">
    <h3>Simulate Your Phone Screen</h3>
    <p>This app attempts to simualte big tech companies' phone screen, as real as possible.</p>
    <v-layout row>
        <v-layout column align-center>
          <img class="company-icons" src="../assets/icons8-Google-400.png">
          <v-btn primary light router to="/interview/google">Start Google</v-btn>
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
  </v-layout>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
    };
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
