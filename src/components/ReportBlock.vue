<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card light color="transparent" flat>
            <v-subheader light>{{record.index}}. {{record.name}}</v-subheader>
            <v-card-text class="ml-3">
              <pre>{{record.question}}</pre>
              <pre v-if="record.example != null">Example:<br>{{record.example}}</pre>
            </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card light color="transparent" flat>
          <v-card-text class="pr-0 pt-0">
            <v-container fluid class="pr-0 pt-0">
              <v-layout column>
                <v-flex xs12>
                  <v-subheader light>Answer, Reference Only</v-subheader>
                </v-flex>
                <v-flex xs12 style="border-left: 2px solid;">
                  <pre class="pa-2">{{record.answer}}</pre>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card light color="transparent" flat>
          <v-card-text class="pr-0 pt-0">
            <v-container fluid class="pr-0 pt-0">
              <v-layout column>
                <v-flex xs12>
                  <v-subheader light>Your Answer</v-subheader>
                </v-flex>
                <v-flex xs12 style="border-left: 2px solid;">
                  <pre class="pa-2">{{record.userAnswer}}</pre>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'report-block',
  props: ['record'],
  data() {
    return {
      dialog: false,
      alert: false,
    };
  },
  methods: {
    play() {
      this.$store.dispatch({
        type: 'startInterview',
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>