/* eslint no-console: 0 */
import Artyom from 'artyom.js';
import * as StateMachine from 'javascript-state-machine';
import GoogleClient from './gapi';
import InterviewTimer from './interviewTimer';

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
      countdownTimer: null,
      timer: null,
    };
  },
  methods: {
    onPrepare() {
      console.log('onPrepare');
      this.timer = new InterviewTimer();
      artyom.say("Welcome to Google interview simulator. If you're ready, please click on the play button on the bottom right.");
    },
    onStart() {
      console.log('onStart');
      GoogleClient.newContent(this.fileId, ' ');
      artyom.say("Hi, nice to meet you. I'm Jack from Google. How are you today?");
      artyom.say('Well, could you talk a little bit about yourself?');
      this.timer.wait(10 * 1000);
      this.timer.speak("Good. Without further ado, let's get started", () => {
        fsm.ask();
      });
    },
    onAsk() {
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

      this.timer.speak(askText, () => {
        // put question
        GoogleClient.addContent(this.fileId, '\nThis is a new question.');
      });
      this.timer.wait(1000 * 60 * 1);
      this.timer.speak('Sorry, we run out of time for this question', () => {
        fsm.verify();
      });
    },
    onVerify() {
      const that = this;
      artyom.say('So, what are the time complexity and space complexity of your algorithm?');
      this.timer.wait(1000 * 60 * 1);
      this.timer.task(() => {
        if (that.question === 2) {
          fsm.finish();
        } else {
          that.question += 1;
          fsm.ask();
        }
      });
    },
    onFinish() {
      artyom.say('Thank you for your participation! You will hear our next move for the recruiter!');
    },
    onStop() { console.log('interview stopped'); },
  },
});

export default fsm;
