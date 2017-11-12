import Artyom from 'artyom.js';

function InterviewTimer() {
  const Queue = function () {
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
      const el = list.shift() || function () {};
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
  let running = false;
  let timeout = null;
  const tasks = [];
  this.addTask = function () {
    // duration, callback
    console.log('hehehe');
  };

  this.addSpeakTask = function (text, wait, done) {
    const task = {
      text,
      wait,
      done,
    };
    tasks.push(task);
    if (!running) {
      this.start();
    }
  };

  this.start = function () {
    // start
    running = true;
    if (tasks.length !== 0) {
      // run the first task
      let task = tasks.shift();
      if (task.text) {
        // speak before wait
        artyom.say(task.text, {
          onEnd() {
            timeout = setTimeout(function () {
              running = false;
              task.done(this.next);
            }, task.wait);
          },
        });
      } else {
        // just wait
        timeout = setTimeout(function () {
          running = false;
          task.done(this.next);
        }, task.wait);
      }
    } else {
      running = false;
    }
  };

  this.next = function () {
    this.start();
  };
}

export default InterviewTimer;
