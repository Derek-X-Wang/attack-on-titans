import axios from 'axios';
import * as StateMachine from 'javascript-state-machine';
import googleClient from './gapi';
import InterviewTimer from './interview-timer';
import ScriptGenerator from './script-generator';

const ENDPOINT = 'https://wi7z6vqv2g.execute-api.us-east-1.amazonaws.com/v1';

const scriptGenerator = new ScriptGenerator({
  interviewer: 'random',
});

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const difficultyLevel = {
  0: pick(['easy', 'medium']),
  1: pick(['medium', 'hard']),
  2: pick(['medium', 'hard']),
};

function runScript(state, timer) {
  const scripts = scriptGenerator.generate(state);
  scripts.forEach((script) => {
    timer.task(script);
  });
}

function isLastQuestion(question) {
  return question === 2;
}

function pickQuestion(difficulty, language) {
  const d = difficulty.toLowerCase();
  const l = language.toLowerCase();
  const url = `${ENDPOINT}/problem`;
  return axios.get(url, {
    params: {
      d,
      l,
      c: 'google',
    },
  });
}

const fsm = new StateMachine({
  init: 'init',
  transitions: [
    { name: 'prepare', from: 'init', to: 'idle' },
    { name: 'start', from: 'idle', to: 'intro' },
    { name: 'ask', from: ['intro', 'validation'], to: 'question' },
    { name: 'verify', from: 'question', to: 'validation' },
    { name: 'finish', from: 'validation', to: 'ending' },
    { name: 'end', from: 'ending', to: 'idle' },
    { name: 'stop', from: '*', to: 'idle' },
  ],
  data() {
    return {
      question: 0,
      fileId: 'unknown',
      timer: null,
      report: {
        /*
        {
          index: number,
          language: string,
          question: string,
          example: string,
          answer: string,
          userAnswer: string,
        }
        */
        record: [],
        language: 'java',
      },
    };
  },
  methods: {
    stepValidation() {
      if (isLastQuestion(this.question)) {
        fsm.finish();
      } else {
        this.question += 1;
        fsm.ask();
      }
    },
    next() {
      this.timer.clear();
      switch (fsm.state) {
        case 'idle': {
          fsm.start();
          break;
        }
        case 'intro': {
          fsm.ask();
          break;
        }
        case 'question': {
          fsm.verify();
          break;
        }
        case 'validation': {
          this.stepValidation();
          break;
        }
        case 'ending': {
          fsm.end();
          break;
        }
        default:
          break;
      }
    },
    onPrepare() {
      console.log('onPrepare');
      this.timer = new InterviewTimer();
      runScript({ interviewState: fsm.state }, this.timer);
    },
    onStart() {
      console.log('onStart');
      googleClient.newContent(this.fileId, ' '); // have to be ' ', '' will become null
      runScript({ interviewState: fsm.state }, this.timer);
      this.timer.task(() => fsm.ask());
    },
    onAsk() {
      console.log('onAsk');
      runScript({
        interviewState: fsm.state,
        question: this.question,
      }, this.timer);
      this.timer.task(() => {
        const difficulty = difficultyLevel[this.question];
        pickQuestion(difficulty, 'java')
          .then((response) => {
            console.log(response);
            const data = response.data;
            const fullText = `\n\n${data.question}\n${data.example || ''}\n`;
            googleClient.addContent(this.fileId, fullText);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      this.timer.wait(1000 * 60 * 1);
      this.timer.speak('Sorry, we run out of time for this question', () => {
        fsm.verify();
      });
    },
    onVerify() {
      console.log('onVerify');
      const that = this;
      runScript({ interviewState: fsm.state }, this.timer);
      this.timer.wait(1000 * 60 * 1);
      this.timer.task(() => {
        that.stepValidation();
      });
    },
    onFinish() {
      console.log('onFinish');
      runScript({ interviewState: fsm.state }, this.timer);
      this.question = 0;
      // state in progress without wait time
      // TODO: fix this issue
      this.timer.wait(1000 * 1);
      this.timer.task(() => {
        fsm.end();
      });
    },
    onEnd() {
      console.log('interview ended');
    },
    onStop() {
      console.log('interview stopped');
      // clear timer
      this.timer.clear();
    },
  },
});

export default fsm;
