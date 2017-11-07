/* eslint no-console: 0 */
import Artyom from 'artyom.js';
import * as StateMachine from 'javascript-state-machine';
import GoogleClient from './gapi';

const artyom = new Artyom();

const fsm = new StateMachine({
  init: 'init',
  transitions: [
    { name: 'prepare', from: 'init', to: 'idle' },
    { name: 'start', from: 'idle', to: 'intro' },
    { name: 'ask', from: ['intro', 'validation'], to: 'question' },
    { name: 'verify', from: 'question', to: 'validation' },
    { name: 'finish', from: 'validation', to: 'ending' },
    { name: 'stop', from: 'ending', to: 'idle' },
  ],
  data() {
    return {
      question: 0,
      fileId: 'unknown',
    };
  },
  methods: {
    onPrepare() {
      console.log('onPrepare');
      artyom.say("Welcome to Google interview simulator. If you're ready, please click on the play button on the bottom right.");
    },
    onStart() {
      console.log('onStart');
      GoogleClient.newContent(this.id, '');
      artyom.say("Hi, nice to meet you. I'm Jack from Google. How are you today?");
      artyom.say('Well, could you talk a little bit about yourself?');
    },
    onAsk() { console.log('I vaporized'); },
    onVerify() { console.log('I condensed'); },
    onFinish() { console.log('I condensed'); },
    onStop() { console.log('I vaporized'); },
  },
});

export default fsm;
