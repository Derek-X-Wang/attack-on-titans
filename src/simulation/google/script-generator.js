
const names = ['Derek', 'Jack', 'Eric', 'Jim', 'Thomas', 'Matt', 'David'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function ScriptGenerator(initState) {
  let interviewer = initState.interviewer;
  if (interviewer == null || interviewer === 'random') {
    interviewer = pick(names);
  }
  const scripts = {
    init: [],
    idle: [
      ["Welcome to Google interview simulator. If you're ready, please click on the play button on the bottom right."],
      ["This is Google interview simulator. Let's click the button at bottom right and get started!"],
      ["Your Google interview simulator is launched. Let's get started! The start button is located at bottom right corner."],
    ],
    intro: [
      [
        'Hi, nice to meet you.',
        `I'm ${interviewer} from Google.`,
        'How are you today?',
        'Well, could you talk a little bit about yourself?',
        40 * 1000,
        "Good. Without further ado, let's get started",
      ],
    ],
    question: [],
    questionFirst: [
      [
        'First question.',
        "Let's begin with something simple.",
      ],
    ],
    questionSecond: [
      ['Second question.'],
    ],
    questionLast: [
      ['Last question.'],
    ],
    validation: [
      ['So, what are the time complexity and space complexity of your algorithm?'],
    ],
    ending: [
      ['Thank you for your participation! You will hear our next move for our recruiter!'],
    ],
  };
  this.generate = (state) => {
    switch (state.interviewState) {
      case 'init':
      case 'idle':
      case 'intro':
      case 'validation':
      case 'ending': {
        const script = pick(scripts[state.interviewState]);
        return script;
      }
      case 'question': {
        switch (state.question) {
          case 0:
            return pick(scripts.questionFirst);
          case 1:
            return pick(scripts.questionSecond);
          case 2:
            return pick(scripts.questionLast);
          default:
            return ['Next question.'];
        }
      }
      default:
        return 'Error';
    }
  };
}

export default ScriptGenerator;
