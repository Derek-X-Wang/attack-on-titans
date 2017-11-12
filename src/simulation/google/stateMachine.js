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
      timeout: null,
    };
  },
  methods: {
    onPrepare() {
      console.log('onPrepare');
      artyom.say("Welcome to Google interview simulator. If you're ready, please click on the play button on the bottom right.");
    },
    onStart() {
      console.log('onStart');
      GoogleClient.newContent(this.fileId, ' ');
      artyom.say("Hi, nice to meet you. I'm Jack from Google. How are you today?");
      artyom.say('Well, could you talk a little bit about yourself?');

      setTimeout(() => {
        artyom.say("Good. Without further ado, let's get started", {
          onEnd() {
            fsm.ask();
          },
        });
      }, 10000);
    },
    onAsk() {
      const that = this;
      let askText = 'Next question.';
      switch (this.question) {
        case 0:
          askText = "First question. Let's begin with something simple.";
          break;
        case 1:
          askText = 'Second question.';
          break;
        case 2:
          askText = 'Last question.';
          break;
        default:
          break;
      }
      artyom.say(askText, {
        onEnd() {
          // put question
          GoogleClient.addContent(this.fileId, '\nThis is a new question.');
          // setup timer
          that.timeout = setTimeout(() => {
            artyom.say('Sorry, we run out of time for this question', {
              onEnd() {
                fsm.verify();
              },
            });
          }, 1000 * 60 * 25);
        },
      });
    },
    onVerify() {
      const that = this;
      artyom.say('So, what are the time complexity and space complexity of your algorithm?');
      setTimeout(() => {
        if (that.question === 2) {
          fsm.finish();
        } else {
          fsm.ask();
        }
      }, 1000 * 60 * 5);
    },
    onFinish() {
      artyom.say('Thank you for your participation! You will hear our next move for the recruiter!');
    },
    onStop() { console.log('interview stopped'); },
  },
});

export default fsm;
