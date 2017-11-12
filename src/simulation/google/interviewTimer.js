import Artyom from 'artyom.js';

function InterviewTimer() {
  const Queue = function Queue() {
    this.list = [];
  };
  Queue.prototype = {
    constructor: Queue,
    queue(fn) {
      this.list.push(fn);
      return this;
    },
    wait(ms) {
      this.list.push(ms);
      return this;
    },
    dequeue() {
      const self = this;
      const list = self.list;
      self.isDequeuing = true;
      const el = list.shift() || function el() {};
      if (typeof el === 'number') {
        setTimeout(() => {
          self.dequeue();
        }, el);
      } else if (typeof el === 'function') {
        el.call(this);
        if (list.length) {
          self.dequeue();
        } else {
          self.isDequeuing = false;
        }
      }
    },
  };

  const artyom = new Artyom();
  const tasks = new Queue();

  this.task = function task(func) {
    tasks.queue(func);
    if (!tasks.isDequeuing) {
      tasks.dequeue();
    }
  };

  this.wait = function wait(time) {
    tasks.queue(time);
    if (!tasks.isDequeuing) {
      tasks.dequeue();
    }
  };

  this.speak = function speak(text, done) {
    tasks.queue(() => {
      artyom.say(text, {
        onEnd() {
          done();
        },
      });
    });
    if (!tasks.isDequeuing) {
      tasks.dequeue();
    }
  };

  this.speakAndWait = function speakAndWait(texts, wait) {
    texts.forEach((text) => {
      artyom.say(text);
    });
    tasks.queue(wait);
    if (!tasks.isDequeuing) {
      tasks.dequeue();
    }
  };
}

export default InterviewTimer;
