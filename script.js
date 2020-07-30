const pomodoroCountdown = document.getElementById("pomodoroCountdown");
const resetTime = document.getElementById("reset");
const startTime = document.getElementById("begin-countdown");
const endSound = new Audio("default.mp3");

let pomodoroTime = 25;
let seconds = 60;
let timer;
let isBreak = false;

pomodoroCountdown.textContent = `${pomodoroTime}:00`;

function startTimer() {
  startTime.disabled = true;
  pomodoroTime--;
  timer = setInterval(function () {
    if (seconds > 10) {
      seconds--;
      pomodoroCountdown.textContent = `${pomodoroTime}:${seconds}`;
    } else if (seconds <= 10 && seconds > 0) {
      seconds--;
      pomodoroCountdown.textContent = `${pomodoroTime}:0${seconds}`;
    } else if (seconds === 0 && pomodoroTime === 0 && isBreak === false) {
      zeroTime();
      breakTime();
    } else if (seconds === 0 && pomodoroTime === 0 && isBreak === true) {
      zeroTime();
      newPomodoroRound();
    } else {
      seconds = 59;
      pomodoroTime--;
      pomodoroCountdown.textContent = `${pomodoroTime}:${seconds}`;
    }
  }, 1000);
}

function resetTimer() {
  startTime.disabled = false;
  pomodoroTime = 25;
  seconds = 60;
  pomodoroCountdown.textContent = `${pomodoroTime}:00`;
  clearInterval(timer);
}

async function zeroTime() {
  await endSound.play();
  clearInterval(timer);
}

function breakTime() {
  isBreak = true;
  pomodoroTime = 5;
  seconds = 60;
  pomodoroCountdown.textContent = `${pomodoroTime}:00`;
  startTimer();
}

function newPomodoroRound() {
  isBreak = false;
  pomodoroTime = 25;
  seconds = 60;
  pomodoroCountdown.textContent = `${pomodoroTime}:00`;
  startTimer();
}

startTime.addEventListener("click", startTimer);
resetTime.addEventListener("click", resetTimer);
