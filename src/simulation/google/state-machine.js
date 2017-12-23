import axios from 'axios';
import * as StateMachine from 'javascript-state-machine';
import GoogleClient from './gapi';
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

function pickQuestion(difficulty, language) {
  const d = difficulty.toLowerCase();
  const l = language.toLowerCase();
  const url = `${ENDPOINT}/problem`;
  return axios.get(url, {
    params: {
      d,
      l,
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
        record: [], // {question: '', example: '', answer: '', userAnswer: ''}
        language: 'java',
      },
    };
  },
  methods: {
    onPrepare() {
      console.log('onPrepare');
      this.timer = new InterviewTimer();
      runScript({ interviewState: fsm.state }, this.timer);
    },
    onStart() {
      console.log('onStart');
      GoogleClient.newContent(this.fileId, ' ');
      runScript({ interviewState: fsm.state }, this.timer);
      this.timer.task(() => fsm.ask());
    },
    onAsk() {
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
            GoogleClient.addContent(this.fileId, fullText);
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
      const that = this;
      runScript({ interviewState: fsm.state }, this.timer);
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
      runScript({ interviewState: fsm.state }, this.timer);
      this.timer.task(() => {
        fsm.end();
      });
    },
    onEnd() {
      console.log('interview ended');
    },
    onStop() {
      console.log('interview stopped');
    },
  },
});

export default fsm;
