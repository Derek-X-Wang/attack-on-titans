
function getTimeString(distance) {
  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const dayStr = (days === 0) ? '' : `${days}d `;
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const hourStr = (hours === 0) ? '' : `${hours}h `;
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const minuteStr = (minutes === 0) ? '' : `${minutes}d `;
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const secondsStr = (seconds === 0) ? '' : `${seconds}d `;

  return dayStr + hourStr + minuteStr + secondsStr;
}

function CountdownTimer(endtime, options) {
  let countDownTime = '--:--';
  const countDown = setInterval(() => {
    const now = new Date().getTime();
    const distance = endtime - now;
    countDownTime = getTimeString(distance);
    options.onInterval(distance);
    if (distance < 0) {
      clearInterval(countDown);
      countDownTime = 'EXPIRED';
    }
  }, 1000);

  self.stop = function stop() { clearInterval(countDown); };
  self.getTime = function getTime() { return countDownTime; };
}

export default CountdownTimer;
