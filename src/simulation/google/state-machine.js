import * as StateMachine from 'javascript-state-machine';
import store from '../../store';
import api from '../../server/api';
import googleClient from './gapi';
import InterviewTimer from './interview-timer';
import ScriptGenerator from './script-generator';

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

function makeQuestion(question) {
  return `\n${question.question}\n${question.example || ''}\n`;
}

function subtractParagraph(combined, sub) {
  const combinedLines = combined.trim().split('\n');
  const subLines = sub.trim().split('\n');
  // since combinedLines will double the empty line,
  // we need to double empty line in subLines also.
  const doubleEmptyLines = [];
  subLines.forEach((line) => {
    if (line === '') {
      doubleEmptyLines.push(line);
      doubleEmptyLines.push(line);
    } else {
      doubleEmptyLines.push(line);
    }
  });
  const diff = combinedLines.slice(doubleEmptyLines.length);
  const answer = diff.join('\n');
  return answer.trim();
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
      index: 0, // current question index
      /*
        {
          index: number,
          name: string,
          language: string,
          question: string,
          example: string,
          answer: string,
          userAnswer: string,
        }
        */
      records: [],
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

      // init state
      this.question = 0;
      this.index = 0;
      this.records = [];

      googleClient.newContent(this.fileId, ' '); // have to be ' ', '' will become null
      runScript({ interviewState: fsm.state }, this.timer);
      this.timer.task(() => fsm.ask());
    },
    onAsk() {
      console.log('onAsk');
      const that = this;
      runScript({
        interviewState: fsm.state,
        question: this.question,
      }, this.timer);
      this.timer.task(() => {
        const difficulty = difficultyLevel[this.question];
        api.pickQuestion(difficulty, 'java', that.records)
          .then((response) => {
            const data = response.data;
            const record = {
              index: data.index,
              language: data.language,
              name: data.name,
              question: data.question,
              example: data.example,
              answer: data.answer,
              userAnswer: null,
            };
            that.records.push(record);
            that.index = data.index;
            googleClient.newContent(this.fileId, makeQuestion(data));
            // googleClient.addContent(this.fileId, fullText);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      this.timer.wait(1000 * 60 * 12);
      this.timer.speak('Sorry, we run out of time for this question', () => {
        fsm.verify();
      });
    },
    onVerify() {
      console.log('onVerify');
      const that = this;
      googleClient.loadContent(that.fileId, (res) => {
        const records = that.records;
        const match = records.filter(x => x.index === that.index);
        if (match.length === 0 || match[0].userAnswer != null) {
          console.log('error, record not saved');
          return;
        }
        const record = match[0];
        const userAnswer = subtractParagraph(res.content, makeQuestion(record));
        console.log(userAnswer);
        record.userAnswer = userAnswer;
        console.log(record);
      });
      runScript({ interviewState: fsm.state }, this.timer);
      this.timer.wait(1000 * 60 * 1);
      this.timer.task(() => {
        that.stepValidation();
      });
    },
    onFinish() {
      console.log('onFinish');
      runScript({ interviewState: fsm.state }, this.timer);
      // state in progress without wait time
      // TODO: fix this issue
      this.timer.wait(1000 * 1);
      this.timer.task(() => {
        fsm.end();
      });
    },
    onEnd() {
      console.log('interview ended');
      store.dispatch({
        type: 'showInterviewReport',
        records: this.records,
      });
    },
    onStop() {
      console.log('interview stopped');
      // clear timer
      this.timer.clear();
    },
  },
});

export default fsm;
