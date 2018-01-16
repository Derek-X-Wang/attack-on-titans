import Artyom from 'artyom.js';

function InterviewTimer() {
  const Queue = function Queue() {
    this.list = [];
    this.timeout = null;
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
    clear() {
      this.list = [];
      this.isDequeuing = false;
      if (this.timeout != null) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    dequeue() {
      const self = this;
      const list = self.list;
      self.isDequeuing = true;
      const el = list.shift() || function el() {};
      if (typeof el === 'number') {
        self.timeout = setTimeout(() => {
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

  const tasks = new Queue();
  const artyom = new Artyom();

  this.dequeue = (queue) => {
    if (!queue.isDequeuing) {
      queue.dequeue();
    }
  };

  this.task = (obj) => {
    if (typeof obj === 'string') {
      tasks.queue(() => {
        artyom.say(obj);
      });
    } else {
      tasks.queue(obj);
    }
    this.dequeue(tasks);
  };

  this.clear = () => {
    tasks.clear();
    artyom.fatality().then(() => {
      console.log('Jarvis succesfully stopped !');
    }).catch(() => {
      console.log("Well, this shouldn't happen :) ... ");
    });
    this.dequeue(tasks);
  };

  this.wait = (time) => {
    tasks.queue(time);
    this.dequeue(tasks);
  };

  this.speak = (text, done) => {
    tasks.queue(() => {
      artyom.say(text, {
        onEnd() {
          done();
        },
      });
    });
    this.dequeue(tasks);
  };
}

export default InterviewTimer;
