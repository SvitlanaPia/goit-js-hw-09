const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

startBtnEl.addEventListener('click', event => {
  changeColor();
  intervalId = setInterval(changeColor, 1000);
  event.target.disabled = true;
});

stopBtnEl.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtnEl.disabled = false;
});

function changeColor() {
  const randomColor = getRandomHexColor();
  bodyEl.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
