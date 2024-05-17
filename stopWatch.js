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
  resetAndToggleButtons();
}

function stopTimer() {
  clearInterval(interval);
  addToList();
  resetAndToggleButtons();
}

function pauseTimer() {
  clearInterval(interval);
  resetAndToggleButtons();
}

function resetTimer() {
  clearInterval(interval);
  resetAndToggleButtons();
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const time = formatTime(elapsedTime);
  labels.minutes.textContent = time.minutes;
  labels.seconds.textContent = time.seconds
  labels.milliseconds.textContent = time.milliseconds;
}

function formatTime(elapsedTime) {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  return {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    milliseconds: String(milliseconds).padStart(2, "0"),
  };
}

function addToList() {
const listItem = document.createElement("li");
listItem.textContent = `Lap ${lapList.childElementCount + 1}: ${labels.minutes.textContent}:${labels.seconds.textContent}:${labels.milliseconds.textContent}`;
lapList.appendChild(listItem);
}
  
function resetAndToggleButtons() {
  elapsedTime = 0;
  labels.minutes.textContent = "00";
  labels.seconds.textContent = "00";
  labels.milliseconds.textContent = "00";
  buttons.start.disabled = false;
  buttons.stop.disabled = true;
  buttons.pause.disabled = true;
  buttons.reset.disabled = true;
}
