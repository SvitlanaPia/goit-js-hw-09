import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const formEl = document.querySelector('.form');
const inputsEl = formEl.elements;
const delayEl = inputsEl['delay'];
const stepEl = inputsEl['step'];
const amountEl = inputsEl['amount'];

function onFormSubmit(event) {
  event.preventDefault();
  let totalDelay = Number(delayEl.value);

  for (let i = 1; i <= amountEl.value; i++) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += Number(stepEl.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', onFormSubmit);
