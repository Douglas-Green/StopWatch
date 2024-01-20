const labels = {
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  milliseconds: document.getElementById("milliseconds"),
};

const buttons = {
  start: document.getElementById("startButton"),
  stop: document.getElementById("stopButton"),
  pause: document.getElementById("pauseButton"),
  reset: document.getElementById("resetButton"),
};

const lapList = document.getElementById("lapList");

let startTime;
let elapsedTime = 0;
let interval;

buttons.start.addEventListener("click", startTimer);
buttons.stop.addEventListener("click", stopTimer);
buttons.pause.addEventListener("click", pauseTimer);
buttons.reset.addEventListener("click", resetTimer);

function startTimer() {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(updateTimer, 10);
  toggleButtons(true, false, true, true);
}

function stopTimer() {
  clearInterval(interval);
  addToList();
  resetTimerData();
  toggleButtons(false, true, false, true);
}

function pauseTimer() {
  clearInterval(interval);
  toggleButtons(false, true, false, true);
}

function resetTimer() {
  clearInterval(interval);
  resetTimerData();
  toggleButtons(false, true, false, true);
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  let time = new Date(elapsedTime);
  labels.minutes.textContent = String(time.getMinutes()).padStart(2, "0");
  labels.seconds.textContent = String(time.getSeconds()).padStart(2, "0");
  labels.milliseconds.textContent = String(
    Math.floor(time.getMilliseconds() / 10)
  ).padStart(2, "0");
}

function resetTimerData() {
  elapsedTime = 0;
  labels.minutes.textContent = "00";
  labels.seconds.textContent = "00";
  labels.milliseconds.textContent = "00";
}

function addToList() {
  const listItem = document.createElement("li");
  listItem.textContent = `Lap ${lapList.childElementCount + 1}: ${
    labels.minutes.textContent
  }:${labels.seconds.textContent}:${labels.milliseconds.textContent}`;
  lapList.appendChild(listItem);
}

function toggleButtons(start, stop, pause, reset) {
  buttons.start.disabled = start;
  buttons.stop.disabled = stop;
  buttons.pause.disabled = pause;
  buttons.reset.disabled = reset;
}
