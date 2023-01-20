import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtnEl = document.querySelector('[data-start]');
let selectedTime = 0;

startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];

    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;
    }
  },
};

const picker = flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  rootSelector: document.querySelector('.timer'),

  onStartClick() {
    const diff = selectedTime - Date.now();
    if (diff <= 0) {
      this.stop();
      return;
    }

    let { days, hours, minutes, seconds } = convertMs(diff);

    this.rootSelector.querySelector('[data-days]').textContent =
      this.addLeadingZero(days);
    this.rootSelector.querySelector('[data-hours]').textContent =
      this.addLeadingZero(hours);
    this.rootSelector.querySelector('[data-minutes]').textContent =
      this.addLeadingZero(minutes);
    this.rootSelector.querySelector('[data-seconds]').textContent =
      this.addLeadingZero(seconds);
  },

  start() {
    this.onStartClick();
    this.intervalId = setInterval(() => {
      this.onStartClick();
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

startBtnEl.addEventListener('click', () => {
  timer.start();
  startBtnEl.disabled = true;
  picker.set('clickOpens', false);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
