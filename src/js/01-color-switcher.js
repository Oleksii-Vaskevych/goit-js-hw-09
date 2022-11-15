const CHANGECOLOR_DELAY = 1000;
let timerId = null;

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.addEventListener('click', onStartBtn);
refs.buttonStop.addEventListener('click', onStopBtn);

function onStartBtn(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, CHANGECOLOR_DELAY);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
}

function onStopBtn(event) {
  clearInterval(timerId);
  refs.buttonStop.disabled = true;
  refs.buttonStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
