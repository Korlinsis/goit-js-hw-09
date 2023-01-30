const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let intervalId = null;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

function onStartClick () {
    startButton.disabled = true;
    intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onStopClick () {
    startButton.disabled = false;
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }