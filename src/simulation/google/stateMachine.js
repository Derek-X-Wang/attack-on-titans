import * as StateMachine from 'javascript-state-machine';

const fsm = new StateMachine({
  init: 'welcome',
  transitions: [
    { name: 'ready', from: 'welcome', to: 'idle' },
    { name: 'start', from: 'idle', to: 'intro' },
    { name: 'ask', from: ['intro', 'validation'], to: 'question' },
    { name: 'verify', from: 'question', to: 'validation' },
    { name: 'finish', from: 'validation', to: 'ending' },
    { name: 'stop', from: 'ending', to: 'idle' },
  ],
  data(color) {
    return {
      question: 0,
    }
  },
  methods: {
    onReady() { console.log('I melted'); },
    onStart() { console.log('I froze'); },
    onAsk() { console.log('I vaporized'); },
    onVerify() { console.log('I condensed'); },
    onFinish() { console.log('I condensed'); },
    onStop() { console.log('I vaporized'); },
  },
});

export default fsm;
